import "./index.css";
import Card from "../components/Card.js";
import { config, userInfo } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";

let currentCard = undefined;

// Delete card Popup
const deleteCardPopup = new PopupWithForm(
  { popupSelector: ".popup--delete-card" },
  () => {
    return api
      .deleteCard({
        cardId: currentCard.getCard().id,
      })
      .then(() => renderCards());
  }
);
deleteCardPopup.setEventListeners();

// Create card
function createCard(data) {
  const card = new Card(data, ".card", {
    handleImageClick: () => {
      imagePopup.open({ name: data.name, url: data.link });
    },
    deleteCallback: () => {
      currentCard = card;
      deleteCardPopup.open();
    },
    likeCallback: () => {
      return !card.isLiked
        ? api.like({ cardId: card.getCard().id })
        : api.unlike({ cardId: card.getCard().id });
    },
  });

  card.updateLike();

  return card.getCard().element;
}

// API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  authToken: "7fef8830-65a5-4840-8327-1cd6adab3c4d",
});

// Render all initials information from API
api.getUser().then((userData) => {
  userInfo.setUserInfo({
    name: userData.name,
    job: userData.about,
    id: userData._id,
    pfpURL: userData.avatar,
  });
});

function renderCards() {
  api.getCards().then((cards) => {
    const gallery = new Section(
      {
        items: cards,
        renderer: (item) => gallery.addItem(createCard(item), "append"),
      },
      ".gallery"
    );

    gallery.clear();
    gallery.renderItems();
  });
}
renderCards();

// Change user info
const editInfoPopupButton = document.querySelector(
  ".profile__edit-name-button"
);

const userInfoPopup = new PopupWithForm(
  { popupSelector: ".popup--edit-profile" },
  (data) => {
    api.updateProfile({ name: data.name, about: data.job }).then((res) => {
      userInfo.setUserInfo({ name: res.name, job: res.about });
    });
  }
);
userInfoPopup.setEventListeners();
editInfoPopupButton.addEventListener("click", () => {
  userInfoPopup.setInputValues({
    name: userInfo.getUserInfo().name,
    job: userInfo.getUserInfo().job,
  });
  userInfoPopup.open();
});

// Add new card
const newPlacePopupButton = document.querySelector(".profile__add-button");
const newPlacePopup = new PopupWithForm(
  { popupSelector: ".popup--new-place" },
  (data) => {
    api
      .addCard({
        name: data["place-name"],
        url: data["place-url"],
      })
      .then((res) => {
        renderCards();
      });
  }
);
newPlacePopupButton.addEventListener("click", () => {
  newPlacePopup.open();
});
newPlacePopup.setEventListeners();

const imagePopup = new PopupWithImage({
  popupSelector: ".popup--open-image",
});
imagePopup.setEventListeners();

// Updating PFP
const pfpButton = document.querySelector(".profile__avatar-container");
const pfpImage = document.querySelector(".profile__avatar");
const pfpPopup = new PopupWithForm(
  { popupSelector: ".popup--change-pfp" },
  (data) => {
    api
      .updateProfilePicture({ url: data["pfp-url"] })
      .then((res) => {
        pfpImage.src = res.avatar;
      })
      .catch((err) => console.error(err));
  }
);
pfpPopup.setEventListeners();
pfpButton.addEventListener("click", () => pfpPopup.open());

// Form Validation
const formValidators = {};
const enableValidation = (config) => {
  const formList = Array.from(document.forms);
  formList.forEach((formElement) => {
    const formName = formElement.getAttribute("name");
    const validator = new FormValidator(config, formElement);

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(config);
