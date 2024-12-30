const initialCards = [
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

function toggleModalVisibility() {
  editProfileModal.classList.toggle("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalNameInput.value;
  profileJob.textContent = modalJobInput.value;
  editProfileModal.classList.toggle("modal_opened");
}

function getCardElement(card) {
  const cardTemplate = document.querySelector("#card-template").content;

  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__name");

  cardImage.alt = card.name;
  cardImage.src = card.link;
  cardTitle.textContent = card.name;

  return cardElement;
}

const editProfileButton = document.querySelector(".profile__edit-name-button");

const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__name");
const profileJob = profileInfo.querySelector(".profile__job");

const editProfileModal = document.querySelector(".modal");
const modalExitButton = editProfileModal.querySelector(".modal__exit-btn");
const modalNameInput = editProfileModal.querySelector("#name");
const modalJobInput = editProfileModal.querySelector("#job");
const modalForm = editProfileModal.querySelector(".modal__form");

modalNameInput.value = profileName.textContent;
modalJobInput.value = profileJob.textContent;

editProfileButton.addEventListener("click", toggleModalVisibility);
modalExitButton.addEventListener("click", toggleModalVisibility);
modalForm.addEventListener("submit", handleProfileFormSubmit);

const gallery = document.querySelector(".gallery");
let changingCardElement = null;
for (item of initialCards) {
  changingCardElement = getCardElement(item);
  gallery.append(changingCardElement);
}
