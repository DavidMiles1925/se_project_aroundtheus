import Popup from "./Popup.js";

class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formSelector = this._popupElement.querySelector(".form");
  }

  setEventListeners() {
    super._setEventListeners();
    this._formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }

  setSubmit(input) {
    this._handleSubmit = input;
  }
}

export default PopupWithConfirm;
