function likeDislike(x) {
    x.classList.toggle('like-button_fill_black');
}

function editProfile() {
    let editProfileButton = document.querySelector('.edit-button');
    let popup = document.querySelector('.popup');

    editProfileButton.addEventListener('click', function(){
        popup.classList.add('popup_opened');
    })
}

function closeForm() {
    let popupClose = document.querySelector('.close-button');

    popupClose.addEventListener('click', function(){
        popup.classList.remove('popup_opened');
    })
}

function submiteditProfileForm() {
    // Находим форму в DOM
    let formElement = document.querySelector('.popup__container');
    // Находим поля формы в DOM
    let nameInput = document.querySelector('#name');
    let jobInput = document.querySelector('#profession');
    

    // Обработчик «отправки» формы, хотя пока
    // она никуда отправляться не будет
    function formSubmitHandler (evt) {
        evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

        let name = document.querySelector('.profile__title');
        let job = document.querySelector('.profile__subtitle');
        let popup = document.querySelector('.popup');

        name.textContent = nameInput.value;
        job.textContent = jobInput.value;
        popup.classList.remove('popup_opened');
    }

    // Прикрепляем обработчик к форме:
    // он будет следить за событием “submit” - «отправка»
    formElement.addEventListener('submit', formSubmitHandler); 
}

editProfile();
closeForm();
submiteditProfileForm();