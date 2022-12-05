let initialCards = [
  {
    name: "Yosimite Valley",
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

const modalOverlay = document.querySelector(".modal");
const formElement = document.querySelector(".form");
const profileElement = document.querySelector(".profile");

const closeButton = modalOverlay.querySelector(".modal__close-button");
const submitButton = formElement.querySelector(".form__submit-button");
const editButton = profileElement.querySelector(".profile__edit-button");

const formNameText = formElement.querySelector(".form__input_type_name");
const formAboutText = formElement.querySelector(".form__input_type_about");
const currentNameText = profileElement.querySelector(".profile__title");
const currentAboutText = profileElement.querySelector(".profile__description");

function displayModal() {
  formNameText.value = currentNameText.textContent;
  formAboutText.value = currentAboutText.textContent;

  modalOverlay.classList.add("modal_open");
}

function hideModal() {
  modalOverlay.classList.remove("modal_open");
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  currentNameText.textContent = formNameText.value;
  currentAboutText.textContent = formAboutText.value;

  hideModal();
}

function getCardElement(cardName, cardLink) {
  let cardTemplate = document.querySelector("#card").content;
  let cardsDisplayed = document.querySelector(".cards");

  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__title").textContent = cardName;
  cardElement.querySelector(".card__image").src = cardLink;

  cardsDisplayed.append(cardElement);
}

for (card of initialCards) {
  cardName = card.name;
  cardLink = card.link;
  getCardElement(cardName, cardLink);
}

editButton.addEventListener("click", displayModal);
closeButton.addEventListener("click", hideModal);
submitButton.addEventListener("click", handleFormSubmit);
