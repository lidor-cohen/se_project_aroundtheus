import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector }, submitCallback) {
    super({ popupSelector });
    this._submitCallback = submitCallback;

    this._formElement = this._popup.querySelector(".popup__form");
    this._formInputSelector = ".form__input";
    this._inputElements = Array.from(
      this._popup.querySelectorAll(this._formInputSelector)
    );
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

  getForm() {
    return this._formElement;
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
      this._formElement.reset();
      this.close();
    });
  };
}
