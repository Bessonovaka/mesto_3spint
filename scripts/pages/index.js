import { Card } from '../components/Card.js';
import Section from '../components/Section.js';
import SubmitForm from '../components/SubmitForm.js';
import { initialCards, cardList, popupCreateCard } from '../utils/constants.js'
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

// создаём экземпляр формы
const formCreateCard = new SubmitForm({
  formSelector: '#form-create-card',
  handleFormSubmit: (formData) => {
    // при создании экземпляра Card передаём
    // ему объект с данными формы
        const card = new Card(formData, '#photo-grid-card');
    const cardElement = card.generateCard();
    cardList.prepend(cardElement);
    const popup = document.querySelector('.popup-create-card');
    popup.classList.remove('popup_opened');
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

function closePopup(closeBtn, popupOpenedClass, popup) {
  closeBtn.addEventListener('click', function(){
    popup.classList.remove(popupOpenedClass);
  });

  popup.addEventListener('click', function(evt){
    if (evt.target === popup) {
      popup.classList.remove(popupOpenedClass);
    }
  });

  document.addEventListener('keydown', function(evt){
    if (evt.key === 'Escape') {
      popup.classList.remove(popupOpenedClass);
    }
  });
}


function editProfile() {
  let editProfileButton = document.querySelector('.edit-button');
  let popup = document.querySelector('.popup-edit-profile');
  let popupClose = document.querySelector('.popup-edit-profile__close-button');

  editProfileButton.addEventListener('click', function(){
    popup.classList.add('popup_opened');
  })

  closePopup(popupClose, 'popup_opened', popup);
}

function addCard() {
  let addCardButton = document.querySelector('.add-button');
  let popup = document.querySelector('.popup-create-card');
  let popupClose = document.querySelector('.popup-create-card__close-button');

  addCardButton.addEventListener('click', function(){
    popup.classList.add('popup_opened');
  })

  closePopup(popupClose, 'popup_opened', popup);
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

editProfile();
//submiteditProfileForm();
addCard();

