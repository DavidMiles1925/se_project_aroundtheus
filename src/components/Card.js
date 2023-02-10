class Card {
  constructor(data, cardSelector, handleImageClick, deleteServerCard, userId) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;

    this.isLiked = false;

    this._cardSelector = cardSelector;

    this._handleImageClick = handleImageClick;
    this._deleteServerCard = deleteServerCard;
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
    this._cardLikes = this._element.querySelector(".card__likes");

    this._cardText.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;
    this._cardLikes.textContent = this._likes.length;

    this._heartButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._imageButton = this._element.querySelector(".card__image");

    this._assignCardButtons();

    console.log(this._ownerId, "   ", this._userId);

    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }

    return this._element;
  }

  _assignCardButtons() {
    this._heartButton.addEventListener("click", () => this.handleLikeButton());
    this._deleteButton.addEventListener("click", () =>
      this._deleteServerCard(this)
    );
    this._imageButton.addEventListener("click", () =>
      this._handleImageClick(this._name, this._link)
    );
  }

  handleLikeButton = () => {
    this.isLiked = !this.isLiked;
    this._heartButton.classList.toggle("card_liked");
  };

  handleDeleteLocalCard() {
    console.log(this._element);
    this._element.remove();
    this._element = null;
  }
}

export default Card;
