import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelctor, handleSubmit) {
    super(popupSelctor);
    this._handleSubmit = handleSubmit;
    this._formSelector = this._popupElement.querySelector(".form");
  }

  getInputValues() {
    const formFieldInputs = [
      ...this._formSelector.querySelectorAll(".form__input"),
    ];
    const inputValues = [];
    formFieldInputs.forEach((input) => inputValues.push(input.value));

    return inputValues;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._formSelector.addEventListener("submit", this._handleSubmit);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._formSelector.removeEventListener("submit", this._handleSubmit);
    console.log("removed");
  }

  open() {
    super.open();
  }

  close() {
    super.close();
    this._popupElement.querySelector(".form").reset();
  }
}

export default PopupWithForm;
