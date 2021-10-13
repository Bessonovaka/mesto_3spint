const photoPopup = document.querySelector('.popup-big-photo');
const photoPopupImage = document.querySelector('.popup-big-photo__image');
const photoPopupTitle = document.querySelector('.popup-big-photo__text');
const popupClose = document.querySelector('.popup-big-photo__close-button');

class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._title = data.name;
    this._image = data.link;
  }

  _handleOpenPopup() {
    photoPopupImage.src = this._element.firstChild.nextSibling.nextSibling.src;
    photoPopupTitle.textContent = this._element.lastChild.firstChild.textContent;
  
    photoPopup.classList.add('popup-big-photo_opened');
  }

  _handleClosePopup() {      
    photoPopup.classList.remove('popup-big-photo_opened');
  }

  _deleteCard(btn) {
    const card = btn.closest('.photo-grid__card');
    card.remove();
  }

  _likeDislike(btn) {
    btn.classList.toggle('like-button_fill_black');
}

  _setEventListeners() {
    this._element.addEventListener('click', (evt) => {
      if (!(evt.target.classList.contains('like-button')) && !(evt.target.classList.contains('delete-button'))) {
        this._handleOpenPopup();
      }
    });

    popupClose.addEventListener('click', () => {
      this._handleClosePopup();
    });

    this._element.querySelector('.delete-button').addEventListener('click', (evt) => {
        this._deleteCard(evt.target);
    });

    this._element.querySelector('.like-button').addEventListener('click', (evt) => {
        this._likeDislike(evt.target);

    });

  }
  
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.photo-grid__card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.photo-grid__img').src = this._image;
    this._element.querySelector('.photo-grid__title').textContent = this._title;

    return this._element;
  }
};


export { Card };