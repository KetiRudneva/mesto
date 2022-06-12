export default class Card {
	constructor({ data, handleCardClick, handleLikeClick, handleDeleteCardClick, userId }, cardSelector) {
		this._title = data.name;
		this._link = data.link;
		this._alt = data.alt;
		this._userId = userId;
		this._likes = data.likes;
		this._cardId = data._id;
		this._ownerId = data.owner._id;
		this._cardSelector = cardSelector;
		this._handleCardClick = handleCardClick;
		this._handleLikeClick = handleLikeClick;
		this._handleDeleteCardClick = handleDeleteCardClick;
	}

	_getTemplate() {
		const cardElement = document
			.querySelector(this._cardSelector)
			.content.querySelector('.elements__item')
			.cloneNode(true);

		return cardElement;
	}

	isLiked() {
		return this._likes.some((item) => item._id === this._userId);
	}

	_enableLike() {
		this._buttonLike.classList.add('elements__like-active');
	}

	_disableLike() {
		this._buttonLike.classList.remove('elements__like-active');
	}

	setLikes(setLike) {
		this._likes = setLike;
		this._likesCounter.textContent = this._likes.length;

		if (this.isLiked()) {
			this._enableLike();
		} else {
			this._disableLike();
		}
	}

	generateCard() {
		this._element = this._getTemplate();

		this._buttonLike = this._element.querySelector('.elements__like');
		this._deleteButton = this._element.querySelector('.elements__delete');
		this._showPopupImage = this._element.querySelector('.elements__image');
		this._likesCounter = this._element.querySelector('.elements__like-counter');

		const cardName = this._element.querySelector('.elements__title');

		cardName.textContent = this._title;
		this._showPopupImage.src = this._link;
		this._showPopupImage.alt = this._alt;

		if (this._ownerId !== this._userId) {
			this._deleteButton.remove();
		}

		this.setLikes(this._likes);
		this._setEventListeners();

		return this._element;
	}

	_setEventListeners() {
		this._buttonLike.addEventListener('click', () => {
			this._handleLikeClick(this._id);
		});
		this._deleteButton.addEventListener('click', () => {
			this._handleDeleteCardClick();
		});
		this._showPopupImage.addEventListener('click', () => {
			this._handleCardClick();
		});
	}

	_clickButtonLike() {
		this._buttonLike.classList.toggle('elements__like-active');
	}

	deleteCard() {
		this._element.remove();
		this._element = null;
	}
}
