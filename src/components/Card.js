export default class Card {
  constructor({ name, link }, cardSelector = ".card", handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;

    this._cardSelectors = {
      name: `${cardSelector}__name`,
      image: `${cardSelector}__image`,
      likeButton: `${cardSelector}__like-btn`,
      deleteButton: `${cardSelector}__delete-btn`,
    };

    this._init();
  }

  _likeButtonHandler = (evt) => {
    evt.target.classList.toggle("card__like-btn_mode_liked");
  };

  _deleteButtonHandler = (evt) => {
    evt.target.closest(this._cardSelector).remove();
  };

  _setEventListeners = () => {
    // Like Button Logic
    this._likeButton.addEventListener("click", this._likeButtonHandler);

    // Delete Button Logic
    this._deleteButton.addEventListener("click", this._deleteButtonHandler);

    // Image Modal Button Logic
    this._imageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  };

  _init = () => {
    const template = document.createElement("template");
    template.innerHTML = `<div class="card">
      <img class="card__image" src="" alt="" />
      <div class="card__name-like">
        <h2 class="card__name"></h2>
        <button type="button" class="card__like-btn"></button>
      </div>
      <button type="button" class="card__delete-btn"></button>
    </div>
  `;

    this._cardElement = template.content
      .querySelector(this._cardSelector)
      .cloneNode(true);

    this._likeButton = this._cardElement.querySelector(
      this._cardSelectors.likeButton
    );
    this._deleteButton = this._cardElement.querySelector(
      this._cardSelectors.deleteButton
    );
    this._imageElement = this._cardElement.querySelector(
      this._cardSelectors.image
    );
    this._nameElement = this._cardElement.querySelector(
      this._cardSelectors.name
    );

    this._imageElement.alt = this._name;
    this._imageElement.src = this._link;
    this._nameElement.textContent = this._name;

    this._setEventListeners();
  };

  getCard = () => {
    return {
      name: this._name,
      link: this._link,
      element: this._cardElement,
    };
  };
}
