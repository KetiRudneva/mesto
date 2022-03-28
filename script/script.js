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
console.log("1", cardsContainer);
console.log("2", cardTemplate);

function addNewCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardName = cardElement.querySelector(".elements__title");
  const cardImage = cardElement.querySelector(".elements__image");
  console.log("3", cardElement);
  console.log("4", cardName);
  console.log("5", cardImage);

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

let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let popupCloseButton = document.querySelector(".popup__close-button");
let submit = document.querySelector(".popup__submit-button");

let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__text-name");
let jobInput = document.querySelector(".popup__text-job");
let profileName = document.querySelector(".profile__name");
let job = document.querySelector(".profile__profession");

function popupOpen() {
  popup.classList.add("popup_opened");
}

function popupClose() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  job.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  popupClose();
}

editButton.addEventListener("click", popupOpen);
popupCloseButton.addEventListener("click", popupClose);
formElement.addEventListener("submit", formSubmitHandler);
