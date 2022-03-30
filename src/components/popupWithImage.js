import { Popup } from './popup.js'

export class PopupWithImage extends Popup {

    // открытие большой картинки
    openPopup(name, link) {
        const popupImg = this._popup.querySelector('.img-view');
        const popupCaption = this._popup.querySelector('.img-caption');
        popupImg.src = link;
        popupImg.alt = name;
        popupCaption.textContent = name;
        super.openPopup();
    }
}