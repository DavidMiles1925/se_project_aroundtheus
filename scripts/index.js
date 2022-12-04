let initialCards = [
  {
    name: "Yosimite Valley",
    link: "../images/yosimite.jpg",
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

const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".modal__close-button");
const modalOverlay = document.querySelector(".modal");

function displayModal() {
  modalOverlay.classList.add("modal_open");
}

function hideModal() {
  modalOverlay.classList.remove("modal_open");
}

editButton.addEventListener("click", displayModal);
closeButton.addEventListener("click", hideModal);
