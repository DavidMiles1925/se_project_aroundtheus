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

const closeProfileButton = modalProfile.querySelector(".modal__close-button");
const closeAddCardButton = modalAddCard.querySelector(".modal__close-button");
const closeImageButton = modalDisplayImage.querySelector(
  ".modal__close-button"
);
const submitProfileButton = formProfileElement.querySelector(
  ".form__submit-button"
);
const submitAddCardButton = formAddCardElement.querySelector(
  ".form__submit-button"
);
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

function displayModal(modal) {
  modal.classList.add("modal_open");
}

function hideModal(modal) {
  modal.classList.remove("modal_open");
}

function fillProfileForm() {
  formNameText.value = currentNameText.textContent;
  formAboutText.value = currentAboutText.textContent;
}

function displayEdit() {
  removePreload();
  fillProfileForm();
  displayModal(modalProfile);
}

function displayAdd() {
  removePreload();
  formAddCardElement.reset();
  displayModal(modalAddCard);
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

loadCards(initialCards);

editButton.addEventListener("click", displayEdit);
addButton.addEventListener("click", displayAdd);
closeProfileButton.addEventListener("click", function () {
  hideModal(modalProfile);
});
closeAddCardButton.addEventListener("click", function () {
  hideModal(modalAddCard);
});
closeImageButton.addEventListener("click", function () {
  hideModal(modalDisplayImage);
});
formProfileElement.addEventListener("submit", handleProfileSubmit);
formAddCardElement.addEventListener("submit", handleAddCardSubmit);
