const authToken = "cd0a9a45-f29d-487c-ac51-4b9d290460ac";
const baseURL = "https://around.nomoreparties.co/v1/group-12";

const davidImage = new URL("../images/david.jpg", import.meta.url);

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

/*const initialCards = [
  {
    name: "Boulder, CO",
    link: boulderImage,
    likes: [],
  },
  {
    name: "Doheny Beach, CA",
    link: dohenyImage,
    likes: [],
  },
  {
    name: "Eureka Springs, AK",
    link: eurekaImage,
    likes: [],
  },
  {
    name: "Fort Lauderdale, FL",
    link: lauderdaleImage,
    likes: [],
  },
  {
    name: "Melvern Lake, KS",
    link: melvernImage,
    likes: [],
  },
  {
    name: "Royal Gorge, CO",
    link: royalImage,
    likes: [],
  },
];*/

export {
  cardsDisplayed,
  configValidate,
  configClose,
  configUser,
  authToken,
  baseURL,
};
