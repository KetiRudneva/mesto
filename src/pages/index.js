import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { initialCards } from "../utils/initialCards.js";
import { config } from "../utils/config.js";
import {
  nameInput,
  jobInput,
  popupAdd,
  popupEdit,
  editButton,
  addCardButton,
} from "../utils/constants.js";
import "../pages/index.css";

//экземпляр класса апи для работы с запросами на сервер
const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/cohort-42/",
  headers: {
    authorization: "622cedbc-a041-41b2-ac81-42db94da4679",
    "Content-Type": "application/json",
  },
});

const userServerData = api.getUserData();
userServerData
  .then((userData) => profileInfo.setUserInfo(userData))
  .catch((err) => console.log(err));

const cardServerData = api.getCards();
cardServerData
  .then((cardData) => section.renderer(cardData))
  .catch((err) => console.log(err));

const formAddValidator = new FormValidator(config, popupAdd);
formAddValidator.enableValidation();

const formEditValidator = new FormValidator(config, popupEdit);
formEditValidator.enableValidation();

const popupShowImage = new PopupWithImage(".popup_show");
popupShowImage.setEventListeners();

const renderData = (data) => {
  const card = new Card(
    {
      data: data,
      handleCardClick: () => {
        popupShowImage.openPopup(data);
      },
    },
    ".card-template"
  );
  const cardElement = card.generateCard();
  return cardElement;
};

const section = new Section({ renderer: renderData }, ".elements");

const popupCardAdd = new PopupWithForm(".popup_add", (cardData) => {
  const data = {
    name: cardData.cardTitle,
    link: cardData.cardLink,
  };
  section.addItem(renderData(data));
  popupCardAdd.closePopup();
});

popupCardAdd.setEventListeners();

const profileInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__profession",
  imgSelector: ".profile__avatar-img",
});

const popupCardEdit = new PopupWithForm(".popup_edit", (data) => {
  profileInfo.setUserInfo(data);
  popupCardEdit.closePopup();
});

popupCardEdit.setEventListeners();

editButton.addEventListener("click", () => {
  const getUserInfo = profileInfo.getUserInfo();

  nameInput.value = getUserInfo.profileName;
  jobInput.value = getUserInfo.profileJob;

  formAddValidator.deleteErrors();
  popupCardEdit.openPopup();
});

addCardButton.addEventListener("click", () => {
  formAddValidator.deleteErrors();
  popupCardAdd.openPopup();
});
