import { sendProfileSubmit, resetForm, sendNewAvatar } from '../index.js';

function openPopup (element) {
  element.classList.add('popup_is-opened');
  //Слушатель на нажатие Escape
  document.addEventListener('keydown', closeByEscape);
}

//Функция закрывающая окна редактирования
function closePopup(element) {
  element.classList.remove('popup_is-opened');
  element.removeEventListener('keydown', closeByEscape);
  resetForm();
}

//Слушатель на нажатие кнопки Escape при открытом окне
function closeByEscape(event) {
  if (event.key === 'Escape' && document.querySelector('.popup_is-opened')) {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
};

export { openPopup, closePopup, closeByEscape };