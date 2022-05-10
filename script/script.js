import { initialCards } from "./initialCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

// cards
const cardsContainer = document.querySelector(".elements");

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
const popupShow = document.querySelector(".popup_show");
const popupAll = document.querySelectorAll(".popup");

// popups buttons
const editButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// popup show
const imagePopup = popupShow.querySelector(".popup__fullscreen-image");
const imageDescription = popupShow.querySelector(".popup__description");

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

// new card
const renderData = (data) => {
  const card = new Card(data, ".card-template");
  const cardElement = card.generateCard();

  cardsContainer.prepend(cardElement);
};

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
};

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const popupActive = document.querySelector(".popup_opened");
    closePopup(popupActive);
  }
}

initialCards.reverse().forEach((card) => renderData(card));

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
  formEditValidator._deleteErrors();
  openPopup(popupEdit);
});

addCardButton.addEventListener("click", () => {
  formCard.reset();
  formAddValidator._deleteErrors();
  openPopup(popupAdd);
});

popupAll.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close-button")
    ) {
      closePopup(popup);
    }
  });
});

formProfile.addEventListener("submit", handleProfileFormEdit);
formCard.addEventListener("submit", handleCardFormAdd);

export { imagePopup, imageDescription, openPopup, popupShow, config };
