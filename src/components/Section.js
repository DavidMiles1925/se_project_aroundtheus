class Section {
  constructor(renderer, classSelector) {
    this._renderer = renderer;
    this._cardsDisplayed = classSelector;
  }

  renderItems(item) {
    console.log("rendered");
    this.addItem(this._renderer(item));
  }

  addItem(item) {
    console.log("adding item");
    this._cardsDisplayed.prepend(item);
  }
}

export default Section;
