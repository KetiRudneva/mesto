export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._title = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._buttonLike = this._element.querySelector(".elements__like");
    this._deleteButton = this._element.querySelector(".elements__delete");
    this._showPopupImage = this._element.querySelector(".elements__image");

    const cardName = this._element.querySelector(".elements__title");
    const cardImage = this._element.querySelector(".elements__image");

    cardName.textContent = this._title;
    cardImage.src = this._link;
    cardImage.alt = this._alt;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => {
      this._clickButtonLike();
    });
    this._deleteButton.addEventListener("click", () => {
      this._clickButtonDelete();
    });
    this._showPopupImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  _clickButtonLike() {
    this._buttonLike.classList.toggle("elements__like-active");
  }

  _clickButtonDelete() {
    this._element.remove();
    this._element = null;
  }
}