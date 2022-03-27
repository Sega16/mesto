
class Popup {
    constructor(selectorPopup) {
        this._selectorPopup = selectorPopup;
        this._popup = document.querySelector(selectorPopup);
        this.closeBtn = this._popup.querySelector('.popup__close');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    // открытие попапа
    openPopup() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    // закрытие попапа
    closePopup() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    // закрытие по Esc
    _handleEscClose(evt) {
        if(evt.key === 'Escape') {
            this.closePopup();
        }
    }

    // закрытие кликом по оверлэй и кнопке крестику
    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if(evt.target.classList.contains('.popup_opened') ||
            evt.target.classList.contains('.popup__close')) {
                this._closePopup();
            }
        });
    }
}

export {Popup};