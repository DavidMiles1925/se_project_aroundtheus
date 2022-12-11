let initialCards = [
  {
    name: "Yosemite Valley",
    link: "./images/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "./images/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "./images/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "./images/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "./images/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "./images/lago.jpg",
  },
];

const bodyElement = document.querySelector(".body");

const formElement = document.querySelector(".form");
const formDescription = formElement.querySelector(".form__description");

const modalOverlay = document.querySelector(".modal");
const modalContainer = modalOverlay.querySelector(".modal__container");
const profileElement = document.querySelector(".profile");
const modalImagesElement = document.querySelector(".modal__images");

const closeButton = modalOverlay.querySelector(".modal__close-button");
const submitButton = formElement.querySelector(".form__submit-button");
const editButton = profileElement.querySelector(".profile__edit-button");
const addButton = profileElement.querySelector(".profile__add-button");

const formNameText = formElement.querySelector(".form__input_type_name");
const formAboutText = formElement.querySelector(".form__input_type_about");
const currentNameText = profileElement.querySelector(".profile__title");
const currentAboutText = profileElement.querySelector(".profile__description");

const cardTemplate = document.querySelector("#card").content;
const cardsDisplayed = document.querySelector(".cards");

const modalImage = modalImagesElement.querySelector(".modal__image");
const modalImageDescription = document.querySelector(
  ".modal__image-desctription"
);

let formSelector = "";

function clearImage() {
  bodyElement.classList.remove("preload");
  formElement.classList.remove("form_closed");
  modalImagesElement.classList.add("modal__image_closed");
  modalContainer.classList.remove("modal__container_type_image");
}

function displayEdit() {
  clearImage();
  formNameText.value = currentNameText.textContent;
  formAboutText.value = currentAboutText.textContent;
  formSelector = "edit";

  formDescription.textContent = "Edit Profile";
  formNameText.placeholder = "Name";
  formAboutText.placeholder = "About Me";
  submitButton.textContent = "Save";
  formElement.classList.add("form_open");
  displayModal();
}

function displayAdd() {
  clearImage();
  formNameText.value = "";
  formAboutText.value = "";
  formSelector = "add";

  formDescription.textContent = "New Place";
  formNameText.placeholder = "Title";
  formAboutText.placeholder = "Image link";
  submitButton.textContent = "Create";
  formElement.classList.add("form_open");
  displayModal();
}

function showModalImage() {
  bodyElement.classList.remove("preload");
  modalImage.src = this.src;
  modalImage.alt = this.alt;
  modalImagesElement.classList.remove("modal__image_closed");
  modalImagesElement.classList.add("modal__image_open");

  modalImageDescription.textContent = this.alt;

  modalContainer.classList.add("modal__container_type_image");

  formElement.classList.add("form_closed");

  displayModal();
}

function displayModal() {
  modalOverlay.classList.add("modal_open");
}

function hideModal() {
  modalOverlay.classList.remove("modal_open");
  formElement.classList.remove("form_open");
  modalImagesElement.classList.remove("modal__image_open");
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  console.log(formSelector);

  if (formSelector === "edit") {
    currentNameText.textContent = formNameText.value;
    currentAboutText.textContent = formAboutText.value;
  } else if (formSelector === "add") {
    let createdCard = {
      name: formNameText.value,
      link: formAboutText.value,
      alt: formNameText.value,
    };

    prependCards(createdCard);
  }

  hideModal();
}

function handleFormCreate(evt) {
  evt.preventDefault();
}

function likeCard() {
  this.classList.add("card_liked");
}

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__title").textContent = data["name"];
  cardElement.querySelector(".card__image").src = data["link"];
  cardElement.querySelector(".card__image").alt = data["name"];

  const heartButton = cardElement.querySelector(".card__button");
  heartButton.addEventListener("click", likeCard);

  const imageButton = cardElement.querySelector(".card__image");
  imageButton.addEventListener("click", showModalImage);

  return cardElement;
}

function prependCards(card) {
  let newCard = getCardElement(card);
  cardsDisplayed.prepend(newCard);
}

function appendCards(card) {
  let newCard = getCardElement(card);
  cardsDisplayed.append(newCard);
}

function loadCards() {
  initialCards.forEach((card) => {
    appendCards(card);
  });
}

loadCards();

editButton.addEventListener("click", displayEdit);
addButton.addEventListener("click", displayAdd);
closeButton.addEventListener("click", hideModal);
submitButton.addEventListener("click", handleFormSubmit);
