//Функция валидирующая формы
function isValid(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

//Функция которая показывает сообщение об ошибке
function showInputError(formElement, inputElement, errorMessage, validationConfig ) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  formElement.classList.add(validationConfig.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(validationConfig.inputErrorActive);
};

//Функция скрывающая текст 
function hideInputError(formElement, inputElement, validationConfig) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationConfig.inputErrorClass);
  formError.classList.remove(validationConfig.inputErrorActive);
  formError.textContent = '';
};

//Функция валидации полей
function hasInvalidInput(inputList) {
  return inputList.some((elementInput) => {
    return !elementInput.validity.valid;
  });
};

//Фукция переключающая состояние кнопки
function toggleButtonState(inputList, buttonElement, validationConfig) {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonSelector);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonSelector);
  }
}

//Функция добавляющая слушатель на поля input
function setEventListener(formElement, validationConfig){
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

//Функция, очищающая ошибки валидации и делающая кнопку неактивной
function clearValidation (formElement, validationConfig) {
  
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, validationConfig);
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