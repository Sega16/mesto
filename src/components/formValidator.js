

class FormValidator {
  constructor(config, formItem) {
    this._config = config;
    this._formItem = formItem;
    this._popupInputs = Array.from(this._formItem.querySelectorAll(config.inputSelector));
    this._btn = this._formItem.querySelector(config.submitButtonSelector);

  }

  // валидация
  enableValidation() {
    this._setEventListeners();
  }

  // валидация всех инпутов
  _setEventListeners() {
    this._checkСonditionBtn();
    this._popupInputs.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._checkInputValidity(inputItem);
        this._checkСonditionBtn();
      })
    })
  }

  // проверка валидности поля и вызов ошибки
  _checkInputValidity(inputItem) {
    if (!inputItem.checkValidity()) {
      this._showInputError(inputItem, inputItem.validationMessage);
    } else {
      this._hideInputError(inputItem);
    }
  }

  // управление состоянием кнопки
  _checkСonditionBtn() {
    if (!this._formItem.checkValidity()) {
      this._btn.classList.add(config.inactiveButtonClass);
      this._btn.setAttribute('disabled', '');
    } else {
      this._btn.classList.remove(config.inactiveButtonClass);
      this._btn.removeAttribute('disabled');
    }
  }

  // добавляем класс с ошибкой
  _showInputError(inputItem, errorMassage) {
    this._formError = this._formItem.querySelector(`.${inputItem.id}-error`);
    inputItem.classList.add(config.inputErrorClass);
    this._formError.textContent = errorMassage;
  }

  // удаляем класс с ошибкой
  _hideInputError(inputItem) {
    this._formError = this._formItem.querySelector(`.${inputItem.id}-error`);
    inputItem.classList.remove(config.inputErrorClass);
    this._formError.textContent = "";
  }
  resetError() {
    this._popupInputs.forEach((inputItem) => {
      this._hideInputError(inputItem);
    });
    this._checkСonditionBtn();
  }

  disableSubmitButton() {
    this._btn.classList.add(this._config.inactiveButtonClass);
    this._btn.disabled = true;
  }
}

export { FormValidator };