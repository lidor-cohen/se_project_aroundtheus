import "./index.css";
import Card from "../components/Card.js";
import { cardList, config, userInfo } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";

// What is a computer virus?
// A terminal illness.

// Popups
const imagePopup = new PopupWithImage({
  popupSelector: ".popup--open-image",
});
const userInfoPopup = new PopupWithForm(
  { popupSelector: ".popup--edit-profile" },
  (data) => userInfo.setUserInfo({ name: data.name, job: data.job })
);
const newPlacePopupButton = document.querySelector(".profile__add-button");
const editInfoPopupButton = document.querySelector(
  ".profile__edit-name-button"
);

// Gallery
function createCard(data) {
  const card = new Card(data, ".card", () => {
    imagePopup.open({ name: data.name, url: data.link });
  });

  return card.getCard().element;
}

const gallery = new Section(
  {
    items: cardList,
    renderer: (data) => {
      const cardElement = createCard(data);
      gallery.addItem(cardElement);
    },
  },
  ".gallery"
);

const newPlacePopup = new PopupWithForm(
  { popupSelector: ".popup--new-place" },
  (data) => {
    gallery.addItem(
      createCard({ name: data["place-name"], link: data["place-url"] })
    );
  }
);

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

// Popups Event Listeners
(() => {
  // Popups Event Listeners
  imagePopup.setEventListeners();
  newPlacePopup.setEventListeners();
  userInfoPopup.setEventListeners();

  // Popups Buttons Event Listeners
  newPlacePopupButton.addEventListener("click", () => {
    newPlacePopup.open();
  });
  editInfoPopupButton.addEventListener("click", () => {
    userInfoPopup.setInputValues({
      name: userInfo.getUserInfo().name,
      job: userInfo.getUserInfo().job,
    });
    userInfoPopup.open();
  });
})();

gallery.renderItems();
