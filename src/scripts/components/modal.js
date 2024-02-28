function popupIsOpened(popup) {
  popup.classList.add("popup_is-opened");

  document.addEventListener("keydown", closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelectorAll(".popup");
    for (let i = 0; i < popup.length; i++) {
      closePopup(popup[i]);
    }
  }
}

export { popupIsOpened, closePopup, closePopupEsc };
