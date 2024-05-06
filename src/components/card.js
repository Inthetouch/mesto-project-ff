import { sendDeleteCard, sendLikeCard } from "./api";

//Функция создания карточек
function createCard(item, ownerUserId, { deleteCard, giveLike, openPicture }) {
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.cloneNode(true);
  const cardId = newCard.querySelector('.places__item.card');
  const cardImage = newCard.querySelector('.card__image');
  const cardTitle = newCard.querySelector('.card__title');
  const deleteButton = newCard.querySelector('.card__delete-button');
  const cardLike = newCard.querySelector('.card__like-button');
  const getLike = newCard.querySelector('.card__likes');

  cardImage.src = item.link;
  cardImage.alt = item.name
  cardTitle.textContent = item.name;
  getLike.textContent = getLikesCount(item.likes);
  cardId.dataset.cardId = item._id;

  (function(item, ownerUser) {
    if (item.owner && item.owner._id === ownerUser) {
      deleteButton.style.display = 'flex';
    } else {
      deleteButton.style.display = 'none';
    }
  })(item, ownerUserId);

  (function(item) {
    if(item.likes && Array.isArray(item.likes)){
      item.likes.forEach(user => {
        if (user._id === ownerUserId) {
          cardLike.classList.add('card__like-button_is-active');
        }
      });
    }
  })(item);
  
  deleteButton.addEventListener('click', deleteCard);
  cardLike.addEventListener('click', giveLike);
  cardImage.addEventListener('click', openPicture);
  
  return newCard;
};


//Функция удаления карточки
function deleteCard(event) {
  const element = event.target.closest('.places__item');
  const cardId = element.dataset.cardId;

  sendDeleteCard(cardId)
    .then(response => {
      console.log(response);
      element.remove();
    })
    .catch(error => {
      console.log(`Ошибка: ${error}`);
    })
};

//Меняет цвет лайка
function giveLike(event) {
  const element = event.target.closest('.places__item');
  const cardId = element.dataset.cardId;
  const isLiked = event.target.classList.contains('card__like-button_is-active');

  if(!isLiked) {
    sendLikeCard(cardId, true)
      .then(response => {
        return response.likes;
      })
      .then(updateLikes => {
        const likeCount = element.querySelector('.card__likes');
        likeCount.textContent = updateLikes.length;
        event.target.classList.add('card__like-button_is-active');
      })
      .catch(error => {
        console.log('Ошибка при добавлении лайка: ', error);
      });
  } else {
    sendLikeCard(cardId, false)
      .then(response => {
        return response.likes;
      })
      .then(updateLikes => {
        let likeCount = element.querySelector('.card__likes');
        likeCount.textContent = updateLikes.length;
        event.target.classList.remove('card__like-button_is-active');
      })
      .catch(error => {
        console.log('Ошибка при удалении лайка: ', error)
      })
  }
};

//Функция отображающая количество лайков
function getLikesCount(likes) {
  return likes ? likes.length : 0;
};

export { createCard, deleteCard, giveLike };