import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js";
import {
  configValidate,
  configUser,
  initialCards,
} from "./constants/constants.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import Section from "./components/Section.js";

const modalProfile = document.querySelector(".modal_profile");
const modalAddCard = document.querySelector(".modal_add-card");
const modalImage = document.querySelector(".modal_display-image");

const formProfileElement = modalProfile.querySelector(".form");
const formAddCardElement = modalAddCard.querySelector(".form");

const profileElement = document.querySelector(".profile");

const editButton = profileElement.querySelector(".profile__edit-button");
const addButton = profileElement.querySelector(".profile__add-button");

const formNameText = modalProfile.querySelector(".form__input_type_name");
const formAboutText = modalProfile.querySelector(".form__input_type_about");

const formTitleText = modalAddCard.querySelector(".form__input_type_place");
const formLinkText = modalAddCard.querySelector(".form__input_type_link");

const cardSelector = "#card";
const cardsDisplayed = document.querySelector(".cards");

const cardSection = new Section(createCard, cardsDisplayed);

const userObject = new UserInfo(
  configUser.currentName,
  configUser.currentAbout
);

const imagePopup = new PopupWithImage(modalImage);

const editForm = new PopupWithForm(modalProfile, handleProfileSubmit);
const addForm = new PopupWithForm(modalAddCard, handleAddCardSubmit);

const editFormValidator = new FormValidator(configValidate, formProfileElement);
const addFormValidator = new FormValidator(configValidate, formAddCardElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

function fillProfileForm() {
  const userInfo = userObject.getUserInfo();
  formNameText.value = userInfo.name;
  formAboutText.value = userInfo.about;
}

function displayEdit() {
  fillProfileForm();
  editForm.open();
  editFormValidator.resetValidation();
}

function displayAdd() {
  addForm.open();
  addFormValidator.resetValidation();
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  const inputData = editForm.getInputValues();
  userObject.setUserInfo(inputData[0], inputData[1]);
  editForm.close();
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputData = addForm.getInputValues();
  const createdCard = {
    name: inputData[0],
    link: inputData[1],
  };
  cardSection.renderItems(createdCard);
  addForm.close();
  console.log("handled");
}

function handleDisplayImage(link, name) {
  imagePopup.open(link, name);
}

function createCard(card) {
  const newCard = new Card(card, cardSelector, handleDisplayImage);
  return newCard.getCardElement();
}

function loadCards(cards) {
  cards.forEach((card) => {
    cardSection.renderItems(card);
  });
}

function setPageListeners() {
  editButton.addEventListener("click", displayEdit);
  addButton.addEventListener("click", displayAdd);
}

loadCards(initialCards);
setPageListeners();
