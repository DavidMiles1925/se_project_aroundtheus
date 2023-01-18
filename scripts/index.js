import { resetValidation } from "./validate.js";
import { configValidate } from "./validate.js";

const configClose = {
  closeButtonSelector: ".modal__close-button",
  modalOverlaySelector: ".modal",
  modalContainerList: ".modal__container",
};

const initialCards = [
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

const modalProfile = document.querySelector(".modal_profile");
const modalAddCard = document.querySelector(".modal_add-card");
const modalDisplayImage = document.querySelector(".modal_display-image");

const formProfileElement = modalProfile.querySelector(".form");
const formAddCardElement = modalAddCard.querySelector(".form");

const profileElement = document.querySelector(".profile");

const editButton = profileElement.querySelector(".profile__edit-button");
const addButton = profileElement.querySelector(".profile__add-button");

const formNameText = modalProfile.querySelector(".form__input_type_name");
const formAboutText = modalProfile.querySelector(".form__input_type_about");
const currentNameText = profileElement.querySelector(".profile__title");
const currentAboutText = profileElement.querySelector(".profile__description");

const formTitleText = modalAddCard.querySelector(".form__input_type_place");
const formLinkText = modalAddCard.querySelector(".form__input_type_link");

const cardTemplate = document.querySelector("#card").content;
const cardsDisplayed = document.querySelector(".cards");

const modalImage = modalDisplayImage.querySelector(".modal__image");
const modalImageDescription = modalDisplayImage.querySelector(
  ".modal__image-desctription"
);

function removePreload() {
  bodyElement.classList.remove("preload");
}

function hideModalOnRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    hideModal(evt.target);
  }
}

function hideModalOnEsape(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_open");
    hideModal(openModal);
  }
}

function displayModal(modal) {
  modal.classList.add("modal_open");
  document.addEventListener("keydown", hideModalOnEsape);
  modal.addEventListener("mousedown", hideModalOnRemoteClick);
}

function hideModal(modal) {
  modal.classList.remove("modal_open");
  document.removeEventListener("keydown", hideModalOnEsape);
  modal.removeEventListener("mousedown", hideModalOnRemoteClick);
}

function fillProfileForm() {
  formNameText.value = currentNameText.textContent;
  formAboutText.value = currentAboutText.textContent;
}

function displayEdit() {
  removePreload();
  fillProfileForm();
  displayModal(modalProfile);
  resetValidation(configValidate);
}

function displayAdd() {
  removePreload();
  formAddCardElement.reset();
  displayModal(modalAddCard);
  resetValidation(configValidate);
}

function displayImage() {
  removePreload();

  const modalImageAltText = this.alt;
  modalImage.src = this.src;
  modalImage.alt = modalImageAltText;
  modalImageDescription.textContent = modalImageAltText;

  displayModal(modalDisplayImage);
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  currentNameText.textContent = formNameText.value;
  currentAboutText.textContent = formAboutText.value;
  hideModal(modalProfile);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const createdCard = {
    name: formTitleText.value,
    link: formLinkText.value,
    alt: formTitleText.value,
  };
  prependCard(createdCard);
  hideModal(modalAddCard);
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
  imageButton.addEventListener("click", displayImage);
}

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardText = cardElement.querySelector(".card__title");

  cardText.textContent = data["name"];
  cardImage.src = data["link"];
  cardImage.alt = data["name"];

  assignCardButtons(cardElement);

  return cardElement;
}

function prependCard(card) {
  const newCard = getCardElement(card);
  cardsDisplayed.prepend(newCard);
}

function appendCard(card) {
  const newCard = getCardElement(card);
  cardsDisplayed.append(newCard);
}

function loadCards(cards) {
  cards.forEach((card) => {
    appendCard(card);
  });
}

function setCloseListeners(config) {
  const closeButtonList = [
    ...document.querySelectorAll(config.closeButtonSelector),
  ];

  closeButtonList.forEach((button) => {
    button.addEventListener("click", function () {
      hideModal(button.closest(config.modalOverlaySelector));
    });
  });
}

function setPageListeners() {
  editButton.addEventListener("click", displayEdit);
  addButton.addEventListener("click", displayAdd);
  formProfileElement.addEventListener("submit", handleProfileSubmit);
  formAddCardElement.addEventListener("submit", handleAddCardSubmit);
  setCloseListeners(configClose);
}

loadCards(initialCards);
setPageListeners();
