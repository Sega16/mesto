import { Popup } from './popup.js'


class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
        this._popupImg = this._popup.querySelector('.img-view');
        this._popupCaption = this._popup.querySelector('.img-caption');
    }

    // открытие большой картинки
    openPopup(name, link) {
        this._popupImg.src = link;
        this._popupImg.alt = name;
        this._popupCaption.textContent = name;
        super.openPopup();
    }
}

export {PopupWithImage};