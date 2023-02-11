import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import {
  cardsDisplayed,
  configValidate,
  configUser,
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
const modalPicture = document.querySelector(".modal_profile-picture");
const modalImage = document.querySelector(".modal_display-image");
const modalConfirm = document.querySelector(".modal_confirm");

const formProfileElement = modalProfile.querySelector(".form");
const formAddCardElement = modalAddCard.querySelector(".form");
const formPictureElement = modalPicture.querySelector(".form");

const profileElement = document.querySelector(".profile");

const editButton = profileElement.querySelector(".profile__edit-button");
const addButton = profileElement.querySelector(".profile__add-button");
const pictureButton = profileElement.querySelector(".profile__image-button");
const profilePicture = profileElement.querySelector(".profile__image");

const formNameText = modalProfile.querySelector(".form__input_type_name");
const formAboutText = modalProfile.querySelector(".form__input_type_about");

const cardSelector = "#card";

let userId;

const api = new Api(baseURL, authToken);

const cardSection = new Section(createCard, cardsDisplayed);

const userObject = new UserInfo(
  configUser.currentName,
  configUser.currentAbout,
  configUser.profilePicture
);

const imagePopup = new PopupWithImage(modalImage, handlePictureSubmit);

const editForm = new PopupWithForm(modalProfile, handleProfileSubmit);
const addForm = new PopupWithForm(modalAddCard, handleAddCardSubmit);
const pictureForm = new PopupWithForm(modalPicture, handlePictureSubmit);

const confirmForm = new PopupWithConfirm(modalConfirm);
confirmForm.setEventListeners();

const editFormValidator = new FormValidator(configValidate, formProfileElement);
const addFormValidator = new FormValidator(configValidate, formAddCardElement);
const pictureFormValidator = new FormValidator(
  configValidate,
  formPictureElement
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
pictureFormValidator.enableValidation();

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

function displayChangeAvatar() {
  pictureForm.open();
}

function handleProfileSubmit(data) {
  editForm.toggleIsSaving(true);
  Promise.resolve(api.setUserInfo(data))
    .then(() => {
      userObject.setUserInfo(data.name, data.about);
    })
    .catch((err) => {
      return Promise.reject(`Error: ${err.status}`);
    })
    .finally(() => {
      editForm.toggleIsSaving(false);
      editForm.close();
    });
}

function handleAddCardSubmit(data) {
  addForm.toggleIsSaving(true);
  api
    .addCard(data)
    .then((cardData) => {
      cardSection.addItem(cardData);
    })
    .catch((err) => {
      return Promise.reject(`Error: ${err.status}`);
    })
    .finally(() => {
      addForm.toggleIsSaving(false);
      addForm.close();
    });
}

function handlePictureSubmit(data) {
  pictureForm.toggleIsSaving(true);
  Promise.resolve(api.setAvatar(data.avatar))
    .then(() => {
      userObject.setProfilePicture(data.avatar);
    })
    .catch((rerr) => {
      return Promise.reject(`Error: ${err.status}`);
    })
    .finally(() => {
      pictureForm.toggleIsSaving(false);
      pictureForm.close();
    });
}

function handleDisplayImage(name, link) {
  imagePopup.open(name, link);
}

function handleDeleteCard(card) {
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
  if (card.isLiked()) {
    Promise.resolve(api.removeLike(card._id))
      .then((res) => card.updateLikes(res.likes))
      .catch((err) => {
        return Promise.reject(`Error: ${err.status}`);
      });
  } else {
    Promise.resolve(api.addLike(card._id))
      .then((res) => card.updateLikes(res.likes))
      .catch((err) => {
        return Promise.reject(`Error: ${err.status}`);
      });
  }
}

function createCard(card) {
  const newCard = new Card(
    card,
    cardSelector,
    handleCardLike,
    handleDisplayImage,
    handleDeleteCard,
    userId
  );
  return newCard.getCardElement();
}

function setPageListeners() {
  editButton.addEventListener("click", displayEdit);
  addButton.addEventListener("click", displayAdd);
  pictureButton.addEventListener("click", displayChangeAvatar);
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialData]) => {
    userId = userData._id;
    userObject.setProfilePicture(userData.avatar);
    userObject.setUserInfo(userData.name, userData.about);
    cardSection.renderItems(initialData);
  })
  .catch((err) => {
    console.log(err);
  });

setPageListeners();
