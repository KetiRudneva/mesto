export default class Section {
  constructor({ items: [], renderer }, containerSelector) {
    this._initialArray = items;
    this.renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  renderer() {
    this._initialArray.forEach((item) => this.renderer(item));
  }

  addItem(item) {
    this._container.append(item);
  }
}
