class Section {
  constructor(renderer, classSelector) {
    this._renderer = renderer;
    this._cardsDisplayed = document.querySelector(classSelector);
  }

  renderItems(data) {
    data.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(item) {
    const card = this._renderer(item);
    this._cardsDisplayed.prepend(card);
  }
}

export default Section;
