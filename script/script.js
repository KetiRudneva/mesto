let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closePopup = document.querySelector(".popup__close-button");
let submit = document.querySelector(".popup__submit-button");

let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__text-name");
let jobInput = document.querySelector(".popup__text-about");
let profileName = document.querySelector(".profile__name");
let job = document.querySelector(".profile__profession");

function popupOpen() {
  popup.classList.add("popup_opened");
  console.log("dddd", formElement);
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
closePopup.addEventListener("click", popupClose);
formElement.addEventListener("submit", formSubmitHandler);
