const cardTemplate = document.querySelector("#card-template").content;

function createCard(
  cardData,
  deleteCard,
  cardLike,
  openImagePopup,
  userId,
  cardDel,
  likedCard,
  deletedLike
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImageButton = cardElement.querySelector(".card__image");
  const cardLikeVision = cardElement.querySelector(".card__like-vision");

  cardImageButton.src = cardData.link;
  cardImageButton.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardLikeVision.textContent = cardData.likes.length;

  if (!(cardData.owner._id === userId)) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => {
      deleteCard(cardElement);
      cardDel(cardData._id);
    });
  }

  cardData.likes.some((likes) => {
    if (likes._id === userId) {
      likeButton.classList.add("card__like-button_is-active");
    } else {
      likeButton.classList.remove("card__like-button_is-active");
    }
  });

  likeButton.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("card__like-button_is-active")) {
      deletedLike(evt, cardData._id);
    } else {
      likedCard(evt, cardData._id);
    }
    cardLike(likeButton);
  });

  cardImageButton.addEventListener("click", () => {
    openImagePopup(cardData);
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
