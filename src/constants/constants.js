const configValidate = {
  formSelector: ".form",
  formFieldsetSelector: ".form__fieldset",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

const configClose = {
  closeButtonSelector: ".modal__close-button",
  modalOverlaySelector: ".modal",
  modalContainerList: ".modal__container",
};

const initialCards = [
  {
    name: "Boulder, CO",
    link: "./images/Boulder.jpg",
  },
  {
    name: "Doheny Beach, CA",
    link: "./images/Doheny.jpg",
  },
  {
    name: "Eureka Springs, AK",
    link: "./images/Eureka.jpg",
  },
  {
    name: "Fort Lauderdale, FL",
    link: "./images/Lauderdale.jpg",
  },
  {
    name: "Melvern Lake, KS",
    link: "./images/Melvern.jpg",
  },
  {
    name: "Royal Gorge, CO",
    link: "./images/Royal.jpg",
  },
];

export { configValidate, configClose, initialCards };
