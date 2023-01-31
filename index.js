import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js";
import {
  removePreload,
  displayModal,
  hideModal,
  setCloseListeners,
} from "./utils/utils.js";
import {
  configClose,
  configValidate,
  initialCards,
} from "./constants/constants.js";

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
  prependCard(createCard(createdCard, cardSelector));
  hideModal(modalAddCard);
}

function createCard(card, cardSelector) {
  const newCard = new Card(card, cardSelector);
  return newCard.getCardElement();
}

function prependCard(card) {
  cardsDisplayed.prepend(card);
}

function appendCard(card) {
  cardsDisplayed.append(card);
}

function loadCards(cards) {
  cards.forEach((card) => {
    appendCard(createCard(card, cardSelector));
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
