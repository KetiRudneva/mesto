import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/ PopupWithConfirmation.js.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { config } from '../utils/config.js';
import {
	nameInput,
	jobInput,
	avatar,
	popupAdd,
	popupEdit,
	popupAvatarEdit,
	editButton,
	addCardButton,
	popupAvatarEditButton
} from '../utils/constants.js';
import '../pages/index.css';

const api = new Api({
	baseUrl: 'https://nomoreparties.co/v1/cohort-42/',
	headers: {
		authorization: '622cedbc-a041-41b2-ac81-42db94da4679',
		'Content-Type': 'application/json'
	}
});

let userId;

Promise.all([ api.getUserData(), api.getCards() ])
	.then(([ userData, cardData ]) => {
		profileInfo.setUserInfo(userData);
		userId = userData._id;
		section.renderer(cardData);
	})
	.catch((err) => console.log(err));

// validation
const formAddValidator = new FormValidator(config, popupAdd);
formAddValidator.enableValidation();

const formEditValidator = new FormValidator(config, popupEdit);
formEditValidator.enableValidation();

const formAvatarValidator = new FormValidator(config, popupAvatarEdit);
formAvatarValidator.enableValidation();

const popupShowImage = new PopupWithImage('.popup_show');

const popupDeleteCard = new PopupWithConfirmation('.popup_delete');

const renderData = (data) => {
	const card = new Card(
		{
			data: data,
			userId: userId,
			handleCardClick: () => {
				popupShowImage.openPopup(data);
			},
			handleLikeClick: () => {
				if (card.isLiked()) {
					api
						.removeLikes(data._id)
						.then((data) => card.setLikes(data.likes))
						.catch((err) => console.log(err));
				} else {
					api
						.addLikes(data._id)
						.then((data) => {
							card.setLikes(data.likes);
						})
						.catch((err) => console.log(err));
				}
			},
			handleDeleteCardClick: () => {
				popupDeleteCard.openPopup();
				popupDeleteCard.submitDelete(() => {
					api
						.deleteCard(data._id)
						.then(() => {
							popupDeleteCard.closePopup(), card.deleteCard();
						})
						.catch((err) => console.log(err));
				});
			}
		},
		'.card-template'
	);

	const cardElement = card.generateCard();
	return cardElement;
};

const popupEditAvatar = new PopupWithForm('.popup_avatar', (data) => {
	popupEditAvatar.renderLoading(true);
	api
		.editAvatar(data)
		.then((data) => {
			avatar.src = data.avatar;
			popupEditAvatar.closePopup();
		})
		.catch((err) => console.log(err))
		.finally(() => {
			popupEditAvatar.renderLoading(false);
		});
});

const section = new Section({ renderer: renderData }, '.elements');

const popupCardAdd = new PopupWithForm('.popup_add', (cardData) => {
	popupCardAdd.renderLoading(true);
	const data = {
		name: cardData.cardTitle,
		link: cardData.cardLink
	};
	api
		.addNewCard(data)
		.then((data) => {
			section.addItem(renderData(data)), popupCardAdd.closePopup();
		})
		.catch((err) => console.log(err))
		.finally(() => {
			popupCardAdd.renderLoading(false);
		});
});

const profileInfo = new UserInfo({
	nameSelector: '.profile__name',
	jobSelector: '.profile__profession',
	imgSelector: '.profile__avatar-img'
});

const popupCardEdit = new PopupWithForm('.popup_edit', (data) => {
	popupCardEdit.renderLoading(true);
	api
		.editUserInfo({
			name: data.profileName,
			about: data.profileJob
		})
		.then((data) => {
			profileInfo.setUserInfo(data), popupCardEdit.closePopup();
		})
		.catch((err) => console.log(err))
		.finally(() => {
			popupCardEdit.renderLoading(false);
		});
});

// listeners
popupCardAdd.setEventListeners();
popupCardEdit.setEventListeners();
popupShowImage.setEventListeners();
popupDeleteCard.setEventListeners();
popupEditAvatar.setEventListeners();

editButton.addEventListener('click', () => {
	const getUserInfo = profileInfo.getUserInfo();

	nameInput.value = getUserInfo.profileName;
	jobInput.value = getUserInfo.profileJob;

	formAddValidator.deleteErrors();
	popupCardEdit.openPopup();
});

addCardButton.addEventListener('click', () => {
	formAddValidator.deleteErrors();
	popupCardAdd.openPopup();
});

popupAvatarEditButton.addEventListener('click', () => {
	formAddValidator.deleteErrors();
	popupEditAvatar.openPopup();
});
