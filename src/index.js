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
};

//Добавление карточек на страницу
initialCards.forEach((item) => {
  const addCard = createCard(item, { deleteCard, giveLike, openPicture });
  placeList.append(addCard);
});

//Слушатель на кнопку редактировать профиль
editProfileButton.addEventListener('click', openProfileEdit);

//Слушатель на нажатие кнопки Escape при открытом окне
function closeByEscape(event) {
  if (event.key === 'Escape' && document.querySelector('.popup_is-opened')) {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
};

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
};

//Функция сохранения введенных значений 
function sendProfileSubmit(event) {
  event.preventDefault(); 

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value; 
  event.target.removeEventListener('submit', sendProfileSubmit);

  closePopup(editPopup);
};

//Слушатель на кнопку "+"
buttonAddCard.addEventListener('click', openAddNewCard);

function addAnimation (element) {
  element.classList.add('popup_is-animated');
};

//Функция окрытия окна редактирования ссылающаяся на openPopup
function openProfileEdit() {
  saveFormProfileValue();
  addAnimation(editPopup);
  openPopup(editPopup);

  //Слушатель на нажатие кнопки "Сохранить"
  formElement.addEventListener('submit', sendProfileSubmit);
  setEventListener(formElement);
};

//Функция открытия формы карточки ссылающаяся на openPopup
function openAddNewCard() {
  
  addAnimation(handleAddCard);
  openPopup(handleAddCard);

  handleAddCard.querySelector('.popup__form').addEventListener('submit', addNewCard);
};

//Функция открытия картинки карточки ссылающаяся на openPopup
function openPicture(event) {
  
  addAnimation(popupTypeImage);
  openPopup(popupTypeImage);
  
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;

  popupCaption.textContent = event.target.alt; 

};

//Функция которая показывает сообщение об ошибке
function showInputError(formElement, inputElement, errorMessage) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  formElement.classList.add('popup__input_type_e1rror');
  formError.textContent = errorMessage;
  formError.classList.add('popup__input-error_active');
};

//Функция скрывающая текст 
function hideInputError(formElement, inputElement) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('popup__input_type_error');
  formError.classList.remove('popup__input-error_active');
  formError.textContent = '';
};

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

//Функция добавляющая слушатель на поля input
function setEventListener(formElement){
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.button.popup__button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//Функция валидации полей
function hasInvalidInput(inputList) {
  return inputList.some((elementInput) => {
    return !elementInput.validity.valid;
  });
};

//Фукция отключающая кнопку
function toggleButtonState(inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button-disable');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button-disable');
  }
}

export { sendProfileSubmit, closeByEscape, hideInputError };