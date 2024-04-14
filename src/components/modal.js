import { saveFormProfileValue, valueProfileSubmit, editPopup, formElement, addAnimation, addOpenClass, closeByEscape } from '../index.js';

//Функция окрытия окна редактирования
function openPopup() {
  saveFormProfileValue();
  addAnimation(editPopup);
  addOpenClass(editPopup);

  //Слушатель на нажатие кнопки "Сохранить"
  formElement.addEventListener('submit', valueProfileSubmit);
}


//Функция закрывающая окна редактирования
function closePopup(element) {
  element.classList.remove('popup_is-opened');
  element.removeEventListener('submit', valueProfileSubmit);
  element.removeEventListener('keydown', closeByEscape); 
}

export { openPopup, closePopup };