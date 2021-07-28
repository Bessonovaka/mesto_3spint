// Валидация формы

const showInputError = (formElement, inputElement, errorMessage, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement, obj) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, obj);
    } else {
      hideInputError(formElement, inputElement, obj);
    }
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  const toggleButtonState = (inputList, buttonElement, obj) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(obj.inactiveButtonClass);
        } else {
      buttonElement.classList.remove(obj.inactiveButtonClass);
    }
  };
  
  const setEventListeners = (formElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  
    toggleButtonState(inputList, buttonElement, obj);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, obj);
        toggleButtonState(inputList, buttonElement, obj);
      });
    });
  };
  
  const enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
  
      const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
  
      fieldsetList.forEach((fieldset) => {
        setEventListeners(fieldset, obj);
      });
    });
  };
  
  enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'submit-button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  });
  
  // Конец валидации формы