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

// -- Gallery

const cardTemplate = document.querySelector("#card-template").content;
const gallery = document.querySelector(".gallery");

function getCardElement(card) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__name");
  const likeButton = cardElement.querySelector(".card__like-btn");
  const deleteButton = cardElement.querySelector(".card__delete-btn");

  cardImage.alt = card.name;
  cardImage.src = card.link;
  cardTitle.textContent = card.name;

  likeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like-btn_mode_liked");
  });

  deleteButton.addEventListener("click", (evt) => {
    evt.target.closest(".card").remove();
  });

  return cardElement;
}

function addNewCard(cardObject) {
  console.log(cardList);
  cardList.push(cardObject);

  const cardElement = getCardElement(cardObject);
  gallery.append(cardElement);
}

cardList.forEach((item) => {
  const cardElement = getCardElement(item);
  gallery.append(cardElement);
});

// -- Modal Visibility

function toggleModalVisibility(modalElement) {
  modalElement.classList.toggle("modal_opened");
}

// -- Add Image Modal

const newPlaceModal = document.querySelector(".modal--new-place");
const addProfileButton = document.querySelector(".profile__add-button");
const addProfileExitButton = newPlaceModal.querySelector(".modal__exit-btn");
const addProfileCreateButton = document.forms["new-place-form"];
const newPlaceName = newPlaceModal.querySelector("#place-name");
const newPlaceUrl = newPlaceModal.querySelector("#place-url");

addProfileButton.addEventListener("click", () =>
  toggleModalVisibility(newPlaceModal)
);

addProfileExitButton.addEventListener("click", () =>
  toggleModalVisibility(newPlaceModal)
);

newPlaceModal.addEventListener("submit", handleNewPlaceFormSubmit);

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();

  addNewCard({
    name: newPlaceName.value,
    link: newPlaceUrl.value,
  });

  newPlaceName.value = "";
  newPlaceUrl.value = "";
  toggleModalVisibility(newPlaceModal);
}

// -- Profile Modal

const editProfileButton = document.querySelector(".profile__edit-name-button");
const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__name");
const profileJob = profileInfo.querySelector(".profile__job");

const editProfileModal = document.querySelector(".modal--edit-profile");
const editProfileModalExitButton =
  editProfileModal.querySelector(".modal__exit-btn");
const editProfileModalNameInput = editProfileModal.querySelector("#name");
const editProfileModalJobInput = editProfileModal.querySelector("#job");
const editProfileModalForm = document.forms["profile-form"];

// Set form content to name and job
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileModalNameInput.value;
  profileJob.textContent = editProfileModalJobInput.value;
  toggleModalVisibility(editProfileModal);
}

// Close editProfileModal
editProfileModalExitButton.addEventListener("click", () =>
  toggleModalVisibility(editProfileModal)
);

// Submit edit profile modal
editProfileModalForm.addEventListener("submit", handleProfileFormSubmit);

editProfileButton.addEventListener("click", function () {
  editProfileModalNameInput.value = profileName.textContent;
  editProfileModalJobInput.value = profileJob.textContent;
  toggleModalVisibility(editProfileModal);
});
