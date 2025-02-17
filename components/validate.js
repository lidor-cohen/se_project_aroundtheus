let validationConfig = {};

// If any of input fields from input list is invalid
// return false
function hadInvalidInput(inputList) {
  return Array.from(inputList).some(
    (inputElement) => !inputElement.validity.valid
  );
}

// if any input field is invalid disable the button
// and if all valid enable it
function toggleButtonState(inputList, buttonElement) {
  const isFormInvalid = hadInvalidInput(inputList);

  if (isFormInvalid) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

// make the input error message visible
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(
    validationConfig.errorInputPrefixSelector + inputElement.id
  );
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
  inputElement.classList.add(validationConfig.inputErrorClass);
}

// hide the input error message
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(
    validationConfig.errorInputPrefixSelector + inputElement.id
  );

  errorElement.classList.remove(validationConfig.errorClass);
  inputElement.classList.remove(validationConfig.inputErrorClass);
}

// if the input is invalid show the input error,
// hide otherwise
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// for each input element in a form add event listener
// so that each input triggers validation.
// also toggle button disabled state if all valid
function setEventListeners(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

// apply all validation logic to all forms on site
function enableValidation(config) {
  validationConfig = config;
  const formList = Array.from(document.forms);

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
}

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  errorInputPrefixSelector: ".form__input-error_",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
});

/*
function updateFormValidation(formElement) {
  const inputList = formElement.querySelectorAll(".form__input");
  const formSubmitButton = formElement.querySelector(".form__submit");

  Array.from(inputList).forEach((inputElement) => {
    checkInputValidity(formElement, inputElement);
  });

  toggleButtonState(inputList, formSubmitButton);
}
*/
