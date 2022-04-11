

export class FormValidator {
  constructor(config, formItem) {
    this._formItem = formItem;
    this._config = config;
    this._popupInputs = Array.from(
      this._formItem.querySelectorAll(this._config.inputSelector)
    );
    this._btn = this._formItem.querySelector(
      this._config.submitButtonSelector
    );
  }

// // добавляем класс с ошибкой
_showInputError(inputItem, errorMassage) {
  this._formError = this._formItem.querySelector(`.${inputItem.id}-error`);
  inputItem.classList.add(this._config.inputErrorClass);
  this._formError.textContent = errorMassage;
}

// удаляем класс с ошибкой
_hideInputError(inputItem) {
  this._formError = this._formItem.querySelector(`.${inputItem.id}-error`);
  inputItem.classList.remove(this._config.inputErrorClass);
  this._formError.textContent = "";
}

// // проверка валидности поля и вызов ошибки
_checkInputValidity(inputItem) {
  if (!inputItem.checkValidity()) {
    this._showInputError(inputItem, inputItem.validationMessage);
  } else {
    this._hideInputError(inputItem);
  }
}

disableSubmitButton() {
  this._btn.classList.add(this._config.inactiveButtonClass);
  this._btn.disabled = true;
}

// управление состоянием кнопки
_checkСonditionBtn() {
  if (!this._formItem.checkValidity()) {
    this.disableSubmitButton();
  } else {
    this._btn.classList.remove(this._config.inactiveButtonClass);
    this._btn.removeAttribute('disabled');
  }
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

  // валидация
  enableValidation() {
    this._setEventListeners();
  }
  
  resetValidation() {
    this._popupInputs.forEach((inputItem) => {
      this._hideInputError(inputItem);
    });
    this._checkСonditionBtn();
  }
}
