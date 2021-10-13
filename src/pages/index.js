import { Card } from '../components/Card.js';
import Section from '../components/Section.js';
import SubmitForm from '../components/SubmitForm.js';
import TooglePopup from '../components/TooglePopup.js';
import ValidationForm from '../components/ValidationForm.js';
import { initialCards, cardList, popupCreateCard, popupEditProfile, validationData } from '../utils/constants.js'

import './index.css';

// Создание карточек — ООП

const cards = new Section({ 
  data: initialCards,
  renderer: (cardItem) => {
      const card = new Card(cardItem, '#photo-grid-card');

      const cardElement = card.generateCard();
      
      cards.setItem(cardElement);
  },
},
 cardList
);

cards.renderItems();

// Создаём форму createCard

// создаём экземпляр формы
const formCreateCard = new SubmitForm({
  formSelector: '#form-create-card',
  handleFormSubmit: (formData) => {
    // при создании экземпляра Card передаём
    // ему объект с данными формы
        const card = new Card(formData, '#photo-grid-card');
    const cardElement = card.generateCard();
    cardList.prepend(cardElement);
    popupCreateCard.classList.remove('popup_opened');
  }
});

// генерируем разметку формы
const formElement = formCreateCard.generateForm();

// инициализируем класс, ответственный
// за добавление формы на страницу
const formRenderer = new Section({
    data: []
}, popupCreateCard);

// добавляем форму на страницу
formRenderer.setItem(formElement); 

// Создаём форму editProfile

// создаём экземпляр формы
const formEditProfile = new SubmitForm({
  formSelector: '#form-edit-profile',
  handleFormSubmit: (formData) => {
    const name = document.querySelector('.profile__title');
    const job = document.querySelector('.profile__subtitle');
    
    name.textContent = formData.name;
    job.textContent = formData.profession;
    popupEditProfile.classList.remove('popup_opened');
  }
});

// генерируем разметку формы
const formEditProfileElement = formEditProfile.generateForm();

// инициализируем класс, ответственный
// за добавление формы на страницу
const formEditProfileRenderer = new Section({
    data: []
}, popupEditProfile);

// добавляем форму на страницу
formEditProfileRenderer.setItem(formEditProfileElement); 

// конец создания EditProfile

const editProfile = new TooglePopup('.popup-edit-profile', '.edit-button', '.popup-edit-profile__close-button');
editProfile.tooglePopup();

const addCard = new TooglePopup('.popup-create-card', '.add-button', '.popup-create-card__close-button');
addCard.tooglePopup();

const validationForm = new ValidationForm(validationData);
validationForm.enableValidation();