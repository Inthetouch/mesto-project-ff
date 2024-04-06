const cardTemplate = document.querySelector('#card-template').content;
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
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const linkPlaceNameInput = document.querySelector('.popup__input_type_url');



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
});




//Функция окрытия окна редактирования
function openPopup() {
  formProfileValue();
  editPopup.classList.add('popup_is-opened');

  //Слушатель на нажатие кнопки "Сохранить"
  formElement.addEventListener('submit', valueProfileSubmit); 
}

//Слушатель на кнопку редактировать профиль
editProfileButton.addEventListener('click', openPopup);

//Функция закрывающая окна редактирования
function closePopup(element) {
  element.classList.remove('popup_is-opened');
}

//Слушатель на нажатие кнопки Escape при открытом окне
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && editPopup.classList.contains('popup_is-opened')) {
    closePopup(editPopup);
  } else if (event.key === 'Escape' && handleAddCard.classList.contains('popup_is-opened')) {
    closePopup(handleAddCard);
  }
});

//Слушатель отслеживающий нажатие крестика и клика на overlay
document.querySelectorAll('.popup').forEach(function(popup) {
  popup.addEventListener('click', function(event) {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});


//Функция сохранения значений из форм
function formProfileValue() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

//Функция сохранения введенных значений 
function valueProfileSubmit(event) {
    event.preventDefault(); 

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closePopup(editPopup);
}

//Функция открытия формы карточки
function buttonAddNewCard() {
  handleAddCard.classList.add('popup_is-opened')
}

//Слушатель на кнопку "+"
buttonAddCard.addEventListener('click', buttonAddNewCard);