import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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

// -- Modal Visibility
function handleExitModalEscape(evt) {
  if (evt.key == "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    if (activeModal) toggleModalVisibility(activeModal);
  }
}

function toggleModalVisibility(modalElement) {
  modalElement.classList.toggle("modal_opened");

  if (modalElement.classList.contains("modal_opened")) {
    document.addEventListener("keydown", handleExitModalEscape);
  } else {
    document.removeEventListener("keydown", handleExitModalEscape);
  }
}

// -- Modal Exit

// Exit by Clicking Backdrop
const modalList = document.querySelectorAll(".modal");
Array.from(modalList).forEach((modalElement) => {
  modalElement.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal")) {
      toggleModalVisibility(modalElement);
    }
  });
});

// Exit by Button
const exitButtons = document.querySelectorAll(".modal__exit-btn");
exitButtons.forEach((exitButton) => {
  exitButton.addEventListener("click", () => {
    toggleModalVisibility(exitButton.closest(".modal"));
  });
});

// -- Gallery
const imageViewModal = document.querySelector(".modal--open-image");
const image = imageViewModal.querySelector(".modal__image");
const imageName = imageViewModal.querySelector(".modal__place-name");

const gallery = document.querySelector(".gallery");
const cardImageHandler = (card) => {
  toggleModalVisibility(imageViewModal);

  const { name, link } = card.getCard();

  imageName.textContent = name;
  image.alt = name;
  image.src = link;
};

function createCard(data) {
  const card = new Card(data, ".card", cardImageHandler);
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

const newPlaceModal = document.querySelector(".modal--new-place");
const newPlaceButton = document.querySelector(".profile__add-button");
const newPlaceName = newPlaceModal.querySelector("#place-name");
const newPlaceUrl = newPlaceModal.querySelector("#place-url");

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();

  addNewCard({
    name: newPlaceName.value,
    link: newPlaceUrl.value,
  });

  formValidators["new-place-form"].reset();
  toggleModalVisibility(newPlaceModal);
}

newPlaceButton.addEventListener("click", () => {
  toggleModalVisibility(newPlaceModal);
});

formValidators["new-place-form"]
  .getFormElement()
  .addEventListener("submit", handleNewPlaceFormSubmit);

// -- Profile Modal

const editProfileButton = document.querySelector(".profile__edit-name-button");
const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__name");
const profileJob = profileInfo.querySelector(".profile__job");

const editProfileModal = document.querySelector(".modal--edit-profile");

const editProfileModalNameInput = editProfileModal.querySelector("#name");
const editProfileModalJobInput = editProfileModal.querySelector("#job");

// Set form content to name and job
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileModalNameInput.value;
  profileJob.textContent = editProfileModalJobInput.value;
  toggleModalVisibility(editProfileModal);
}

// Submit edit profile modal
formValidators["profile-form"]
  .getFormElement()
  .addEventListener("submit", handleProfileFormSubmit);

editProfileButton.addEventListener("click", function () {
  editProfileModalNameInput.value = profileName.textContent;
  editProfileModalJobInput.value = profileJob.textContent;
  formValidators["profile-form"].hideInputErrors();
  toggleModalVisibility(editProfileModal);
});
