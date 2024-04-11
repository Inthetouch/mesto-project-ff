export { createCard, addNewCard, deleteCard, giveLike };

//Функция создания карточек
function createCard(item, { deleteCard, giveLike, openPicture }) {
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  const cardTitle = newCard.querySelector('.card__title');
  const deleteButton = newCard.querySelector('.card__delete-button');
  const cardLike = newCard.querySelector('.card__like-button');

  cardImage.src = item.link;
  cardImage.alt = item.name
  cardTitle.textContent = item.name;
  deleteButton.addEventListener('click', deleteCard);
  cardLike.addEventListener('click', giveLike);
  cardImage.addEventListener('click', openPicture);

  return newCard;
}

//Функция добавления карточки
function addNewCard(event) {
  event.preventDefault();

  const placeNameInput = document.querySelector('.popup__input_type_card-name');
  const linkPlaceNameInput = document.querySelector('.popup__input_type_url');

  const newCardItem = {
    name: placeNameInput.value,
    link: linkPlaceNameInput.value,
    title: placeNameInput.value
  };

  const newCard = createCard(newCardItem, { deleteCard, giveLike});
  placeList.prepend(newCard);

  placeNameInput.value = '';
  linkPlaceNameInput.value = '';

  closePopup(handleAddCard);
}

//Функция удаления карточки
function deleteCard(event) {
  event.target.closest('.places__item').remove();
} 

//Меняет цвет лайка
function giveLike(event) {
  event.target.classList.toggle('card__like-button_is-active')
}