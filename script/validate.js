const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_inactive',
  inputErrorClass: 'popup__input_type_error',
}

// добавление бработчиков всем формам
function enableValidation({ formSelector, ...restConfig }) {
  const popupForms = Array.from(document.querySelectorAll(formSelector));
  popupForms.forEach((formItem) => {
    setEventListeners(restConfig, formItem);
  });
}

// добавление обработчиков всем инпутам
function setEventListeners({ inputSelector, submitButtonSelector, ...restConfig }, formItem) {
  const popupInputs = Array.from(formItem.querySelectorAll(inputSelector));
  const btn = formItem.querySelector(submitButtonSelector);
  checkСonditionBtn(restConfig, btn, formItem);


  popupInputs.forEach((inputItem) => {
    inputItem.addEventListener('input', function () {
      isValid(restConfig, inputItem);
      checkСonditionBtn(restConfig, btn, formItem);
    });
  });
}

// проверка валидности поля и вызов ошибки
function isValid({...restConfig}, inputItem) {
  if (!inputItem.validity.valid) {
    showInputError(restConfig, inputItem, inputItem.validationMessage);
  } else {
    hideInputError(restConfig, inputItem);
  }
}

function checkСonditionBtn({inactiveButtonClass}, btn, formItem) {
  if (!formItem.checkValidity()) {
    btn.classList.add(inactiveButtonClass);
    btn.setAttribute('disabled', '');
  } else {
    btn.classList.remove(inactiveButtonClass);
    btn.removeAttribute('disabled');
  }
}

// добавляем класс с ошибкой
function showInputError({inputErrorClass}, inputItem, errorMassage) {
  const formError = document.querySelector(`.${inputItem.id}-error`);
  inputItem.classList.add(inputErrorClass);
  formError.textContent = errorMassage;
}

// удаляем класс с ошибкой
function hideInputError({inputErrorClass}, inputItem) {
  const formError = document.querySelector(`.${inputItem.id}-error`);
  inputItem.classList.remove(inputErrorClass);
  formError.textContent = "";
}

enableValidation(config);