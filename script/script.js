// popup edit profile
const formProfile = document.querySelector(".popup__form-profile");
const nameInput = document.querySelector(".popup__text-name");
const jobInput = document.querySelector(".popup__text-job");
const profileName = document.querySelector(".profile__name");
const job = document.querySelector(".profile__profession");

//popup add new card
const formCard = document.querySelector(".popup__form-add");
const titleInput = document.querySelector(".popup__text-title");
const linkInput = document.querySelector(".popup__text-link");

//popups
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupShow = document.querySelector(".popup_show");
const popupAll = document.querySelectorAll(".popup");

// popups buttons
const editButton = document.querySelector(".profile__edit-button");
const addCard = document.querySelector(".profile__add-button");
const closePopupEdit = document.querySelector(".popup__close-edit");
const closePopupAdd = document.querySelector(".popup__close-add");
const closePopupShow = document.querySelector(".popup__close-show");
const submitPopupEdit = document.querySelector(".popup__submit-edit");
const submitPopupAdd = document.querySelector(".popup__submit-add");

//popup show
const imagePopup = popupShow.querySelector(".popup__fullscreen-image");
const imageDescription = popupShow.querySelector(".popup__description");

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
};

const renderData = (data) => {
  const cardElement = addNewCard(data);
  cardsContainer.prepend(cardElement);
};

function handleProfileFormEdit(evt) {
  evt.preventDefault();
  job.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  closePopup(popupEdit);
}

function handleCardFormAdd(evt) {
  evt.preventDefault();
  const data = {
    name: titleInput.value,
    link: linkInput.value,
  };
  renderData(data);
  closePopup(popupAdd);
  formCard.reset();
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const popupActive = document.querySelector(".popup_opened");
    closePopup(popupActive);
  }
}

function deleteErrors(popup) {
  popupErrors = popup.querySelectorAll(".popup__text-error");
  popupErrorsActive = popup.querySelectorAll(".popup__text-error_active");

  popupErrors.forEach((inputElement) => {
    inputElement.classList.remove("popup__text-error");
    inputElement.textContent = "";
  });

  popupErrorsActive.forEach((formError) => {
    formError.classList.remove("popup__text-error_active");
  });
}

//listeners
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = job.textContent;
  deleteErrors(popupEdit);
  submitPopupEdit.removeAttribute("disabled");
  submitPopupEdit.classList.remove("popup__submit-button_inactive");
  openPopup(popupEdit);
});

addCard.addEventListener("click", () => {
  formCard.reset();
  submitPopupAdd.setAttribute("disabled", true);
  submitPopupAdd.classList.add("popup__submit-button_inactive");
  deleteErrors(popupAdd);
  openPopup(popupAdd);
});

closePopupAdd.addEventListener("click", () => {
  closePopup(popupAdd);
});

closePopupEdit.addEventListener("click", () => {
  closePopup(popupEdit);
});

closePopupShow.addEventListener("click", () => {
  closePopup(popupShow);
});

popupAll.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close-button")
    ) {
      closePopup(popup);
    }
  });
});

formProfile.addEventListener("submit", handleProfileFormEdit);
formCard.addEventListener("submit", handleCardFormAdd);

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardsContainer = document.querySelector(".elements");
const cardTemplate = document
  .querySelector(".card-template")
  .content.querySelector(".elements__item");

function addNewCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardName = cardElement.querySelector(".elements__title");
  const cardImage = cardElement.querySelector(".elements__image");
  const likeButton = cardElement.querySelector(".elements__like");
  const deleteButton = cardElement.querySelector(".elements__delete");
  const showPopupImage = cardElement.querySelector(".elements__image");

  cardName.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("elements__like-active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  showPopupImage.addEventListener("click", () => {
    imagePopup.alt = data.name;
    imagePopup.src = data.link;
    imageDescription.textContent = data.name;
    openPopup(popupShow);
  });

  return cardElement;
}

initialCards.reverse().forEach((cardsContainer) => {
  renderData(cardsContainer);
});
