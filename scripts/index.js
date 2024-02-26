// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

let placeList = document.querySelector('.places__list');
let cardTemplate = document.querySelector('#card-template').content;


function addCards() {
  initialCards.forEach((cards) => {
    let newCard = cardTemplate.cloneNode(true);
    let cardImage = newCard.querySelector('.card__image');
    let cardTitle = newCard.querySelector('.card__title');
    let cardDelete = newCard.querySelector('.card__delete-button');

    cardImage.src = cards.link;
    cardImage.alt = cards.name;
    cardTitle.textContent = cards.name;
    cardDelete.addEventListener('click', cardRemove);

    placeList.append(newCard);
  });
}

function cardRemove(event) {
  event.target.parentElement.remove();
}

addCards();

