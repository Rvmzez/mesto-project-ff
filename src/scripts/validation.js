//валидация формы данных о пользователе
// Функция, которая добавляет класс с ошибкой
function showInputError(
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationConfig.inputErrorClass); 
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.inputErrorActive); 
}

// Функция, которая удаляет класс с ошибкой
function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.inputErrorActive);
  errorElement.textContent = "";
}

//функция очистки полей ошибки
function clearValidation(formElement, validationConfig) {
  const inputItem = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );

  inputItem.forEach((item) => {
    hideInputError(formElement, item, validationConfig);
  });
}

// Функция, которая проверяет валидность поля
function checkInputValidity(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  ); 
  const popupButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  ); 

  toggleButtonState(inputList, popupButton, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, popupButton, validationConfig);
    });
  });
}

function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  ); 
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
    clearValidation(formElement, validationConfig);
  });
}

//проверка валидности всех инпутов
function hasInvalidInput(inputList, validationConfig) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function hasInvalidInputRegular(inputList, validationConfig) {
  return inputList.some((inputElement) => {
    return inputElement.validity.patternMismatch;
  });
}

//функция переключения кнопки отправки формы
function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList) || hasInvalidInputRegular(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.formSubmitInactive);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.formSubmitInactive);
  }
}

export { enableValidation, clearValidation };
