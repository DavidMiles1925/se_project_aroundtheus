import { removePreload } from "../utils/utils.js";

class Popup {
  constructor(popupSelector) {
    this._popupElement = popupSelector;

    this._closeButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
  }

  open() {
    removePreload();
    this._popupElement.classList.add("modal_open");
    this._setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("modal_open");
    this._removeEventListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleRemoteClickClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  _setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose.bind(this));
    this._popupElement.addEventListener(
      "mousedown",
      this._handleRemoteClickClose.bind(this)
    );
    this._closeButton.addEventListener("click", this.close.bind(this));
  }

  _removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.removeEventListener(
      "mousedown",
      this._handleRemoteClickClose.bind(this)
    );
  }
}

export default Popup;
