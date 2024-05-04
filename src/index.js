import './pages/index.css';
import { createCard, deleteCard, giveLike } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { fetchCardsData, fetchUserData, sendProfileData, sendNewCard, sendAvatarToServer } from './components/api.js';
//import { initialCards } from './cards.js';


const placeList = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup.popup_type_edit');
const formElement = editPopup.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const addNewAvatar = document.querySelector('.popup_new-avatar');
const buttonAddCard = document.querySelector('.profile__add-button');
const handleAddCard = document.querySelector('.popup_type_new-card');
const newCardForm = document.querySelector('.popup_type_new-card .popup__form');
const popupTypeImage = document.querySelector('.popup_type_image');
const formNewPlace = document.forms['new-place'];
const placeNameInput = formNewPlace.querySelector('.popup__input_type_card-name');
const linkPlaceNameInput = formNewPlace.querySelector('.popup__input_type_url');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector(".popup__caption");
const popupAvatar = document.querySelector('.popup__avatar');
const sendAvatar = popupAvatar.querySelector('.button__save-avatar');
const urlAvatar = popupAvatar.querySelector('.popup__avatar-link');
const forms = document.querySelectorAll('.popup__form');
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonSelector: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

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
  sendNewCard(newCardItem.name, newCardItem.link)
    .then(data => {
      let cardElement = document.querySelector('.places__item.card')
      cardElement.dataset.cardId = data._id;
    })
  formNewPlace.reset();
  closePopup(handleAddCard);
};

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

  sendProfileData(profileTitle.textContent, profileDescription.textContent);

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
  
  formElement.addEventListener('submit', function () {
    formElement.querySelector('.button.popup__button').textContent = 'Сохранение...';
  })
  
  clearValidation(formElement, config);
};

//Функция открытия формы карточки ссылающаяся на openPopup
function openAddNewCard() {

  addAnimation(handleAddCard);
  openPopup(handleAddCard);

  newCardForm.addEventListener('submit', addNewCard);

  newCardForm.addEventListener('submit', function () {
    newCardForm.querySelector('.button.popup__button').textContent = 'Сохранение...';
  })

  clearValidation(newCardForm, config);

};

//Функция открытия картинки карточки ссылающаяся на openPopup
function openPicture(event) {
  
  addAnimation(popupTypeImage);
  openPopup(popupTypeImage);
  
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;

  popupCaption.textContent = event.target.alt; 

};

//Включение валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup_error_visible'
});

//Вывод карточек и имени пользователя с сервера на сайт
Promise.all([fetchCardsData(), fetchUserData()])
  .then(([cardsData, userData]) => {
    
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;

    cardsData.forEach(card => {
      const newCard = createCard(card, {deleteCard, giveLike, openPicture});
      placeList.append(newCard);
    });
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
  })
  .catch(err => {
    console.log('Ошибка при выгрузке:', err);
  });

//Слушатель нажатия на аватар
profileImage.addEventListener('click', replaceAvatar);

//Функция редактирования аватара
function replaceAvatar() {
  addAnimation(addNewAvatar);
  openPopup(addNewAvatar);
  clearValidation(addNewAvatar, config);
  sendAvatar.addEventListener('click', sendNewAvatar);
  
  sendAvatar.addEventListener('click', function () {
    sendAvatar.querySelector('.button.popup__button').textContent = 'Сохранение...';
  });
}

//Функция сброса форм, кроме карточки редактирования профиля
function resetForm() {
  forms.forEach(form => {
    if (form.getAttribute('name') !== 'edit-profile') {
      form.reset();
    }
  })
};

//Функция отправки данных после нажатия кнопки сохранить
function sendNewAvatar() {
  const url = urlAvatar.value;
  sendAvatarToServer(url)
  closePopup(addNewAvatar);
};

export { sendProfileSubmit, closeByEscape, resetForm, sendNewAvatar, profileImage };