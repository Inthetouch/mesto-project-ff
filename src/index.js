import './pages/index.css';
import { createCard, deleteCard, giveLike } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { initialCards } from './cards.js';

const placeList = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup.popup_type_edit');
const formElement = editPopup.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const buttonAddCard = document.querySelector('.profile__add-button');
const handleAddCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const formNewPlace = document.forms['new-place'];
const placeNameInput = formNewPlace.querySelector('.popup__input_type_card-name');
const linkPlaceNameInput = formNewPlace.querySelector('.popup__input_type_url');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector(".popup__caption");

//Функция добавления карточки
function addNewCard(event) {
  event.preventDefault();

  const newCardItem = {
    name: placeNameInput.value,
    link: linkPlaceNameInput.value,
    title: placeNameInput.value
  };

  const newCard = createCard(newCardItem, { deleteCard, giveLike, openPicture});
  placeList.prepend(newCard);

  formNewPlace.reset();

  closePopup(handleAddCard);
}

//Добавление карточек на страницу
initialCards.forEach((item) => {
  const addCard = createCard(item, { deleteCard, giveLike, openPicture });
  placeList.append(addCard);
});

//Слушатель на кнопку редактировать профиль
editProfileButton.addEventListener('click', openPopup);

//Слушатель на нажатие кнопки Escape при открытом окне
function closeByEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
    document.removeEventListener('keydown', closeByEscape); 
  }
}

//Слушатель отслеживающий нажатие крестика и клика на overlay
document.querySelectorAll('.popup').forEach(function(popup) {
  popup.addEventListener('click', function(event) {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

//Функция сохранения значений из форм
function saveFormProfileValue() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

//Функция сохранения введенных значений 
function valueProfileSubmit(event) {
  event.preventDefault(); 

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  event.target.removeEventListener('submit', valueProfileSubmit);

  closePopup(editPopup);
}

//Слушатель на кнопку "+"
buttonAddCard.addEventListener('click', openAddNewCard);

function addAnimation (element) {
  element.classList.add('popup_is-animated');
}

function addOpenClass (element) {
  element.classList.add('popup_is-opened');
  //Слушатель на нажатие Escape
  document.addEventListener('keydown', closeByEscape);
}

//Функция открытия формы карточки
function openAddNewCard() {
  
  addAnimation(handleAddCard);
  addOpenClass(handleAddCard);
  
  //Слушатель на нажатие Escape
  document.addEventListener('keydown', closeByEscape);

  handleAddCard.querySelector('.popup__form').addEventListener('submit', addNewCard);
}

//Функция открытия картинки карточки
function openPicture(event) {
  
  addAnimation(popupTypeImage);
  addOpenClass(popupTypeImage);
  
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;

  popupCaption.textContent = event.target.alt; 

  //Слушатель на нажатие Escape
  document.addEventListener('keydown', closeByEscape);
}

export { saveFormProfileValue, valueProfileSubmit, editPopup, formElement, addNewCard, addAnimation, addOpenClass, popupTypeImage, closeByEscape };