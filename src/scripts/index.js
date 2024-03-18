import {
  changeProfile,
  getUserInfo,
  getInitialCards,
  deleteCard,
  addLikeCards,
  deleteLikeCards,
  addAvatarUser,
  createNewCard,
} from "./api.js";
import { validationConfig } from "./utils/constants.js";
import { renderLoading, request } from "./utils/utils.js";
import { openPopup, closePopup, closePopupEsc } from "./components/modal.js";
import { createCard, addClassLike, deleteCardData } from "./components/card.js";
import { enableValidation, clearValidation } from "./validation.js";
import "../pages/index.css";

const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popups = document.querySelectorAll(".popup");

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
const popupInputTypeUrlAvatar = document.querySelector(
  ".popup__input_type_url-avatar"
);
const buttonImageAvatar = document.querySelector(".profile__image");

const profileForm = document.forms["edit-profile"];
const placeForm = document.forms["new-place"];
const avatarForm = document.forms["new-avatar"];

enableValidation(validationConfig);

popups.forEach((item) => {
  item.classList.add("popup_is-animated");
});

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
  openPopup(popupTypeEdit);
});
addButton.addEventListener("click", () => {
  clearValidation(placeForm, validationConfig);
  openPopup(popupTypeNewCard);
});
buttonImageAvatar.addEventListener("click", () => {
  clearValidation(avatarForm, validationConfig);
  openPopup(popupTypeAvatar);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);
placeForm.addEventListener("submit", handleCardFormSubmit);
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup__close") ||
      evt.target.classList.contains("popup")
    ) {
      closePopup(popup);
    }
  });
});

function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  openPopup(popupTypeImage);
}

function handleProfileFormSubmit(evt, loadingText = "Сохранение...") {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);
  changeProfile(nameInput.value, jobInput.value)
    .then(() => {
      editProfile(nameInput.value, jobInput.value);
      closePopup(popupTypeEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}

function editProfile(nameValue, jobValue) {
  (profileTitle.textContent = nameValue),
    (profileDescription.textContent = jobValue);
}

const getAppInfo = (userId) => {
  return Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cards]) => {
      userId = userData._id;
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      cards.forEach((card) => {
        placesList.append(
          createCard(
            card,
            deleteCardData,
            openImagePopup,
            userId,
            deleteCard,
            likeCard,
            deleteLike
          )
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

getAppInfo();

function likeCard(evt, cardId) {
  const likeButton = evt.target;
  const cardLikeVision = evt.target
    .closest(".card")
    .querySelector(".card__like-vision");
  addLikeCards(cardId)
    .then((result) => {
      addClassLike(likeButton);
      cardLikeVision.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteLike(evt, cardId) {
  const likeButton = evt.target;
  const cardLikeVision = evt.target
    .closest(".card")
    .querySelector(".card__like-vision");
  deleteLikeCards(cardId)
    .then((result) => {
      addClassLike(likeButton);
      cardLikeVision.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleAvatarFormSubmit(evt, loadingText = "Сохранение...") {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);
  addAvatarUser(popupInputTypeUrlAvatar.value)
    .then(() => {
      profileImage.style.backgroundImage = `url(${popupInputTypeUrlAvatar.value})`;
      evt.target.reset();
      closePopup(popupTypeAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}

function handleCardFormSubmit(evt, userId, loadingText = "Сохранение...") {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);
  createNewCard(popupNewCardName.value, popupNewCardUrl.value)
    .then((result) => {
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
        deleteCardData,
        openImagePopup,
        userId,
        deleteCard,
        likeCard,
        deleteLike
      );
      placesList.prepend(newCardData);
      evt.target.reset();
      closePopup(popupTypeNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}
