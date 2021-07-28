const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

function createCard(src, textCont) {
    const photoGrid = document.querySelector('.photo-grid');

    const photoGridTemplate = document.querySelector('#photo-grid-card').content;
    // клонируем содержимое тега template
    const photoGridCard = photoGridTemplate.querySelector('.photo-grid__card').cloneNode(true);

    // наполняем содержимым
    photoGridCard.querySelector('.photo-grid__img').src = src;
    photoGridCard.querySelector('.photo-grid__title').textContent = textCont;

    // отображаем на странице
    photoGrid.prepend(photoGridCard);

}

function deleteCard(btn) {
  const card = btn.closest('.photo-grid__card');
  card.remove();
}

function likeDislike(x) {
    x.classList.toggle('like-button_fill_black');
}

function viewPhoto(photo) {
  const photoPopup = document.querySelector('.popup-big-photo');
  const photoPopupImage = document.querySelector('.popup-big-photo__image');
  const popupClose = document.querySelector('.popup-big-photo__close-button')
  const photoPopupTitle = document.querySelector('.popup-big-photo__text');
  
  photoPopupImage.src = photo.src;
  photoPopupTitle.textContent = photo.nextSibling.nextSibling.firstChild.nextSibling.textContent;

  photoPopup.classList.add('popup-big-photo_opened');

  popupClose.addEventListener('click', function(){
    photoPopup.classList.remove('popup-big-photo_opened');
  })  
}

function editProfile() {
    let editProfileButton = document.querySelector('.edit-button');
    let popup = document.querySelector('.popup-edit-profile');
    let popupClose = document.querySelector('.popup-edit-profile__close-button');

    editProfileButton.addEventListener('click', function(){
        popup.classList.add('popup_opened');
    })

    popupClose.addEventListener('click', function(){
        popup.classList.remove('popup_opened');
    })
}

function addCard() {
    let addCardButton = document.querySelector('.add-button');
    let popup = document.querySelector('.popup-create-card');
    let popupClose = document.querySelector('.popup-create-card__close-button');

    addCardButton.addEventListener('click', function(){
        popup.classList.add('popup_opened');
    })

    popupClose.addEventListener('click', function(){
        popup.classList.remove('popup_opened');
    })
}

function submiteditProfileForm() {
    // Находим форму в DOM
    let formElement = document.querySelector('.popup-edit-profile__form');
    // Находим поля формы в DOM
    let nameInput = document.querySelector('#name');
    let jobInput = document.querySelector('#profession');
    

    // Обработчик «отправки» формы, хотя пока
    // она никуда отправляться не будет
    function formSubmitHandler (evt) {
        evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

        let name = document.querySelector('.profile__title');
        let job = document.querySelector('.profile__subtitle');
        let popup = document.querySelector('.popup-edit-profile');

        name.textContent = nameInput.value;
        job.textContent = jobInput.value;
        popup.classList.remove('popup_opened');
    }

    // Прикрепляем обработчик к форме:
    // он будет следить за событием “submit” - «отправка»
    formElement.addEventListener('submit', formSubmitHandler); 
}

function submitAddCardForm() {
    // Находим форму в DOM
    let formElement = document.querySelector('.popup-create-card__form');
    // Находим поля формы в DOM
    let placeInput = document.querySelector('#place-name');
    let linkInput = document.querySelector('#place-link');
    let popup = document.querySelector('.popup-create-card');
    

    // Обработчик «отправки» формы, хотя пока
    // она никуда отправляться не будет
    function formSubmitHandler (evt) {
        evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

        createCard(linkInput.value, placeInput.value);
        
        popup.classList.remove('popup_opened');
    }

    // Прикрепляем обработчик к форме:
    // он будет следить за событием “submit” - «отправка»
    formElement.addEventListener('submit', formSubmitHandler); 
}

// Валидация формы

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('submit-button_inactive');
      } else {
    buttonElement.classList.remove('submit-button_inactive');
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));

    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });
  });
};

enableValidation();

// Конец валидации формы

editProfile();
submiteditProfileForm();
addCard();
submitAddCardForm();

initialCards.forEach((item) => {
    createCard(item.link, item.name);
})