import './pages/index.css';
import { createCard, deleteCard, giveLike } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { initialCards } from './cards.js';
import { enableValidation, clearValidation } from './components/validation.js';

const placeList = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup.popup_type_edit');
const formElement = editPopup.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
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
  sendNewCard(newCardItem.name, newCardItem.link);
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
  
  clearValidation(formElement, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonSelector: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });

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

//Включение валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup_error_visible'
});


//Получение информации о пользователе с сервера
function fetchUserData() {
  return fetch('https://mesto.nomoreparties.co/v1/cohort-magistr-2/users/me', {
    headers: {
      authorization: 'cbee5349-85cc-413a-8b01-3e353ce82196'
    }
  })
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  })
  .catch((err) => {
    console.log(err);
  });
}

//Получение информации о карточках с сервера
function fetchCardsData() {
  return fetch('https://mesto.nomoreparties.co/v1/cohort-magistr-2/cards', {
    headers: {
      authorization: 'cbee5349-85cc-413a-8b01-3e353ce82196'
    }
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  });
}

//Вывод карточек и имени пользователя с сервера на сайт
Promise.all([fetchCardsData(), fetchUserData()])
  .then(([cardsData, userData]) => {
    cardsData.forEach(card => {
      const newCard = createCard(card, {deleteCard, giveLike, openPicture});
      placeList.append(newCard);
    });
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
  })
  .catch(err => {
    console.log('Ошибка при выгрузке:', err);
  })

//Сохранение информации на сервере после редактирования профиля
function sendProfileData(person, description) {
  return fetch('https://mesto.nomoreparties.co/v1/cohort-magistr-2/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'cbee5349-85cc-413a-8b01-3e353ce82196',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: person,
      about: description
    })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${response.status}`);
      }
    })
    .catch((error) => {
      console.log(error);
    })
}

//Отправка новой карточки на сервер
function sendNewCard(title, link) {
  return fetch('https://mesto.nomoreparties.co/v1/cohort-magistr-2/cards', {
    method: 'POST',
    headers: {
      authorization: 'cbee5349-85cc-413a-8b01-3e353ce82196',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: title,
      link: link
    })
  })
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${response.status}`)
      }
    })
    .catch(error => {
      console.log('Ошибка:', error);
    })
}

export { sendProfileSubmit, closeByEscape };