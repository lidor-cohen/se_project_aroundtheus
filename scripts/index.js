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

// -- Modal Visibility

function handleExitModalEscape(evt) {
  if (evt.key == "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    if (activeModal) toggleModalVisibility(activeModal);
    document.removeEventListener("keydown", handleExitModalEscape);
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
const cardTemplate = document.querySelector("#card-template").content;
const gallery = document.querySelector(".gallery");
const image = imageViewModal.querySelector(".modal__image");
const imageName = imageViewModal.querySelector(".modal__place-name");

function getCardElement(card) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__name");
  const likeButton = cardElement.querySelector(".card__like-btn");
  const deleteButton = cardElement.querySelector(".card__delete-btn");

  cardImage.alt = card.name;
  cardImage.src = card.link;
  cardTitle.textContent = card.name;

  cardImage.addEventListener("click", (evt) => {
    toggleModalVisibility(imageViewModal);

    imageName.textContent = card.name;
    image.alt = card.name;
    image.src = card.link;
  });

  likeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like-btn_mode_liked");
  });

  deleteButton.addEventListener("click", (evt) => {
    cardElement.remove();
  });

  return cardElement;
}

function addNewCard(cardObject) {
  cardList.push(cardObject);

  const cardElement = getCardElement(cardObject);
  gallery.prepend(cardElement);
}

cardList.forEach((item) => {
  const cardElement = getCardElement(item);
  gallery.append(cardElement);
});

// -- Add Image Modal

const newPlaceModal = document.querySelector(".modal--new-place");
const newPlaceButton = document.querySelector(".profile__add-button");
const newPlaceForm = document.forms["new-place-form"];
const newPlaceName = newPlaceModal.querySelector("#place-name");
const newPlaceUrl = newPlaceModal.querySelector("#place-url");
const newPlaceSubmit = newPlaceModal.querySelector(".form__submit");

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();

  addNewCard({
    name: newPlaceName.value,
    link: newPlaceUrl.value,
  });

  evt.target.reset();
  newPlaceSubmit.classList.add("form__submit_inactive");
  newPlaceSubmit.setAttribute("disabled", "");
  toggleModalVisibility(newPlaceModal);
}

newPlaceButton.addEventListener("click", () => {
  toggleModalVisibility(newPlaceModal);
});

newPlaceForm.addEventListener("submit", handleNewPlaceFormSubmit);

// -- Profile Modal

const editProfileButton = document.querySelector(".profile__edit-name-button");
const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__name");
const profileJob = profileInfo.querySelector(".profile__job");

const editProfileModal = document.querySelector(".modal--edit-profile");

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

// Submit edit profile modal
editProfileModalForm.addEventListener("submit", handleProfileFormSubmit);

editProfileButton.addEventListener("click", function () {
  editProfileModalNameInput.value = profileName.textContent;
  editProfileModalJobInput.value = profileJob.textContent;
  toggleModalVisibility(editProfileModal);
});
