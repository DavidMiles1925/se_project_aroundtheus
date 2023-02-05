class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(`${popupSelector}`);
  }

  open() {}

  close() {}

  _handleEscUp(evt) {}

  _setEventListeners() {}
}

export default Popup;
