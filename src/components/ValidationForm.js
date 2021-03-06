export default class ValidationForm {
    constructor(data) {
      this._formSelector = data.formSelector;
      this._inputSelector = data.inputSelector;
      this._submitButtonSelector = data.submitButtonSelector;
      this._inactiveButtonClass = data.inactiveButtonClass;
      this._inputErrorClass = data.inputErrorClass;
      this._errorClass = data.errorClass;
    }
  
    _showInputError = (formElement, inputElement, errorMessage) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
    };
  
    _hideInputError = (formElement, inputElement) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
    };
    
    _checkInputValidity = (formElement, inputElement) => {
      if (!inputElement.validity.valid) {
        this._showInputError(formElement, inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(formElement, inputElement);
      }
    };
    
    _hasInvalidInput = (inputList) => {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    };
    
    _toggleButtonState = (inputList, buttonElement) => {
      if (this._hasInvalidInput(inputList)) {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.disabled = true;
          } else {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.disabled = false;
      }
    };
    
    _setEventListeners = (formElement) => {
      const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
      const buttonElement = formElement.querySelector(this._submitButtonSelector);
    
      this._toggleButtonState(inputList, buttonElement);
    
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(formElement, inputElement);
          this._toggleButtonState(inputList, buttonElement);
        });
      });
    };
    
    enableValidation = () => {
      const formList = Array.from(document.querySelectorAll(this._formSelector));
      formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
          evt.preventDefault();
        });
    
        const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
    
        fieldsetList.forEach((fieldset) => {
          this._setEventListeners(fieldset);
        });
      });
    };
  
  }
  
  
  