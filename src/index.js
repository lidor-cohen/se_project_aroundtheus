import "./styles/normalize.css";
import "./styles/fonts.css";
import "./styles/main-wrapper.css";
import "./styles/page.css";
import "./styles/header.css";
import "./styles/content.css";
import "./styles/profile.css";
import "./styles/gallery.css";
import "./styles/card.css";
import "./styles/footer.css";
import "./styles/modal.css";
import "./styles/form.css";

import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";

const cardList = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// -- Form Validator
const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  errorInputPrefixSelector: ".form__input-error_",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
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

// -- Image Popup
const imagePopup = new PopupWithImage({ popupSelector: ".popup--open-image" });
imagePopup.setEventListeners();

// -- Gallery
const gallery = document.querySelector(".gallery");

function createCard(data) {
  const card = new Card(data, ".card", () => {
    imagePopup.open({ name: data.name, url: data.link });
  });
  return card.getCard().element;
}

function addNewCard(data) {
  cardList.push(data);
  gallery.prepend(createCard(data));
}

cardList.forEach((data) => {
  gallery.append(createCard(data));
});

// -- Add Place Modal
const newPlacePopup = new PopupWithForm(
  { popupSelector: ".popup--new-place" },
  (data) => addNewCard({ name: data["place-name"], link: data["place-url"] })
);
newPlacePopup.setEventListeners();

const newPlacePopupButton = document.querySelector(".profile__add-button");
newPlacePopupButton.addEventListener("click", () => {
  newPlacePopup.open();
});

// -- Profile Modal
const userInfo = new UserInfo({
  nameElement: document.querySelector(".profile__name"),
  jobElement: document.querySelector(".profile__job"),
});
const userInfoPopup = new PopupWithForm(
  { popupSelector: ".popup--edit-profile" },
  (data) => userInfo.setUserInfo({ name: data.name, job: data.job })
);
userInfoPopup.setEventListeners();

const editInfoPopupButton = document.querySelector(
  ".profile__edit-name-button"
);
editInfoPopupButton.addEventListener("click", () => {
  formValidators["profile-form"].setInputValue(
    "name",
    userInfo.getUserInfo().name
  );
  formValidators["profile-form"].setInputValue(
    "job",
    userInfo.getUserInfo().job
  );
  userInfoPopup.open();
});
