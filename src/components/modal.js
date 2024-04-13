import { saveFormProfileValue, valueProfileSubmit, editPopup, formElement, addAnimation, addOpenClass, popupTypeImage, closeByEscape } from '../index.js';
import { addNewCard } from '../index.js';

//Функция окрытия окна редактирования
function openPopup() {
  saveFormProfileValue();
  addAnimation(editPopup);
  addOpenClass(editPopup);

  //Слушатель на нажатие Escape
  document.addEventListener('keydown', closeByEscape);
  //Слушатель на нажатие кнопки "Сохранить"
  formElement.addEventListener('submit', valueProfileSubmit);
}


//Функция закрывающая окна редактирования
function closePopup(element) {
  element.classList.remove('popup_is-opened');
}


//Функция открытия формы карточки
function buttonAddNewCard() {
  const handleAddCard = document.querySelector('.popup_type_new-card');

  addAnimation(handleAddCard);
  addOpenClass(handleAddCard);
  
  //Слушатель на нажатие Escape
  document.addEventListener('keydown', closeByEscape);

  handleAddCard.querySelector('.popup__form').addEventListener('submit', addNewCard);
}

//Функция открытия картинки карточки
function openPicture(event) {
  const popupImage = popupTypeImage.querySelector('.popup__image');
  const popupCaption = popupTypeImage.querySelector(".popup__caption");
  
  addAnimation(popupTypeImage);
  popupTypeImage.classList.toggle('popup_is-opened');
  
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;

  popupCaption.textContent = event.target.alt; 

  //Слушатель на нажатие Escape
  document.addEventListener('keydown', closeByEscape);
}

export { openPopup, closePopup, buttonAddNewCard, openPicture };