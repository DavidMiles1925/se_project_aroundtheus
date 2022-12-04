// Card array
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

// Select page elements
const modalOverlay = document.querySelector(".modal");
const formElement = document.querySelector(".form");
const profileElement = document.querySelector(".profile");

//Select buttons
const closeButton = modalOverlay.querySelector(".modal__close-button");
const submitButton = formElement.querySelector(".form__submit-button");
const editButton = profileElement.querySelector(".profile__edit-button");

// Select form and input text elements
const formNameText = formElement.querySelector(".form__input_type_name");
const formAboutText = formElement.querySelector(".form__input_type_about");
const currentNameText = profileElement.querySelector(".profile__title");
const currentAboutText = profileElement.querySelector(".profile__description");

// Show modal window and fill in fields with current profile values
function displayModal() {
  // Update input field text
  formNameText.value = currentNameText.textContent;
  formAboutText.value = currentAboutText.textContent;
  // Show modal
  modalOverlay.classList.add("modal_open");
}

// Hide modal window
function hideModal() {
  modalOverlay.classList.remove("modal_open");
}

// Handle click of save button
function handleFormSubmit(evt) {
  //Prevent default browser behavior
  evt.preventDefault();
  // Update profile text
  currentNameText.textContent = formNameText.value;
  currentAboutText.textContent = formAboutText.value;
  // Hide modal
  hideModal();
}

//Event listeners
editButton.addEventListener("click", displayModal);
closeButton.addEventListener("click", hideModal);
submitButton.addEventListener("click", handleFormSubmit);
