import { initialCards } from "./cards.js";
import {
  popupIsOpened,
  closePopup,
  closePopupEsc,
} from "./components/modal.js";
import { createCard, cardLike, deleteCard } from "./components/card.js";
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
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupNewCardName = document.querySelector(".popup__input_type_card-name");
const popupNewCardUrl = document.querySelector(".popup__input_type_url");
const formElement = document.querySelector(".popup__form");
const formElementCard = popupTypeNewCard.querySelector(".popup__form");

initialCards.forEach((cardData) => {
  placesList.append(createCard(cardData, deleteCard, cardLike, openImagePopup));
});

popup.forEach((item) => {
  item.classList.add("popup_is-animated");
});

profileEditButton.addEventListener(
  "click",
  () => popupIsOpened(popupTypeEdit),
  addNameJobInput(nameInput, jobInput)
);
addButton.addEventListener("click", () => popupIsOpened(popupTypeNewCard));
formElement.addEventListener("submit", handleFormSubmit);
formElementCard.addEventListener("submit", cardFormSubmit);

for (let i = 0; i < popup.length; i++) {
  popup[i].addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close")) {
      addNameJobInput(nameInput, jobInput);
      closePopup(popup[i]);
    } else if (evt.target.classList.contains("popup")) {
      closePopup(popup[i]);
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

  popupTypeImage.classList.add("popup_is-animated");
  popupTypeImage.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
}

function addNameJobInput(inputName, inputJob) {
  inputName.value = profileTitle.textContent;
  inputJob.value = profileDescription.textContent;
}

function editProfile(nameValue, jobValue) {
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  editProfile(nameInput.value, jobInput.value);
  formElement.reset();
  addNameJobInput(nameInput, jobInput);
  closePopup(popupTypeEdit);
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
  closePopup(popupTypeNewCard);
}
