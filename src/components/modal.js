import { sendProfileSubmit, closeByEscape } from '../index.js';

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
}

export { openPopup, closePopup };