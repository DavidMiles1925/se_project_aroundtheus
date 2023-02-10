import Popup from "./Popup.js";

class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formSelector = this._popupElement.querySelector(".form");
  }

  _myListener(evt) {
    evt.preventDefault();
    this._handleSubmit;
    console.log("hello");
    this._removeEventListeners;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }

  /* _removeEventListeners() {
    this._formSelector.removeEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }*/

  setSubmit(input) {
    this._handleSubmit = input;
  }
}

export default PopupWithConfirm;
