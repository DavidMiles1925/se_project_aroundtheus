const davidImage = new URL("../images/david.jpg", import.meta.url);

const boulderImage = new URL("../images/Boulder.jpg", import.meta.url);
const dohenyImage = new URL("../images/Doheny.jpg", import.meta.url);
const eurekaImage = new URL("../images/Eureka.jpg", import.meta.url);
const lauderdaleImage = new URL("../images/Lauderdale.jpg", import.meta.url);
const melvernImage = new URL("../images/Melvern.jpg", import.meta.url);
const royalImage = new URL("../images/Royal.jpg", import.meta.url);

const cardsDisplayed = ".cards";

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

const configUser = {
  userModal: ".modal_profile",
  currentName: ".profile__title",
  currentAbout: ".profile__description",
  newName: ".form__input_type_name",
  newAbout: ".form__input_type_about",
};

const initialCards = [
  {
    place: "Boulder, CO",
    link: boulderImage,
  },
  {
    place: "Doheny Beach, CA",
    link: dohenyImage,
  },
  {
    place: "Eureka Springs, AK",
    link: eurekaImage,
  },
  {
    place: "Fort Lauderdale, FL",
    link: lauderdaleImage,
  },
  {
    place: "Melvern Lake, KS",
    link: melvernImage,
  },
  {
    place: "Royal Gorge, CO",
    link: royalImage,
  },
];

export {
  cardsDisplayed,
  configValidate,
  configClose,
  configUser,
  initialCards,
};
