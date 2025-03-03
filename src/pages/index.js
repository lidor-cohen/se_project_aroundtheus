import "./index.css";
import Card from "../components/Card.js";
import { config, userInfo } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";

let currentCard = undefined;

// API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  authToken: "7fef8830-65a5-4840-8327-1cd6adab3c4d",
});

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

// Delete card Popup
const deleteCardPopup = new PopupWithForm(
  {
    popupSelector: ".popup--delete-card",
  },
  () => {
    deleteCardPopup.updateFormSubmit("Deleting...");
    deleteCardPopup.getFormValidator(formValidators).disableSubmitButton();
    return api
      .deleteCard({
        cardId: currentCard.getCard().id,
      })
      .then(() => {
        currentCard.delete();
        return Promise.resolve();
      })
      .then(() => {
        deleteCardPopup.getFormValidator(formValidators).disableSubmitButton();
        deleteCardPopup.close();
      })
      .catch((err) => {
        deleteCardPopup.updateFormSubmit("Error - Try Again");
        deleteCardPopup
          .getFormValidator(formValidators)
          .disableSubmitButton(false);

        console.error(`Error: ${err}`);
      });
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
      deleteCardPopup.updateFormSubmit("Delete");
      deleteCardPopup.open();
      deleteCardPopup
        .getFormValidator(formValidators)
        .disableSubmitButton(false);
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

// Render all initials information from API
api
  .getUser()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      id: userData._id,
      pfpURL: userData.avatar,
    });
  })
  .catch((err) => {
    userInfo.setUserInfo({
      name: "Error: Not Found",
      job: "Error: Not Found",
    });
    console.error(`Error: ${err}`);
  });

let gallery = null;
api
  .getCards()
  .then((cards) => {
    gallery = new Section(
      {
        items: cards,
        renderer: (item) => gallery.addItem(createCard(item), "append"),
      },
      ".gallery"
    );

    gallery.clear();
    gallery.renderItems();
  })
  .catch((err) => console.error(`Error: ${err}`));

// Change user info
const editInfoPopupButton = document.querySelector(
  ".profile__edit-name-button"
);

const userInfoPopup = new PopupWithForm(
  { popupSelector: ".popup--edit-profile" },
  (data) => {
    userInfoPopup.updateFormSubmit("Saving...");
    userInfoPopup.getFormValidator(formValidators).disableSubmitButton();
    api
      .updateProfile({ name: data.name, about: data.job })
      .then((res) => {
        userInfo.setUserInfo({ name: res.name, job: res.about });
        userInfoPopup.close();
      })
      .catch((err) => {
        userInfoPopup.updateFormSubmit("Error - Try Again");
        userInfoPopup
          .getFormValidator(formValidators)
          .disableSubmitButton(false);
        console.error(`Error: ${err}`);
      });
  }
);
userInfoPopup.setEventListeners();
editInfoPopupButton.addEventListener("click", () => {
  userInfoPopup.setInputValues({
    name: userInfo.getUserInfo().name,
    job: userInfo.getUserInfo().job,
  });
  userInfoPopup.updateFormSubmit("Save");
  userInfoPopup.getFormValidator(formValidators).disableSubmitButton();
  userInfoPopup.open();
});

// Add new card
const newPlacePopupButton = document.querySelector(".profile__add-button");
const newPlacePopup = new PopupWithForm(
  { popupSelector: ".popup--new-place" },
  (data) => {
    newPlacePopup.updateFormSubmit("Creating...");
    newPlacePopup.getFormValidator(formValidators).disableSubmitButton();
    api
      .addCard({
        name: data["place-name"],
        url: data["place-url"],
      })
      .then((res) => {
        gallery.addItem(createCard(res));
        return Promise.resolve();
      })
      .then(() => {
        newPlacePopup.getFormValidator(formValidators).reset();
        newPlacePopup.close();
      })
      .catch((err) => {
        newPlacePopup.updateFormSubmit("Error - Try Again");
        newPlacePopup
          .getFormValidator(formValidators)
          .disableSubmitButton(false);
        console.error(`Error: ${err}`);
      });
  }
);
newPlacePopupButton.addEventListener("click", () => {
  newPlacePopup.updateFormSubmit("Create");
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
    pfpPopup.updateFormSubmit("Updating...");
    pfpPopup.getFormValidator(formValidators).disableSubmitButton();
    api
      .updateProfilePicture({ url: data["pfp-url"] })
      .then((res) => {
        userInfo.setUserInfo({ pfpURL: res.avatar });
        pfpPopup.getFormValidator(formValidators).reset();
        pfpPopup.close();
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
        pfpPopup.getFormValidator(formValidators).disableSubmitButton(false);
        pfpPopup.updateFormSubmit("Error - Try Again");
      });
  }
);
pfpPopup.setEventListeners();
pfpButton.addEventListener("click", () => {
  pfpPopup.open();
  pfpPopup.updateFormSubmit("Update");
});
