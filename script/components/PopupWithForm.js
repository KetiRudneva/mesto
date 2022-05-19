import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleProfileFormEdit) {
    super(popupSelector);
    this._handleProfileFormEdit = handleProfileFormEdit;
    this._formElement = document.querySelector(".popup__form");
    this._inputList = this._formElement.querySelectorAll(".popup__text");
    this._submitButton = this._formElement.querySelector(
      ".popup__submit-button"
    );
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => (this._formValues[input] = input.value));
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListeners("submit", (evt) => {
      evt.preventDefault();
      this._handleProfileFormEdit(this._getInputValues());
      this.closePopup();
    });
  }

  closePopup() {
    super.closePopup();
    this._formElement.reset();
  }
}
