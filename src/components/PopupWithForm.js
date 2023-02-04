import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor(popupSelctor, handleSubmit) {
    super(popupSelctor);
    this._handleSubmit = handleSubmit;
  }

  _getInputValues() {}

  setEventListeners() {
    super.setEventListeners();
  }

  close() {
    super.close();
  }
}

export default PopupWithForm;
