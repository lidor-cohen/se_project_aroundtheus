export default class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(popupSelector);
    this._popupExitButton = this._popup.querySelector(".popup__exit-btn");
    this._isOpened = false;

    this._popupContainerClass = "popup";
    this._openedPopupClass = "popup_opened";
  }

  open() {
    this._popup.classList.add(this._openedPopupClass);
    document.addEventListener("keydown", this._handleEscClose);
    this._isOpened = true;
  }

  close() {
    this._popup.classList.remove(this._openedPopupClass);
    document.removeEventListener("keydown", this._handleEscClose);
    this._isOpened = false;
  }

  toggle() {
    this._popup.classList.toggle(this._openedPopupClass);
    this._isOpened = !this._isOpened;
  }

  _handleEscClose = (evt) => {
    if (evt.key == "Escape") {
      if (this._isOpened) this.close();
    }
  };

  _handleBackdropClose = (evt) => {
    if (evt.target.classList.contains(this._popupContainerClass)) {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener("click", this._handleBackdropClose);
    this._popupExitButton.addEventListener("click", () => {
      this.close();
    });
  }
}
