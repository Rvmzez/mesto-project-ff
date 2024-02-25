const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, deleteCard, cardLike, openImagePopup) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImageButton = cardElement.querySelector(".card__image");

  cardImageButton.src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  likeButton.addEventListener("click", () => {
    cardLike(likeButton);
  });

  cardImageButton.addEventListener("click", () => {
    openImagePopup(cardElement);
  });
  return cardElement;
}

function cardLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

function deleteCard(cardElement) {
  cardElement.remove();
}

export { createCard, cardLike, deleteCard };
