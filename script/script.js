import Card from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import FormValidator from "./components/FormValidator.js";
import { initialCards } from "./initialCards.js";
import { openPopup, closePopup } from "./utils.js";

// popup edit profile
const formProfile = document.querySelector(".popup__form-profile");
const nameInput = document.querySelector(".popup__text-name");
const jobInput = document.querySelector(".popup__text-job");
const profileName = document.querySelector(".profile__name");
const job = document.querySelector(".profile__profession");

//popup add new card
const formCard = document.querySelector(".popup__form-add");
const titleInput = document.querySelector(".popup__text-title");
const linkInput = document.querySelector(".popup__text-link");

//popups
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupAll = document.querySelectorAll(".popup");

// popups buttons
const editButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// validation
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__text-error",
  errorClass: "popup__text-error_active",
};

const formAddValidator = new FormValidator(config, popupAdd);
formAddValidator.enableValidation();

const formEditValidator = new FormValidator(config, popupEdit);
formEditValidator.enableValidation();

const popupShowImage = new PopupWithImage(".popup_show");
popupShowImage.setEventListeners();
// new card
const renderData = (data) => {
  const card = new Card(data, ".card-template");
  const cardElement = card.generateCard();

  return cardElement;
};

const section = new Section(
  {
    items: initialCards.reverse(),
    renderer: renderData,
  },
  ".elements"
);
section.renderer();

function handleProfileFormEdit(evt) {
  evt.preventDefault();
  job.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  closePopup(popupEdit);
}

function handleCardFormAdd(evt) {
  evt.preventDefault();
  const data = {
    name: titleInput.value,
    link: linkInput.value,
  };
  renderData(data);
  closePopup(popupAdd);
}

//listeners
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = job.textContent;
  formEditValidator.deleteErrors();
  openPopup(popupEdit);
});

addCardButton.addEventListener("click", () => {
  formCard.reset();
  formAddValidator.deleteErrors();
  openPopup(popupAdd);
});

formProfile.addEventListener("submit", handleProfileFormEdit);
formCard.addEventListener("submit", handleCardFormAdd);
