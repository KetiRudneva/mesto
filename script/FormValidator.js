export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._formList = Array.from(
      this._formElement.querySelectorAll(this._config.formSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  _showError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.inputErrorClass);
    inputElement.classList.add(this._config.errorClass);
    // awkward
  }

  _hideError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    inputElement.classList.remove(this._config.errorClass);
  }

  _checkValidity(inputElement) {
    !inputElement.validity.valid
      ? this._showError(inputElement, inputElement.validationMessage)
      : this._hideError(inputElement);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleBtnState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute("disabled", true);
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute("disabled");
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._toggleBtnState();
    this._inputList.forEach((inputElement) => {
      this._checkValidity(inputElement);
      this._toggleBtnState();
    });
  }

  deleteErrors() {
    this._toggleBtnState();
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
