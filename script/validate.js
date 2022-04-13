// enableValidation({
//   formSelector: ".popup__form",
//   inputSelector: ".popup__text",

//   submitButtonSelector: ".popup__submit-button",

//   inactiveButtonClass: "popup__submit-button_inactive",

//   inputErrorClass: "popup__text_type_error",
//   errorClass: "popup__text_type_error_active",
// });

const formSelector = document.querySelector(".popup__form");
const inputSelector = document.querySelector(".popup__text");

const showInputError = (formSelector, inputSelector, errorMessage) => {
  const inputError = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add("popup__text_type_error");
  inputError.textContent = errorMessage;
  inputError.classList.add("popup__text_type_error_active");
};

const hideInputError = (formSelector, inputSelector) => {
  const inputError = formSelector.querySelector(`.${inputSelector.id}-error`);
  console.log("inputError", inputError);
  inputSelector.classList.remove("popup__text_type_error");
  inputError.classList.remove("popup__text_type_error_active");
  inputError.textContent = "";
};

const isValid = (formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) {
    showInputError(
      formSelector,
      inputSelector,
      inputSelector.validationMessage
    );
  } else {
    hideInputError(formSelector, inputSelector);
  }
};

formSelector.addEventListener("submit", function (evt) {
  evt.preventDefault();
  console.log("freedom");
});

const setEventListeners = (formSelector) => {
  const inputList = Array.from(formSelector.querySelectorAll(".popup__text"));
  const submitButtonSelector = formSelector.querySelector(
    ".popup__submit-button"
  );
  toggleBtnState(inputList, submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formSelector, inputElement);
      toggleBtnState(inputList, submitButtonSelector);
      console.log("8");
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));

  formList.forEach((element) => {
    element.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(element);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleBtnState = (inputList, submitButtonSelector) => {
  if (hasInvalidInput(inputList)) {
    submitButtonSelector.classList.add("popup__submit-button_inactive");
  } else {
    submitButtonSelector.classList.remove("popup__submit-button_inactive");
  }
};

enableValidation();
