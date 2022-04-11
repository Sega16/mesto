import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector('.popup__btn');
        this._initButtonText = this._submitButton.textContent;
        this.inputs = [...this._popupForm.querySelectorAll('.popup__input')];
    }

    // собираем данные полей формы
    _getInputValues() {
        const values = {};
        this.inputs.forEach((input) => {
            values[input.name] = input.value;
        });
        return values;
    }

    changeSubmitHandler(newSubmitHandler) {
        this._handleSubmit = newSubmitHandler
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._getInputValues());
        });
    }

    closePopup() {

        super.closePopup();
        this._popupForm.reset();
    }
    renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Сохранение...';
        } else {
            this._submitButton.textContent = this._initButtonText;
        }
    }
}