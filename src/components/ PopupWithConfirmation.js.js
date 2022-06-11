import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
	constructor(popupSelector, handleSubmit) {
		super(popupSelector);
		this._handleSubmit = handleSubmit;
		this._popupDeleteBtn = this._popupSelector.querySelector('.popup__submit-delete');
	}

	submitDelete(submit) {
		this._handleSubmit = submit;
	}

	setEventListeners() {
		super.setEventListeners();
		this._popupDeleteBtn.addEventListener('click', (evt) => {
			evt.preventDefault();
			this._handleSubmit();
		});
	}
}
