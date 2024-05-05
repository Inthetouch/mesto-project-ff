import { checkResponse } from "../utils/check.js";

//Конфиг
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-magistr-2/',
  headers: {
    authorization: 'cbee5349-85cc-413a-8b01-3e353ce82196',
    'Content-Type': 'application/json'
  }
}

//Универсальная функция запроса
const request = (url, option) => {
  return fetch(url, option).then(checkResponse)
}

//Получение информации о пользователе с сервера
const fetchUserData = () => {
  return request(`${config.baseUrl}users/me`, {
    headers: config.headers
  })
};

//Получение информации о карточках с сервера
const fetchCardsData = () => {
  return request(`${config.baseUrl}cards`, {
    headers: config.headers
  })
};


//Сохранение информации на сервере после редактирования профиля
const sendProfileData = (person, description) => {
  return request(`${config.baseUrl}users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: person,
      about: description
    })
  })
};

//Отправка новой карточки на сервер
const sendNewCard = (title, link) => {
  return request(`${config.baseUrl}cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: title,
      link: link
    })
  })
};

//Запрос удаления карточки с сервера
const sendDeleteCard = (cardId) => {
  return request(`${config.baseUrl}cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
};

//Отправка события - лайка карточки
const sendLikeCard = (cardId,  addingLike) => {
  const method = addingLike ? 'PUT' : 'DELETE'

  return request(`${config.baseUrl}cards/likes/${cardId}`, {
  method: method,
  headers: config.headers
})
};

const sendAvatarToServer = (url) => {
  return request(`${config.baseUrl}users/me/avatar`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    avatar: url
  })
})
}

export { fetchCardsData, fetchUserData, sendProfileData, sendNewCard, sendDeleteCard, sendLikeCard, sendAvatarToServer };