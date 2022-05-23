export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  openPopup() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popupSelector.classList.add("popup_opened");
  }

  closePopup() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popupSelector.classList.remove("popup_opened");
  }

  setEventListeners() {
    this._popupSelector.addEventListener("mousedown", (evt) => {
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
