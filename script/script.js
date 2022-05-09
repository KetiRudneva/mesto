import { initialCards } from "./initialCards.js";
import Card from "./Card.js";

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
const addCard = document.querySelector(".profile__add-button");
const closePopupEdit = document.querySelector(".popup__close-edit");
const closePopupAdd = document.querySelector(".popup__close-add");
const closePopupShow = document.querySelector(".popup__close-show");
const submitPopupEdit = document.querySelector(".popup__submit-edit");
const submitPopupAdd = document.querySelector(".popup__submit-add");

//popup show
const imagePopup = popupShow.querySelector(".popup__fullscreen-image");
const imageDescription = popupShow.querySelector(".popup__description");

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
};

// ________________________________________________________________

// const renderData = (data) => {
//   const cardElement = addNewCard(data);
//   cardsContainer.prepend(cardElement);
// };

const renderData = (data) => {
  const card = new Card(data, ".card-template");
  const cardElement = card.generateCard();

  cardsContainer.prepend(cardElement);
};

initialCards.reverse().forEach((card) => renderData(card));

// ________________________________________________________________

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
  closePopup(popupAdd);
  formCard.reset();
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const popupActive = document.querySelector(".popup_opened");
    closePopup(popupActive);
  }
}

function deleteErrors(popup) {
  popupErrors = popup.querySelectorAll(".popup__text-error");
  popupErrorsActive = popup.querySelectorAll(".popup__text-error_active");

  popupErrors.forEach((inputElement) => {
    inputElement.classList.remove("popup__text-error");
    inputElement.textContent = "";
  });

  popupErrorsActive.forEach((formError) => {
    formError.classList.remove("popup__text-error_active");
  });
}

//listeners
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = job.textContent;
  deleteErrors(popupEdit);
  submitPopupEdit.removeAttribute("disabled");
  submitPopupEdit.classList.remove("popup__submit-button_inactive");
  openPopup(popupEdit);
});

addCard.addEventListener("click", () => {
  formCard.reset();
  submitPopupAdd.setAttribute("disabled", true);
  submitPopupAdd.classList.add("popup__submit-button_inactive");
  deleteErrors(popupAdd);
  openPopup(popupAdd);
});

closePopupAdd.addEventListener("click", () => {
  closePopup(popupAdd);
});

closePopupEdit.addEventListener("click", () => {
  closePopup(popupEdit);
});

closePopupShow.addEventListener("click", () => {
  closePopup(popupShow);
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

export { imagePopup, imageDescription, openPopup, popupShow };
