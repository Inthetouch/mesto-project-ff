import { sendProfileSubmit, closeByEscape, hideInputError } from '../index.js';

function openPopup (element) {
  element.classList.add('popup_is-opened');
  //Слушатель на нажатие Escape
  document.addEventListener('keydown', closeByEscape);
}

//Функция закрывающая окна редактирования
function closePopup(element) {
  element.classList.remove('popup_is-opened');
  element.removeEventListener('submit', sendProfileSubmit);
  element.removeEventListener('keydown', closeByEscape);

  const formElement = element.querySelector('.popup__form');
  const inputElement = Array.from(formElement.querySelectorAll('.popup__input'));
  inputElement.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
}

export { openPopup, closePopup };