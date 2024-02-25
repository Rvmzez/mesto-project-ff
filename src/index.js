import { initialCards } from "./scripts/cards.js";
import {
  popupIsOpened,
  closePopup,
  formElement,
  formElementCard,
} from "./components/modal.js";
import { createCard, cardLike, deleteCard } from "./components/card.js";
import "./pages/index.css";

const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupNewCardName = document.querySelector(".popup__input_type_card-name");
const popupNewCardUrl = document.querySelector(".popup__input_type_url");

profileEditButton.addEventListener("click", popupIsOpened);
addButton.addEventListener("click", popupIsOpened);
formElement.addEventListener("submit", handleFormSubmit);
formElementCard.addEventListener("submit", cardFormSubmit);

initialCards.forEach((cardData) => {
  placesList.append(createCard(cardData, deleteCard, cardLike, openImagePopup));
});

function addNewCard(cardData) {
  const cardUser = createCard(cardData, deleteCard, cardLike, openImagePopup);
  if (placesList.children.length < initialCards.length) {
    placesList.append(cardUser);
  } else {
    placesList.prepend(cardUser);
  }
}

function openImagePopup(cardElement) {
  popupImage.src = cardElement.querySelector(".card__image").src;
  popupCaption.textContent = cardElement.textContent;

  popupTypeImage.classList.add("popup_is-animated");
  popupTypeImage.classList.add("popup_is-opened");
}

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

function editProfile(nameValue, jobValue) {
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  editProfile(nameInput.value, jobInput.value);
  formElement.reset();
  closePopup();
}

function cardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: popupNewCardName.value,
    link: popupNewCardUrl.value,
    alt: popupNewCardName.value,
  };

  addNewCard(newCard);
  formElementCard.reset();
  closePopup();
}
