import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
	constructor(popupSelector, handleSubmit) {
		super(popupSelector);
		this._handleSubmit = handleSubmit;
		this._popupDeleteBtn = this._popupSelector.querySelector('.popup__submit-delete');
	}

	_handleSubmit() {}

	setEventListeners() {
		super.setEventListeners();
		this._popupDeleteBtn.addEventListener('click', (evt) => {
			evt.preventDefault();
			this._handleSubmit();
		});
	}
}
