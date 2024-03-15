import {
  changeProfile,
  userMe,
  getInitialCards,
  cardDel,
  addLike,
  deleteLikeCards,
  addAvatar,
  createNewCard,
  renderLoading,
} from "./api.js";
import {
  popupIsOpened,
  closePopup,
  closePopupEsc,
} from "./components/modal.js";
import { createCard, cardLike, deleteCard } from "./components/card.js";
import { enableValidation, clearValidation } from "./validation.js";
import "../pages/index.css";

const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popup = document.querySelectorAll(".popup");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const profileImage = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popupNewCardName = document.querySelector(".popup__input_type_card-name");
const popupNewCardUrl = document.querySelector(".popup__input_type_url");

const popupTypeAvatar = document.querySelector(".popup_type_avatar");
const popupInputTypeUrlAvatar = document.querySelector(".popup__input_type_url-avatar");
const buttonImageAvatar = document.querySelector(".profile__image");

const formElement = document.querySelector(".popup__form");
const formElementCard = popupTypeNewCard.querySelector(".popup__form");
const formElementAvatar = popupTypeAvatar.querySelector(".popup__form");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  inputErrorActive: "popup__input-error_active",
  errorClass: "popup__error_visible",
  formSubmitInactive: "form__submit_inactive"
};

enableValidation(validationConfig)

popup.forEach((item) => {
  item.classList.add("popup_is-animated");
});

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  enableValidation(validationConfig);
  popupIsOpened(popupTypeEdit);
});
addButton.addEventListener("click", () => {
  enableValidation(validationConfig);
  popupIsOpened(popupTypeNewCard);
});
buttonImageAvatar.addEventListener("click", () => {
  enableValidation(validationConfig);
  popupIsOpened(popupTypeAvatar);
});

formElement.addEventListener("submit", handleFormSubmit);
formElementCard.addEventListener("submit", cardFormSubmit);
formElementAvatar.addEventListener("submit", addAvatarSubmit);

for (let i = 0; i < popup.length; i++) {
  popup[i].addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup__close") ||
      evt.target.classList.contains("popup")
    ) {
      clearValidation(formElement, validationConfig);
      closePopup(popup[i]);
    }
  });
}

function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  popupTypeImage.classList.add("popup_is-animated");
  popupTypeImage.classList.add("popup_is-opened");

  document.addEventListener("keydown", closePopupEsc);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);
  editProfile(nameInput.value, jobInput.value);
  formElement.reset();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  closePopup(popupTypeEdit);
}

function editProfile(nameValue, jobValue) {
  (profileTitle.textContent = nameValue),
    (profileDescription.textContent = jobValue);
  changeProfile(profileTitle.textContent, profileDescription.textContent);
}

const userMeCard = (userId) => {
  return Promise.all([userMe(), getInitialCards()]).then((result) => {
    userId = result[0]._id;
    profileTitle.textContent = result[0].name;
    profileDescription.textContent = result[0].about;
    profileImage.style.backgroundImage = `url(${result[0].avatar})`;
    result[1].forEach((cardData) => {
      placesList.append(
        createCard(
          cardData,
          deleteCard,
          cardLike,
          openImagePopup,
          userId,
          cardDel,
          likedCard,
          deletedLike
        )
      );
    });
  });
};

userMeCard();

function likedCard(evt, cardId) {
  const likeButton = evt.target;
  const cardLikeVision = evt.target
    .closest(".card")
    .querySelector(".card__like-vision");
  addLike(cardId).then((result) => {
    likeButton.classList.add("card__like-button_is-active");
    cardLikeVision.textContent = result.likes.length;
  });
}

function deletedLike(evt, cardId) {
  const likeButton = evt.target;
  const cardLikeVision = evt.target
    .closest(".card")
    .querySelector(".card__like-vision");
  deleteLikeCards(cardId).then((result) => {
    likeButton.classList.remove("card__like-button_is-active");
    cardLikeVision.textContent = result.likes.length;
  });
}

function addAvatarSubmit(evt) {
  evt.preventDefault();
  profileImage.style.backgroundImage = `url(${popupInputTypeUrlAvatar.value})`;
  renderLoading(true);
  addAvatar(popupInputTypeUrlAvatar.value);
  closePopup(popupTypeAvatar);
}

function cardFormSubmit(evt, userId) {
  evt.preventDefault();
  renderLoading(true);

  createNewCard(popupNewCardName.value, popupNewCardUrl.value).then(
    (result) => {
      userId = result.owner._id;
      const newCard = {
        name: result.name,
        link: result.link,
        alt: result.name,
        _id: result._id,
        owner: result.owner,
        likes: [],
      };
      const newCardData = createCard(
        newCard,
        deleteCard,
        cardLike,
        openImagePopup,
        userId,
        cardDel,
        likedCard,
        deletedLike
      );

      placesList.prepend(newCardData);
    }
  );

  formElementCard.reset();
  closePopup(popupTypeNewCard);
}
