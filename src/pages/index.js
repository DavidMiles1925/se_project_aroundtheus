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

const editProfileButton = profileElement.querySelector(".profile__edit-button");
const addCardButton = profileElement.querySelector(".profile__add-button");
const changeAvatarButton = profileElement.querySelector(
  ".profile__image-button"
);

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

const editProfileForm = new PopupWithForm(modalProfile, handleProfileSubmit);
const addProfileForm = new PopupWithForm(modalAddCard, handleAddCardSubmit);
const changeAvatarForm = new PopupWithForm(modalPicture, handlePictureSubmit);

const confirmForm = new PopupWithConfirm(modalConfirm);
confirmForm.setEventListeners();

const editProfileFormValidator = new FormValidator(
  configValidate,
  formProfileElement
);
const addProfileFormValidator = new FormValidator(
  configValidate,
  formAddCardElement
);
const changeAvatarFormValidator = new FormValidator(
  configValidate,
  formPictureElement
);

editProfileFormValidator.enableValidation();
addProfileFormValidator.enableValidation();
changeAvatarFormValidator.enableValidation();

function fillProfileForm() {
  const userInfo = userObject.getUserInfo();
  formNameText.value = userInfo.name;
  formAboutText.value = userInfo.about;
}

function displayEdit() {
  fillProfileForm();
  editProfileForm.open();
  editProfileFormValidator.resetValidation();
}

function displayAdd() {
  addProfileForm.open();
  addProfileFormValidator.resetValidation();
}

function handleDisplayImage(name, link) {
  imagePopup.open(name, link);
}

function displayChangeAvatar() {
  changeAvatarForm.open();
}

function handleProfileSubmit(data) {
  editProfileForm.toggleIsSaving(true);
  api
    .setUserInfo(data)
    .then(() => {
      userObject.setUserInfo(data.name, data.about);
      editProfileForm.close();
    })
    .catch((err) => {
      console.log(`Error: ${err.status}`);
    })
    .finally(() => {
      editProfileForm.toggleIsSaving(false);
    });
}

function handleAddCardSubmit(data) {
  addProfileForm.toggleIsSaving(true);
  api
    .addCard(data)
    .then((cardData) => {
      cardSection.addItem(cardData);
      addProfileForm.close();
    })
    .catch((err) => {
      console.log(`Error: ${err.status}`);
    })
    .finally(() => {
      addProfileForm.toggleIsSaving(false);
    });
}

function handlePictureSubmit(data) {
  changeAvatarForm.toggleIsSaving(true);
  api
    .setAvatar(data.avatar)
    .then(() => {
      userObject.setProfilePicture(data.avatar);
      changeAvatarForm.close();
    })
    .catch((err) => {
      console.log(`Error: ${err.status}`);
    })
    .finally(() => {
      changeAvatarForm.toggleIsSaving(false);
    });
}

function handleDeleteCard(card) {
  confirmForm.open();
  confirmForm.setSubmit(() => {
    confirmForm.toggleIsSaving(true);
    api
      .deleteCard(card._id)
      .then(() => {
        card.handleDeleteLocalCard();
        confirmForm.close();
      })
      .catch((err) => {
        console.log(`Error: ${err.status}`);
      })
      .finally(() => {
        confirmForm.toggleIsSaving(false);
      });
  });
}

function handleCardLike(card) {
  if (card.isLiked()) {
    api
      .removeLike(card._id)
      .then((res) => card.updateLikes(res.likes))
      .catch((err) => {
        console.log(`Error: ${err.status}`);
      });
  } else {
    api
      .addLike(card._id)
      .then((res) => card.updateLikes(res.likes))
      .catch((err) => {
        console.log(`Error: ${err.status}`);
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
  editProfileButton.addEventListener("click", displayEdit);
  addCardButton.addEventListener("click", displayAdd);
  changeAvatarButton.addEventListener("click", displayChangeAvatar);
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
