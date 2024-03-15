export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-8",
  headers: {
    authorization: "515aac65-b974-45c4-ba8b-ae42da887315",
    "Content-Type": "application/json",
  },
};

const changeProfile = (nameValue, jobValue) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameValue,
      about: jobValue,
    }),
  }).finally(() => {
    renderLoading(false);
  });
};

const createNewCard = (cardName, cardUrl) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardUrl,
      alt: cardName,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .finally(() => {
      renderLoading(false);
    });
};

const userMe = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const cardDel = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteLikeCards = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const addAvatar = (ava) => {
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: ava,
    }),
  })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
    });
};

function renderLoading(isLoading) {
  const popupButton = document.querySelectorAll(".popup__button");
  if (isLoading) {
    popupButton.forEach((btn) => {
      btn.textContent = "Сохранение...";
    });
  } else {
    popupButton.forEach((btn) => {
      btn.textContent = "Сохранить";
    });
  }
}

export {
  changeProfile,
  userMe,
  getInitialCards,
  cardDel,
  addLike,
  deleteLikeCards,
  addAvatar,
  createNewCard,
  renderLoading,
};
