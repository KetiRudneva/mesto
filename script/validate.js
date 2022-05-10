// const showError = (
//   formElement,
//   inputElement,
//   errorMessage,
//   { inputErrorClass, errorClass }
// ) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(errorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(inputErrorClass);
// };

// const hideError = (
//   formElement,
//   inputElement,
//   { inputErrorClass, errorClass }
// ) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(errorClass);
//   errorElement.classList.remove(inputErrorClass);
//   errorElement.textContent = "";
// };

// const isValid = (formElement, inputElement, rest) => {
//   if (!inputElement.validity.valid) {
//     showError(formElement, inputElement, inputElement.validationMessage, rest);
//   } else {
//     hideError(formElement, inputElement, rest);
//   }
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// const toggleBtnState = (inputList, buttonElement, inactiveButtonClass) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.setAttribute("disabled", true);
//     buttonElement.classList.add(inactiveButtonClass);
//   } else {
//     buttonElement.removeAttribute("disabled");
//     buttonElement.classList.remove(inactiveButtonClass);
//   }
// };

// const setEventListeners = (
//   formElement,
//   { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }
// ) => {
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   const buttonElement = formElement.querySelector(submitButtonSelector);
//   toggleBtnState(inputList, buttonElement);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", () => {
//       isValid(formElement, inputElement, rest);
//       toggleBtnState(inputList, buttonElement, inactiveButtonClass, rest);
//     });
//   });
// };

// const enableValidation = ({ formSelector, ...rest }) => {
//   const formList = Array.from(document.querySelectorAll(formSelector));
//   formList.forEach((formElement) => {
//     setEventListeners(formElement, rest);
//   });
// };

// enableValidation({
//   formSelector: ".popup__form",
//   inputSelector: ".popup__text",
//   submitButtonSelector: ".popup__submit-button",
//   inactiveButtonClass: "popup__submit-button_inactive",
//   inputErrorClass: "popup__text-error",
//   errorClass: "popup__text-error_active",
// });
