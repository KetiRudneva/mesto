export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  openPopup(popup) {
    this._popup.add("popup_opened");
  }

  closePopup(popup) {
    this._popup.remove("popup_opened");
  }

  setEventListeners() {
    this._popup.addEventListeners("mousedown", (evt) => {
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
