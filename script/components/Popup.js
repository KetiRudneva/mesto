export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  openPopup(popupSelector) {
    this._popupSelector.classList.add("popup_opened");
  }

  closePopup(popupSelector) {
    this._popupSelector.classList.remove("popup_opened");
  }

  setEventListeners() {
    this._popupSelector.addEventListeners("mousedown", (evt) => {
      if (
        evt.target === evt.currentTarget ||
        evt.target.classList.contains("popup__close-button")
      ) {
        this.closePopup();
      }
    });
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }
}