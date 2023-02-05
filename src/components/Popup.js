import { removePreload } from "../utils/utils.js";

class Popup {
  constructor(popupSelector) {
    this._popupElement = popupSelector;

    this._closeButton = this._popupElement.querySelector(
      ".modal__close-button"
    );

    this._handleEscCloseBound = this._handleEscClose.bind(this);
    this._handleRemoteClickCloseBound = this._handleRemoteClickClose.bind(this);
    this._closePopupBound = this.close.bind(this);
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
    document.addEventListener("keydown", this._handleEscCloseBound);
    this._popupElement.addEventListener(
      "mousedown",
      this._handleRemoteClickCloseBound
    );
    this._closeButton.addEventListener("click", this._closePopupBound);
  }

  _removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscCloseBound);
    this._popupElement.removeEventListener(
      "mousedown",
      this._handleRemoteClickCloseBound
    );
    this._closeButton.removeEventListener("click", this._closePopupBound);
  }
}

export default Popup;
