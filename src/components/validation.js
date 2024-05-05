import { config } from "../index.js";

//Функция валидирующая формы
function isValid(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//Функция которая показывает сообщение об ошибке
function showInputError(formElement, inputElement, errorMessage) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  formElement.classList.add(config.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(config.inputErrorActive);
};

//Функция скрывающая текст 
function hideInputError(formElement, inputElement) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(config.inputErrorClass);
  formError.classList.remove(config.inputErrorActive);
  formError.textContent = '';
};

//Функция валидации полей
function hasInvalidInput(inputList) {
  return inputList.some((elementInput) => {
    return !elementInput.validity.valid;
  });
};

//Фукция переключающая состояние кнопки
function toggleButtonState(inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonSelector);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonSelector);
  }
}

//Функция добавляющая слушатель на поля input
function setEventListener(formElement, validationConfig){
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//Функция, очищающая ошибки валидации и делающая кнопку неактивной
function clearValidation (formElement, validationConfig) {
  
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement);
  });

  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
}

//Функция, включающая валидацию всех форм
function enableValidation(validationConfig) {
  const forms = document.querySelectorAll(validationConfig.formSelector);
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', function(event) {
      event.preventDefault();
    });
    setEventListener(formElement, validationConfig);
  })
}

export { clearValidation, enableValidation };