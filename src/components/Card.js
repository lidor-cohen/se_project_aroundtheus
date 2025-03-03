export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector = ".card",
    { handleImageClick, likeCallback, deleteCallback }
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this.isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._deleteCallback = deleteCallback;
    this._likeCallback = likeCallback;

    this._cardSelectors = {
      name: `${cardSelector}__name`,
      image: `${cardSelector}__image`,
      likeButton: `${cardSelector}__like-btn`,
      deleteButton: `${cardSelector}__delete-btn`,
    };

    this.init();
  }

  _likeButtonHandler = (evt) => {
    this._likeCallback().then(() => {
      this.isLiked = !this.isLiked;
      this.updateLike();
    });
  };

  _deleteButtonHandler = (evt) => {
    this._deleteCallback();
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

  init = () => {
    this._cardElement = document
      .querySelector("#card-template")
      .content.querySelector(this._cardSelector)
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

    return this._cardElement;
  };

  delete() {
    evt.target.closest(this._cardSelector).remove();
  }

  updateLike() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-btn_mode_liked");
    } else {
      this._likeButton.classList.remove("card__like-btn_mode_liked");
    }
  }

  getCard = () => {
    return {
      name: this._name,
      link: this._link,
      element: this._cardElement,
      id: this._id,
    };
  };
}
