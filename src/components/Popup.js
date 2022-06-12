export default class Popup {
	constructor(popupSelector) {
		this._popupElement = document.querySelector(popupSelector);
		this._handleEscClose = this._handleEscClose.bind(this);
	}

	openPopup() {
		document.addEventListener('keydown', this._handleEscClose);
		this._popupElement.classList.add('popup_opened');
	}

	closePopup() {
		document.removeEventListener('keydown', this._handleEscClose);
		this._popupElement.classList.remove('popup_opened');
	}

	setEventListeners() {
		this._popupElement.addEventListener('mousedown', (evt) => {
			if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
				this.closePopup();
			}
		});
	}

	_handleEscClose(evt) {
		if (evt.key === 'Escape') {
			this.closePopup();
		}
	}
}
