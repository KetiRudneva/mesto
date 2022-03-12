let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closePopup = document.querySelector(".popup__close-button");

function popupOpen() {
  popup.classList.add("popup_opened");
}

function popupClose() {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", popupOpen);
closePopup.addEventListener("click", popupClose);
