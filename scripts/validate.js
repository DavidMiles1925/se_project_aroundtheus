const configValidate = {
  formSelector: ".form",
  formFieldsetSelector: ".form__fieldset",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

function showInputError(formElement, inputElement, errorMessage) {
  /*Need to add error spans to HTML*/
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  console.log(inputElement);
  inputElement.classList.add(configValidate.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configValidate.errorClass);
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(configValidate.inputErrorClass);
  errorElement.classList.remove(configValidate.inputErrorClass);
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", "disabled");
    buttonElement.classList.add(configValidate.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled", "disabled");
    buttonElement.classList.remove(configValidate.inactiveButtonClass);
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(configValidate.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    configValidate.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation(configValidate) {
  console.log("enable validation");
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

    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });
  });
}

enableValidation(configValidate);
