import { Popup } from "./popup.js";

 export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        
    }

    // собираем данные полей формы
    _getInputValues() {
        const inputs = [...this._popupForm.querySelectorAll('.popup__input')];
        const values = {};
        inputs.forEach((input) => {
            values[input.name] = input.value;
        });
        return values;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventlistener("submit", (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._getInputValues());
            this._closePopup();
        });
    }

    closePopup() {
        
        super.closePopup();
        this._popupForm.reset();
    }
}