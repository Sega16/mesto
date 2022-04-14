
export class Section {
    constructor({ renderer }, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    // создание карточки
    renderItems(items) {
       items.forEach(item => this._renderer(item));
    }

    // добавление в DOM
    addItem(item) {
        this._container.prepend(item);
    }
}