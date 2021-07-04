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

editProfile();
submiteditProfileForm();
addCard();
submitAddCardForm();

initialCards.forEach((item) => {
    createCard(item.link, item.name);
})