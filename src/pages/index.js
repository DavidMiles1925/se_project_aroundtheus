import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import {
  cardsDisplayed,
  configValidate,
  configUser,
  initialCards,
  authToken,
  baseURL,
} from "../constants/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Section from "../components/Section.js";
import Api from "../utils/API.js";

const modalProfile = document.querySelector(".modal_profile");
const modalAddCard = document.querySelector(".modal_add-card");
const modalImage = document.querySelector(".modal_display-image");
const modalConfirm = document.querySelector(".modal_confirm");

const formProfileElement = modalProfile.querySelector(".form");
const formAddCardElement = modalAddCard.querySelector(".form");

const profileElement = document.querySelector(".profile");

const editButton = profileElement.querySelector(".profile__edit-button");
const addButton = profileElement.querySelector(".profile__add-button");

const formNameText = modalProfile.querySelector(".form__input_type_name");
const formAboutText = modalProfile.querySelector(".form__input_type_about");

const cardSelector = "#card";

let userId;

const cardSection = new Section(createCard, cardsDisplayed);

const userObject = new UserInfo(
  configUser.currentName,
  configUser.currentAbout
);

const imagePopup = new PopupWithImage(modalImage);

const editForm = new PopupWithForm(modalProfile, handleProfileSubmit);
const addForm = new PopupWithForm(modalAddCard, handleAddCardSubmit);

const confirmForm = new PopupWithConfirm(modalConfirm);

const editFormValidator = new FormValidator(configValidate, formProfileElement);
const addFormValidator = new FormValidator(configValidate, formAddCardElement);

const api = new Api(baseURL, authToken);

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

function handleProfileSubmit(data) {
  Promise.resolve(api.setUserInfo(data))
    .then(() => {
      userObject.setUserInfo(data.name, data.about);
      editForm.close();
    })
    .catch((err) => {
      return Promise.reject(`Error: ${err.status}`);
    });
}

function handleAddCardSubmit(data) {
  addForm.close();
  Promise.resolve(api.addCard(data))
    .then((cardData) => {
      cardSection.addItem(cardData);
    })
    .catch((err) => {
      return Promise.reject(`Error: ${err.status}`);
    });
}

function handleDisplayImage(name, link) {
  imagePopup.open(name, link);
}

function handleDeleteCard(card) {
  console.log("card._id: ", card._id);
  confirmForm.open();
  confirmForm.setSubmit(() => {
    Promise.resolve(api.deleteCard(card._id))
      .then(() => {
        card.handleDeleteLocalCard();
      })
      .then(() => {
        confirmForm.close();
      })
      .catch((err) => {
        return Promise.reject(`Error: ${err.status}`);
      });
  });
}

function handleCardLike(card) {
  if (card.isLiked) {
    Promise.resolve(api.removeLike(card._id))
      .then(card.handleLikeButton())
      .catch((err) => {
        return Promise.reject(`Error: ${err.status}`);
      });
  } else {
    Promise.resolve(api.addLike(card._id))
      .then(card.handleLikeButton())
      .catch((err) => {
        return Promise.reject(`Error: ${err.status}`);
      });
  }
}

function createCard(card) {
  console.log("card from createCard: ", card);
  const newCard = new Card(
    card,
    cardSelector,
    handleDisplayImage,
    handleDeleteCard,
    userId
  );
  return newCard.getCardElement();
}

function setPageListeners() {
  editButton.addEventListener("click", displayEdit);
  addButton.addEventListener("click", displayAdd);
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialData]) => {
    userId = userData._id;
    console.log("userDataID:  ", userData._id);
    userObject.setUserInfo(userData.name, userData.about);
    cardSection.renderItems(initialData);
  })
  .catch((err) => {
    console.log(err);
  });

setPageListeners();
