const popup = document.querySelectorAll(".popup");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeEdit = document.querySelector(".popup_type_edit");
export const formElement = document.querySelector(".popup__form");
export const formElementCard = popupTypeNewCard.querySelector(".popup__form");

function popupIsOpened(evt) {
  if (evt.target.classList.contains("profile__edit-button")) {
    popupTypeEdit.classList.add("popup_is-animated");
    popupTypeEdit.classList.add("popup_is-opened");
  } else if (evt.target.classList.contains("profile__add-button")) {
    popupTypeNewCard.classList.add("popup_is-animated");
    popupTypeNewCard.classList.add("popup_is-opened");
  }
}

function closePopup() {
  const arrPopup = Array.from(popup);
  arrPopup.forEach((item) => {
    item.classList.remove("popup_is-opened");
  });
}

for (let i = 0; i < popup.length; i++) {
  popup[i].addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup__close") ||
      evt.target.classList.contains("popup")
    ) {
      closePopup();
    }
  });
}

window.addEventListener("keydown", (evt) => {
  if (evt.key == "Escape") {
    closePopup();
  }
});

export { popupIsOpened, closePopup };
