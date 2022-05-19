export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  renderer() {
    console.log(this._initialArray);
    this._initialArray.forEach((item) => {
      const element = this._renderer(item);
      this.addItem(element);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
