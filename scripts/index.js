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

function removePreload() {
  bodyElement.classList.remove("preload");
}

function displayModal() {
  modalOverlay.classList.add("modal_open");
}

function hideModal() {
  modalOverlay.classList.remove("modal_open");
  formElement.classList.remove("form_open");
  modalImagesElement.classList.remove("modal__image_type_open");
  setTimeout(() => {
    modalContainer.classList.remove("modal__container_type_image");
    modalImagesElement.classList.add("modal__image_type_closed");
    formElement.classList.remove("form_closed");
  }, 500);
}

function displayEdit() {
  removePreload();

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
  removePreload();

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

function displayModalImage() {
  removePreload();

  modalImage.src = this.src;
  modalImage.alt = this.alt;
  modalImageDescription.textContent = this.alt;

  modalContainer.classList.add("modal__container_type_image");
  modalImagesElement.classList.add("modal__image_type_open");
  modalImagesElement.classList.remove("modal__image_type_closed");

  formElement.classList.add("form_closed");

  displayModal();
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  console.log(formSelector);

  if (formSelector === "edit") {
    currentNameText.textContent = formNameText.value;
    currentAboutText.textContent = formAboutText.value;
  } else if (formSelector === "add") {
    const createdCard = {
      name: formNameText.value,
      link: formAboutText.value,
      alt: formNameText.value,
    };

    prependCards(createdCard);
  }

  hideModal();
}

function assignCardButtons(element) {
  const heartButton = element.querySelector(".card__like-button");
  heartButton.addEventListener("click", function () {
    this.classList.toggle("card_liked");
  });

  const deleteButton = element.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    this.closest(".card").remove();
  });

  const imageButton = element.querySelector(".card__image");
  imageButton.addEventListener("click", displayModalImage);
}

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__title").textContent = data["name"];
  cardElement.querySelector(".card__image").src = data["link"];
  cardElement.querySelector(".card__image").alt = data["name"];

  assignCardButtons(cardElement);

  return cardElement;
}

function prependCards(card) {
  const newCard = getCardElement(card);
  cardsDisplayed.prepend(newCard);
}

function appendCards(card) {
  const newCard = getCardElement(card);
  cardsDisplayed.append(newCard);
}

function loadCards(cards) {
  cards.forEach((card) => {
    appendCards(card);
  });
}

loadCards(initialCards);

editButton.addEventListener("click", displayEdit);
addButton.addEventListener("click", displayAdd);
closeButton.addEventListener("click", hideModal);
submitButton.addEventListener("click", handleFormSubmit);
