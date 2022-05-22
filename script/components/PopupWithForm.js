import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleProfileFormEdit) {
    super(popupSelector);
    this._handleProfileFormEdit = handleProfileFormEdit;
    this._formElement = document.querySelector(".popup__form-add");
    this._inputList = this._formElement.querySelectorAll(".popup__text");
    this._submitButton = this._formElement.querySelector(".popup__submit-add");
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      console.log(this._handleProfileFormEdit);
      this._handleProfileFormEdit(this._getInputValues());
      this.closePopup();
    });
  }

  closePopup() {
    super.closePopup();
    this._formElement.reset();
  }
}
