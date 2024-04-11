export { openPopup, closePopup, buttonAddNewCard, openPicture };
import { formProfileValue, valueProfileSubmit } from '../index.js';
import { addNewCard } from './card.js';

//Функция окрытия окна редактирования
function openPopup() {
  formProfileValue();
  editPopup.classList.add('popup_is-animated');
  editPopup.classList.add('popup_is-opened');

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

  handleAddCard.classList.add('popup_is-animated');
  handleAddCard.classList.add('popup_is-opened');
  
  handleAddCard.querySelector('.popup__form').addEventListener('submit', addNewCard);
}

//Функция открытия картинки карточки
function openPicture(event) {
  const popupTypeImage = document.querySelector('.popup_type_image');
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector(".popup__caption");
  
  popupTypeImage.classList.add('popup_is-animated');
  popupTypeImage.classList.toggle('popup_is-opened');
  
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;

  popupCaption.textContent = event.target.alt; 
}