class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.setAttribute("disabled", true);
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute("disabled");
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputElement, fieldsetElement) {
    const errorElement = fieldsetElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement, fieldsetElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement, fieldsetElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _inputElementListen(inputElement, fieldsetElement) {
    this._checkInputValidity(inputElement, fieldsetElement);
    this._toggleButtonState();
  }

  _setEventListeners(fieldsetElement) {
    this._inputList = Array.from(
      fieldsetElement.querySelectorAll(this._settings.inputSelector)
    );
    this._buttonElement = fieldsetElement.querySelector(
      this._settings.submitButtonSelector
    );

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () =>
        this._inputElementListen(inputElement, fieldsetElement)
      );
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    this._fieldsetList = [
      ...this._formElement.querySelectorAll(
        this._settings.formFieldsetSelector
      ),
    ];

    this._fieldsetList.forEach((fieldsetElement) => {
      this._setEventListeners(fieldsetElement);
    });
  }

  resetValidation() {
    this._fieldsetList.forEach((fieldsetElement) => {
      this._toggleButtonState();

      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement, fieldsetElement);
      });
    });
  }
}

export default FormValidator;
