import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopup = document.querySelector(".popup__fullscreen-image");
    this._imageDescription = document.querySelector(".popup__description");
  }

  openPopup(data) {
    this._imagePopup.alt = data.name;
    this._imagePopup.src = data.link;
    this._imageDescription.textContent = data.name;
    super.openPopup();
  }
}
