
export  class Section {
    constructor({ items, renderer }, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._items = items;
        this._renderer = renderer;
    }

    // создание карточки
    renderItems() {
        this._items.forEach((item) => this._renderer(item));

    }

    // добавление в DOM
    addItem(item) {
        this._container.prepend(item);
    }
}

