
class Section {
    constructor({ items, renderer }, selectorContainer) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(selectorContainer);
    }

    // создание карточки
    renderItems() {
        this._items.forEach(item => {
            this._renderer(item);
        });
    }

    // добавление в DOM
    addItem(element) {
        this._container.prepend(element);
    }
}

export { Section };