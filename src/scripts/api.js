import { request } from "./utils/utils";

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-8",
  headers: {
    authorization: "515aac65-b974-45c4-ba8b-ae42da887315",
    "Content-Type": "application/json",
  },
};

const changeProfile = (nameValue, jobValue) => {
  return request(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameValue,
      about: jobValue,
    }),
  });
};

const createNewCard = (cardName, cardUrl) => {
  return request(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardUrl,
      alt: cardName,
    }),
  });
};

const getUserInfo = () => {
  return request(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization,
    },
  });
};

const getInitialCards = () => {
  return request(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization,
    },
  });
};

const deleteCard = (cardId) => {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

const addLikeCards = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
};

const deleteLikeCards = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

const addAvatarUser = (ava) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: ava,
    }),
  });
};

export {
  changeProfile,
  getUserInfo,
  getInitialCards,
  deleteCard,
  addLikeCards,
  deleteLikeCards,
  addAvatarUser,
  createNewCard,
};
