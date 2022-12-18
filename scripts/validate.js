export const configValidate = {
  formSelector: ".form",
  formFieldsetSelector: ".form__fieldset",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

function showInputError(fieldsetElement, inputElement, errorMessage, config) {
  const errorElement = fieldsetElement.querySelector(
    `.${inputElement.id}-error`
  );
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(fieldsetElement, inputElement, config) {
  const errorElement = fieldsetElement.querySelector(
    `.${inputElement.id}-error`
  );
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
}

function checkInputValidity(fieldsetElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(
      fieldsetElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(fieldsetElement, inputElement, config);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", "disabled");
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

function setEventListeners(fieldsetElement, config) {
  const inputList = Array.from(
    fieldsetElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = fieldsetElement.querySelector(
    config.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(fieldsetElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(
      formElement.querySelectorAll(config.formFieldsetSelector)
    );

    fieldsetList.forEach((fieldsetElement) => {
      setEventListeners(fieldsetElement, config);
    });
  });
}

export function resetValidation(config) {
  const fieldsetList = Array.from(
    document.querySelectorAll(config.formFieldsetSelector)
  );
  fieldsetList.forEach((fieldsetElement) => {
    const buttonElement = fieldsetElement.querySelector(
      config.submitButtonSelector
    );

    buttonElement.classList.add(config.inactiveButtonClass);

    const inputList = Array.from(
      fieldsetElement.querySelectorAll(config.inputSelector)
    );
    inputList.forEach((inputElement) => {
      const errorElement = fieldsetElement.querySelector(
        `.${inputElement.id}-error`
      );
      errorElement.classList.remove(config.errorClass);
      inputElement.classList.remove(config.inputErrorClass);
    });
  });
}

enableValidation(configValidate);
