const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

let cardsContainer = document.querySelector(".elements");
let cardTemplate = document
  .querySelector(".card-template")
  .content.querySelector(".elements__item");

function addNewCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardName = cardElement.querySelector(".elements__title");
  const cardImage = cardElement.querySelector(".elements__image");

  cardName.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  return cardElement;
}

function renderCard(data) {
  const cardElement = addNewCard(data);
  cardsContainer.prepend(cardElement);
}

initialCards.reverse().forEach((cardsContainer) => {
  renderCard(cardsContainer);
});

let formProfile = document.querySelector(".popup__form-profile");
let nameInput = document.querySelector(".popup__text-name");
let jobInput = document.querySelector(".popup__text-job");
let profileName = document.querySelector(".profile__name");
let job = document.querySelector(".profile__profession");

//popups
let popup = document.querySelector(".popup");
let popupEdit = document.querySelector(".popup_edit");
let popupAdd = document.querySelector(".popup_add");

let editButton = document.querySelector(".profile__edit-button");
let addCard = document.querySelector(".profile__add-button");

let closePopupEdit = document.querySelector(".popup__close-edit");
let closePopupAdd = document.querySelector(".popup__close-add");

let submit = document.querySelector(".popup__submit-button");
let submitPopupEdit = document.querySelector(".popup__submit-edit");
let submitPopupAdd = document.querySelector(".popup__submit-add");

function popupOpen(popup) {
  popup.classList.add("popup_opened");
}

function popupClose(popup) {
  popup.classList.remove("popup_opened");
}

function handleProfileEdit(evt) {
  evt.preventDefault();
}

function handleProfileFormEdit(evt) {
  evt.preventDefault();
  job.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  popupClose(popupEdit);
}

//listeners
editButton.addEventListener("click", () => {
  popupOpen(popupEdit);
});
addCard.addEventListener("click", () => {
  popupOpen(popupAdd);
});

closePopupAdd.addEventListener("click", () => {
  popupClose(popupAdd);
});

closePopupEdit.addEventListener("click", () => {
  popupClose(popupEdit);
});

formProfile.addEventListener("submit", handleProfileFormEdit);
