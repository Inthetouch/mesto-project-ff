import { profileImage } from "../index.js";

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-magistr-2/',
  headers: {
    authorization: 'cbee5349-85cc-413a-8b01-3e353ce82196',
    'Content-Type': 'application/json'
  }
}

//Получение информации о пользователе с сервера
const fetchUserData = () => {
  return fetch(`${config.baseUrl}users/me`, {
    headers: config.headers
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
};

//Получение информации о карточках с сервера
const fetchCardsData = () => {
  return fetch(`${config.baseUrl}cards`, {
    headers: config.headers
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  });
};


//Сохранение информации на сервере после редактирования профиля
const sendProfileData = (person, description) => {
  return fetch(`${config.baseUrl}users/me`, {
    method: 'PATCH',
    headers: config.headers,
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
};

//Отправка новой карточки на сервер
const sendNewCard = (title, link) => {
  return fetch(`${config.baseUrl}cards`, {
    method: 'POST',
    headers: config.headers,
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
};

//Запрос удаления карточки с сервера
const sendDeleteCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(response => {
      if (response.ok) {
        console.log('Карточка успешно удалена');
      } else {
        console.log('Ошибка при удалении карточки:', response.status)
      }
    })
    .catch(error => {
      console.log('Ошибка при удалении карточки:', error);
    });
};

//Отправка события - лайка карточки
const sendLikeCard = (cardId,  addingLike) => {
  const method = addingLike ? 'PUT' : 'DELETE'

  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
  method: method,
  headers: config.headers
})
  .then(response => {
    if(response.ok) {
      return response.json();
    } else {
      Promise.reject(`Что-то пошло не так: ${response.status}`)
    }
  })
  .then(response => {
    return response.likes;
  })
  .catch(error => {
    console.log('Ошибка: ', error);
  })
};

const sendAvatarToServer = (url) => {
  fetch(`${config.baseUrl}users/me/avatar`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    avatar: url
  })
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  })
  .then(data => {
    profileImage.style.backgroundImage = `url('${data.avatar}')`;
  })
  .catch((err) => {
    console.log('Ошибка: ', err);
  });
}

export { fetchCardsData, fetchUserData, sendProfileData, sendNewCard, sendDeleteCard, sendLikeCard, sendAvatarToServer };