import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".modal__image");
    this._modalImageDescription = this._popupElement.querySelector(
      ".modal__image-desctription"
    );
  }

  open(image, name) {
    super.open();
    this._image.src = image;
    this._image.alt = name;
    this._modalImageDescription.textContent = name;
  }
}

export default PopupWithImage;
