const cardTemplate = document.querySelector('#card-template').content;
const placeList = document.querySelector('.places__list');
const editProfile = document.querySelector('.profile__edit-button');





function createCard(item, { deleteCard }) {
  const newCard = cardTemplate.cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  const descriptionCard = newCard.querySelector('.card__description');
  const deleteButton = newCard.querySelector('.card__delete-button');

  cardImage.src = item.link;
  cardImage.alt = item.name
  descriptionCard.textContent = item.name;
  deleteButton.addEventListener('click', deleteCard);

  return newCard;
}

function deleteCard(event) {
  event.target.closest('.places__item').remove();
} 

initialCards.forEach((item) => {
  const addCard = createCard(item, { deleteCard });
  placeList.append(addCard);
})

function openClosePopup(event) {
  const openPopup = document.querySelector('.popup.popup_type_edit');
  const closePopup = document.querySelector('.popup__close');
  const popupContent = document.querySelector('.popup__content');
  const darkOverlay = document.querySelector('.popup');

//Проверка что была нажата иконка редактирования профиля
//В случае если нет, то проверяет на нажатие "Х"
  if (event.target === editProfile) {
    openPopup.classList.add('popup_is-opened');
  } else if (event.target === closePopup || event.target === darkOverlay) {
    openPopup.classList.remove('popup_is-opened');
  } 
//Слушатель на нажатие клавишы Escape
  document.addEventListener('keydown', function(event) {
    const key = event.key
    if (key === 'Escape') {
      openPopup.classList.remove('popup_is-opened');
    }
  });
//Слушатель клика на оверлей
  darkOverlay.addEventListener('click', function(event) {
    if (event.target === darkOverlay) {
      openPopup.classList.remove('popup_is-opened');
    }
  })

//Слушатель на нажатие крестика для закрытия popup
  popupContent.addEventListener('click', openClosePopup);
}

editProfile.addEventListener('click', openClosePopup);