const configValidate = {
  formSelector: ".form",
  formFieldsetSelector: ".form__fieldset",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

function showInputError(fieldsetElement, inputElement, errorMessage) {
  const errorElement = fieldsetElement.querySelector(
    `.${inputElement.id}-error`
  );
  inputElement.classList.add(configValidate.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configValidate.errorClass);
}

function hideInputError(fieldsetElement, inputElement) {
  const errorElement = fieldsetElement.querySelector(
    `.${inputElement.id}-error`
  );
  inputElement.classList.remove(configValidate.inputErrorClass);
  errorElement.classList.remove(configValidate.inputErrorClass);
  errorElement.textContent = "";
}

function checkInputValidity(fieldsetElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(
      fieldsetElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(fieldsetElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", "disabled");
    buttonElement.classList.add(configValidate.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled", "disabled");
    buttonElement.classList.remove(configValidate.inactiveButtonClass);
  }
}

function setEventListeners(fieldsetElement) {
  const inputList = Array.from(
    fieldsetElement.querySelectorAll(configValidate.inputSelector)
  );
  const buttonElement = fieldsetElement.querySelector(
    configValidate.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(fieldsetElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation(configValidate) {
  const formList = Array.from(
    document.querySelectorAll(configValidate.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(
      formElement.querySelectorAll(configValidate.formFieldsetSelector)
    );

    fieldsetList.forEach((fieldsetElement) => {
      setEventListeners(fieldsetElement);
    });
  });
}

export function resetValidation() {
  const formList = Array.from(
    document.querySelectorAll(configValidate.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    const inputList = Array.from(
      formElement.querySelectorAll(configValidate.inputSelector)
    );
    inputList.forEach((inputElement) => {
      const errorElement = formElement.querySelector(
        `.${inputElement.id}-error`
      );
      errorElement.classList.remove(configValidate.errorClass);
      inputElement.classList.remove(configValidate.inputErrorClass);
    });
  });
}

enableValidation(configValidate);
