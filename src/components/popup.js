
export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closeBtn = this._popup.querySelector('.popup__close')
        this._submitButton = this._popup.querySelector('.popup__btn');
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
        if (evt.key === 'Escape') {
            this.closePopup();
        }
    }

    // закрытие кликом по оверлэй и кнопке крестику
    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened') ||
                evt.target.classList.contains('popup__close')) {
                this.closePopup();
            }
        });
        this._closeBtn.addEventListener('click', () => this.closePopup());
    }
}

