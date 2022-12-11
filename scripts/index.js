let initialCards = [
  {
    name: "Yosemite Valley",
    link: "./images/yosemite.jpg",
    alt: "yosemite",
  },
  {
    name: "Lake Louise",
    link: "./images/lake-louise.jpg",
    alt: "lake louise",
  },
  {
    name: "Bald Mountains",
    link: "./images/bald-mountains.jpg",
    alt: "bald mountains",
  },
  {
    name: "Latemar",
    link: "./images/latemar.jpg",
    alt: "latemar",
  },
  {
    name: "Vanoise National Park",
    link: "./images/vanoise.jpg",
    alt: "vanoise",
  },
  {
    name: "Lago di Braies",
    link: "./images/lago.jpg",
    alt: "lago",
  },
];

const modalOverlay = document.querySelector(".modal");
const formEditElement = document.querySelector(".form_type_edit-profile");
const formAddElement = document.querySelector(".form_type_add-card");
const profileElement = document.querySelector(".profile");

const closeButton = modalOverlay.querySelector(".modal__close-button");
const submitButton = formEditElement.querySelector(".form__submit-button");
const createButton = formAddElement.querySelector(".form__submit-button");
const editButton = profileElement.querySelector(".profile__edit-button");
const addButton = profileElement.querySelector(".profile__add-button");

const formNameText = formEditElement.querySelector(".form__input_type_name");
const formAboutText = formEditElement.querySelector(".form__input_type_about");
const currentNameText = profileElement.querySelector(".profile__title");
const currentAboutText = profileElement.querySelector(".profile__description");
const formPlaceText = formAddElement.querySelector(".form__input_type_place");
const formImageLinkText = formAddElement.querySelector(
  ".form__input_type_image-link"
);

const cardTemplate = document.querySelector("#card").content;
const cardsDisplayed = document.querySelector(".cards");

function displayEdit() {
  formNameText.value = currentNameText.textContent;
  formAboutText.value = currentAboutText.textContent;
  formEditElement.classList.remove("form_closed");
  displayModal();
}

function displayAdd() {
  formAddElement.classList.remove("form_closed");
  formPlaceText.textContent = "";
  formImageLinkText.textContent = "";
  displayModal();
}

function displayModal() {
  modalOverlay.classList.add("modal_open");
}

function hideModal() {
  modalOverlay.classList.remove("modal_open");
  formEditElement.classList.add("form_closed");
  formAddElement.classList.add("form_closed");
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  currentNameText.textContent = formNameText.value;
  currentAboutText.textContent = formAboutText.value;

  hideModal();
}

function handleFormCreate(evt) {
  evt.preventDefault();

  let createdCard = {
    name: formPlaceText.value,
    link: formImageLinkText.value,
    alt: formPlaceText.value,
  };

  appendCards(createdCard);
  hideModal();
}

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__title").textContent = data["name"];
  cardElement.querySelector(".card__image").src = data["link"];
  cardElement.querySelector(".card__image").alt = data["alt"];

  return cardElement;
}

function loadCards() {
  initialCards.forEach((card) => {
    appendCards(card);
  });
}

function appendCards(card) {
  let newCard = getCardElement(card);
  cardsDisplayed.append(newCard);
}

loadCards();

editButton.addEventListener("click", displayEdit);
addButton.addEventListener("click", displayAdd);
closeButton.addEventListener("click", hideModal);
submitButton.addEventListener("click", handleFormSubmit);
createButton.addEventListener("click", handleFormCreate);
