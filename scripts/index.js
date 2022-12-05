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
const formElement = document.querySelector(".form");
const profileElement = document.querySelector(".profile");

const closeButton = modalOverlay.querySelector(".modal__close-button");
const submitButton = formElement.querySelector(".form__submit-button");
const editButton = profileElement.querySelector(".profile__edit-button");

const formNameText = formElement.querySelector(".form__input_type_name");
const formAboutText = formElement.querySelector(".form__input_type_about");
const currentNameText = profileElement.querySelector(".profile__title");
const currentAboutText = profileElement.querySelector(".profile__description");

const cardTemplate = document.querySelector("#card").content;
const cardsDisplayed = document.querySelector(".cards");

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

function getCardElement(data) {
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__title").textContent = data["name"];
  cardElement.querySelector(".card__image").src = data["link"];
  cardElement.querySelector(".card__image").alt = data["alt"];

  return cardElement;
}

function appendCards() {
  for (card of initialCards) {
    let data = ["name", "link", "alt"];

    data["name"] = card.name;
    data["link"] = card.link;
    data["alt"] = card.alt;

    let newCard = getCardElement(data);

    cardsDisplayed.append(newCard);
  }
}

appendCards();

editButton.addEventListener("click", displayModal);
closeButton.addEventListener("click", hideModal);
submitButton.addEventListener("click", handleFormSubmit);
