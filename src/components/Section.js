export default class Section {
    constructor({ data, renderer }, containerSelector) {
      this._initialArray = data;
      this._renderer = renderer;
      this._container = containerSelector;
    }

    setItem(element) {
      this._container.prepend(element);
    }

    clear() {
        this._container.innerHTML = '';
    }

    renderItems() {
      this._initialArray.forEach(item => {
        this._renderer(item); // вызываем renderer, передав item
      });
    }
}