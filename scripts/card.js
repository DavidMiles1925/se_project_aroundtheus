export class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
  }

  _getCardElement() {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardText = cardElement.querySelector(".card__title");

    cardText.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._alt;

    this._assignCardButtons(cardElement);

    return cardElement;
  }

  _assignCardButtons(element) {
    const heartButton = element.querySelector(".card__like-button");
    heartButton.addEventListener("click", function () {
      this.classList.toggle("card_liked");
    });

    const deleteButton = element.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", function () {
      this.closest(".card").remove();
    });

    const imageButton = element.querySelector(".card__image");
    imageButton.addEventListener("click", displayImage);
  }

  _prependCard() {
    const newCard = this._getCardElement();
    cardsDisplayed.prepend(newCard);
  }

  _appendCard() {
    const newCard = this._getCardElement();
    cardsDisplayed.append(newCard);
  }
}
