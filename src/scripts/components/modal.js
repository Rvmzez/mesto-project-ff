const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeEdit = document.querySelector(".popup_type_edit");
export const popupTypeImage = document.querySelector(".popup_type_image");
export const formElement = document.querySelector(".popup__form");
export const formElementCard = popupTypeNewCard.querySelector(".popup__form");

function popupIsOpened(popup) {
  if (popup.target.classList.contains("profile__edit-button")) {
    popupTypeEdit.classList.add("popup_is-opened");
    popupIsOpenWithAnimation;
  } else if (popup.target.classList.contains("profile__add-button")) {
    popupTypeNewCard.classList.add("popup_is-opened");
    popupIsOpenWithAnimation;
  }
  document.addEventListener("keydown", closePopupEsc);
}

const popupIsOpenWithAnimation = setTimeout(() => {
  popupTypeEdit.classList.add("popup_is-animated");
  popupTypeNewCard.classList.add("popup_is-animated");
  popupTypeImage.classList.add("popup_is-animated");
}, 1000);

function closePopup(popup) {
  for (let i = 0; i < popup.length; i++) {
    popup[i].classList.remove("popup_is-opened");
  }
  document.removeEventListener("keydown", closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelectorAll(".popup");

    closePopup(popup);
  }
}

export { popupIsOpened, closePopup, closePopupEsc, popupIsOpenWithAnimation };
