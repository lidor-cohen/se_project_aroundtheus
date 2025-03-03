export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._submitButtonElement = formElement.querySelector(
      config.submitButtonSelector
    );

    this._inputList = formElement.querySelectorAll(this._config.inputSelector);
  }

  _isInputValid = (inputElement) => !inputElement.validity.valid;

  _hasInvalidInput = () =>
    Array.from(this._inputList).some((inputElement) =>
      this._isInputValid(inputElement)
    );

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(
      this._config.errorInputPrefixSelector + inputElement.id
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
    inputElement.classList.add(this._config.inputErrorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      this._config.errorInputPrefixSelector + inputElement.id
    );

    errorElement.classList.remove(this._config.errorClass);
    inputElement.classList.remove(this._config.inputErrorClass);
  };

  disableSubmitButton(flag = true) {
    if (flag) {
      this._submitButtonElement.classList.add(this._config.inactiveButtonClass);
      this._submitButtonElement.setAttribute("disabled", "");
    } else {
      this._submitButtonElement.classList.remove(
        this._config.inactiveButtonClass
      );
      this._submitButtonElement.removeAttribute("disabled");
    }
  }

  reset = () => {
    this._formElement.reset();
  };

  hideInputErrors() {
    this._inputList.forEach((inputElement) =>
      this._hideInputError(inputElement)
    );
  }

  getFormElement() {
    return this._formElement;
  }

  _toggleButtonState = () => {
    const isFormInvalid = this._hasInvalidInput();

    this.disableSubmitButton(isFormInvalid);
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners = () => {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._inputList.length !== 0) this.disableSubmitButton();
    });
    this._setEventListeners();
  }
}
