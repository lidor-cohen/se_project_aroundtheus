import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector }, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;

    this._formElement = this._popup.querySelector(".popup__form");
    this._formInputSelector = ".form__input";
  }

  _getInputValues = () => {
    const inputElements = Array.from(
      this._popup.querySelectorAll(this._formInputSelector)
    );
    const values = {};

    inputElements.forEach((inputElement) => {
      values[inputElement.name] = inputElement.value;
    });

    return values;
  };

  setEventListeners = () => {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues);
    });
  };
}
