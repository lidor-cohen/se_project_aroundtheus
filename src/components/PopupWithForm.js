import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector }, submitCallback) {
    super({ popupSelector });
    this._submitCallback = submitCallback;

    this._formInputSelector = ".form__input";
    this._formElement = this._popup.querySelector(".form");
    this._inputElements = Array.from(
      this._popup.querySelectorAll(this._formInputSelector)
    );
    this._formSubmit = this._formElement.querySelector(".form__submit");
  }

  _getInputValues = () => {
    const values = {};

    this._inputElements.forEach((inputElement) => {
      values[inputElement.id] = inputElement.value;
    });

    return values;
  };

  setInputValues(data) {
    this._inputElements.forEach((input) => {
      input.value = data[input.id];
    });
  }

  getFormValidator(validators) {
    return validators[this._formElement.getAttribute("name")];
  }

  getForm() {
    return this._formElement;
  }

  updateFormSubmit(value) {
    this._formSubmit.textContent = value;
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  };
}
