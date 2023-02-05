class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;

    this._cardSelector = cardSelector;

    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getCardElement() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardText = this._element.querySelector(".card__title");

    this._cardText.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;

    this._heartButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._imageButton = this._element.querySelector(".card__image");

    this._assignCardButtons();

    return this._element;
  }

  _assignCardButtons() {
    this._heartButton.addEventListener("click", () => this._handleLikeButton());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteButton()
    );
    this._imageButton.addEventListener("click", () =>
      this._handleImageClick(this._link, this._name)
    );
  }

  _handleLikeButton = () => {
    this._heartButton.classList.toggle("card_liked");
  };

  _handleDeleteButton = () => {
    this._element.remove();
    this._element = null;
  };
}

export default Card;
