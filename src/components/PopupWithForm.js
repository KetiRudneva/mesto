import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
	constructor(popupSelector, handleProfileFormEdit) {
		super(popupSelector);
		this._handleProfileFormEdit = handleProfileFormEdit;
		this._formElement = this._popupSelector.querySelector('.popup__form');
		this._inputList = this._formElement.querySelectorAll('.popup__text');
		this._submitButton = this._formElement.querySelector('.popup__submit-button');
		this._permanentText = this._submitButton.textContent;
	}

	renderLoading(isLoading) {
		if (isLoading) {
			this._submitButton.textContent = 'Сохранение...';
		} else {
			this._submitButton.textContent = this._submitButtonText;
		}
	}

	_getInputValues() {
		this._formValues = {};
		this._inputList.forEach((input) => (this._formValues[input.name] = input.value));

		return this._formValues;
	}

	setEventListeners() {
		super.setEventListeners();

		this._formElement.addEventListener('submit', (evt) => {
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
