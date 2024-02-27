import { initialCards } from "./cards.js";
import {
  popupIsOpened,
  closePopup,
  formElement,
  formElementCard,
  closePopupEsc,
  popupIsOpenWithAnimation,
  popupTypeImage,
} from "./components/modal.js";
import { createCard, cardLike, deleteCard } from "./components/card.js";
import "../pages/index.css";

const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popup = document.querySelectorAll(".popup");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupNewCardName = document.querySelector(".popup__input_type_card-name");
const popupNewCardUrl = document.querySelector(".popup__input_type_url");

profileEditButton.addEventListener("click", popupIsOpened, addNameJobInput());
addButton.addEventListener("click", popupIsOpened);
formElement.addEventListener("submit", handleFormSubmit);
formElementCard.addEventListener("submit", cardFormSubmit);

initialCards.forEach((cardData) => {
  placesList.append(createCard(cardData, deleteCard, cardLike, openImagePopup));
});

for (let i = 0; i < popup.length; i++) {
  popup[i].addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup__close") ||
      evt.target.classList.contains("popup")
    ) {
      addNameJobInput();
      closePopup(popup);
    }
  });
}

function addNewCard(cardData) {
  const cardUser = createCard(cardData, deleteCard, cardLike, openImagePopup);
  if (placesList.children.length < initialCards.length) {
    placesList.append(cardUser);
  } else {
    placesList.prepend(cardUser);
  }
}

function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  popupTypeImage.classList.add("popup_is-opened");
  popupIsOpenWithAnimation;
  document.addEventListener("keydown", closePopupEsc);
}

function addNameJobInput() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  popupNewCardName.value = "";
  popupNewCardUrl.value = "";
}

function editProfile(nameValue, jobValue) {
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  editProfile(nameInput.value, jobInput.value);
  formElement.reset();
  addNameJobInput();
  closePopup(popup);
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
  closePopup(popup);
}
