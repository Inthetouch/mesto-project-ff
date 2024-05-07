import './pages/index.css';
import { createCard, deleteCard, giveLike } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { fetchCardsData, fetchUserData, sendProfileData, sendNewCard, sendAvatarToServer } from './components/api.js';


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
const sendAvatar = popupAvatar.querySelector('.popup__form.form__avatar');
const urlAvatar = popupAvatar.querySelector('.popup__avatar-link');
const forms = document.querySelectorAll('.popup__form');
let ownerUserId;
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonSelector: 'popup__button-disable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  inputErrorActive: 'popup__input-error_active'
};

//Функция добавления карточки
function addNewCard(event) {
  event.preventDefault();
  
  const newCardItem = {
    name: placeNameInput.value,
    link: linkPlaceNameInput.value,
    title: placeNameInput.value
  };

  
  sendNewCard(newCardItem.name, newCardItem.link)
    .then(data => {
      const newCard = createCard(newCardItem, ownerUserId, { deleteCard, giveLike, openPicture});

      event.submitter.textContent = 'Сохранение...';

      placeList.prepend(newCard);

      const cardElement = document.querySelector('.places__item.card')
      cardElement.dataset.cardId = data._id;
      closePopup(handleAddCard);
    })
    .catch(error => {
      console.log(`Ошибка: ${error}`);
    })
    .finally(() => {
      event.submitter.textContent = 'Сохранить';
    })
  
};

//Слушатель на кнопку редактировать профиль
editProfileButton.addEventListener('click', openProfileEdit);

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
  
  event.submitter.textContent = 'Сохранение...';

  sendProfileData(profileTitle.textContent, profileDescription.textContent)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closePopup(editPopup);
    })
    .catch(error => {
      console.log(`Ошибка: ${error}`);
    })
    .finally(() => {
      event.submitter.textContent = 'Сохранить';
    })

  
};

//Слушатель на кнопку "+"
buttonAddCard.addEventListener('click', openAddNewCard);

function addAnimation (element) {
  element.classList.add('popup_is-animated');
};

//Слушатель на нажатие кнопки "Сохранить"
formElement.addEventListener('submit', sendProfileSubmit);

//Функция окрытия окна редактирования ссылающаяся на openPopup
function openProfileEdit() {
  saveFormProfileValue();
  addAnimation(editPopup);
  openPopup(editPopup);
  clearValidation(formElement, config);
};

//Функция открытия формы карточки ссылающаяся на openPopup
function openAddNewCard() {

  addAnimation(handleAddCard);
  openPopup(handleAddCard);

  formNewPlace.reset();
  clearValidation(newCardForm, config);
};

//Слушатель на сохранение новой карточки
newCardForm.addEventListener('submit', addNewCard);

//Функция открытия картинки карточки ссылающаяся на openPopup
function openPicture(event) {
  
  addAnimation(popupTypeImage);
  openPopup(popupTypeImage);
  
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;

  popupCaption.textContent = event.target.alt; 

};

//Включение валидации
enableValidation(config);

//Вывод карточек и имени пользователя с сервера на сайт
Promise.all([fetchCardsData(), fetchUserData()])
  .then(([cardsData, userData]) => {
    
    ownerUserId = userData._id;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;

    cardsData.forEach(card => {
      const newCard = createCard(card, ownerUserId, {deleteCard, giveLike, openPicture});
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
  resetForm();
}

//Слушатель на сохранение аватара
sendAvatar.addEventListener('submit', sendNewAvatar);

//Функция сброса форм, кроме карточки редактирования профиля
function resetForm() {
  forms.forEach(form => {
    if (form.getAttribute('name') !== 'edit-profile') {
      form.reset();
    }
  })
};

//Функция отправки данных после нажатия кнопки сохранить
function sendNewAvatar(event) {
  const url = urlAvatar.value;
  event.submitter.textContent = 'Сохранение...';
  sendAvatarToServer(url)
    .then(data => {
      profileImage.style.backgroundImage = `url('${data.avatar}')`;
      closePopup(addNewAvatar);
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`)
    })
    .finally(() => {
      event.submitter.textContent = 'Сохранить';
    })
  
};

export { sendProfileSubmit, resetForm, sendNewAvatar, ownerUserId, config };