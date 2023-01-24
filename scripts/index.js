import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import {
  removePreload,
  hideModalOnRemoteClick,
  hideModalOnEscape,
  displayModal,
  hideModal,
} from "./utils.js";

const configValidate = {
  formSelector: ".form",
  formFieldsetSelector: ".form__fieldset",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

const configClose = {
  closeButtonSelector: ".modal__close-button",
  modalOverlaySelector: ".modal",
  modalContainerList: ".modal__container",
};

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "../images/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "../images/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "../images/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "../images/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "../images/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "../images/lago.jpg",
  },
];

const modalProfile = document.querySelector(".modal_profile");
const modalAddCard = document.querySelector(".modal_add-card");

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

const cardSelector = "#card";
const cardsDisplayed = document.querySelector(".cards");

const editFormValidator = new FormValidator(configValidate, formProfileElement);
const addFormValidator = new FormValidator(configValidate, formAddCardElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

function fillProfileForm() {
  formNameText.value = currentNameText.textContent;
  formAboutText.value = currentAboutText.textContent;
}

function displayEdit() {
  removePreload();
  fillProfileForm();
  displayModal(modalProfile);
  editFormValidator.resetValidation();
}

function displayAdd() {
  removePreload();
  formAddCardElement.reset();
  displayModal(modalAddCard);
  addFormValidator.resetValidation();
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
  };
  const newCard = new Card(createdCard, cardSelector);
  prependCard(newCard.getCardElement());
  hideModal(modalAddCard);
}

function prependCard(card) {
  cardsDisplayed.prepend(card);
}

function appendCard(card) {
  cardsDisplayed.append(card);
}

function loadCards(cards) {
  cards.forEach((card) => {
    const newCard = new Card(card, cardSelector);
    appendCard(newCard.getCardElement());
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
