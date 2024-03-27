
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placeList = document.querySelector('.places__list');

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