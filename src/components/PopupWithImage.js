import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._image = this._popup.querySelector(".popup__image");
    this._imageCaption = this._popup.querySelector(".popup__place-name");
  }

  open({ name, url }) {
    this._imageCaption.textContent = name;
    this._image.alt = name;
    this._image.src = url;
    super.open();
  }
}
