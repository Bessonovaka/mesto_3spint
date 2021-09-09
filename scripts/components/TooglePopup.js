export default class TooglePopup {
    constructor( popupSelector, popupOpenBtn, popupCloseBtn ) {
        this._popupSelector = document.querySelector(popupSelector);
        this._popupOpenBtn = document.querySelector(popupOpenBtn);
        this._popupCloseBtn = document.querySelector(popupCloseBtn);
      }

    _openPopup() {
        this._popupOpenBtn.addEventListener('click', () => {
            this._popupSelector.classList.add('popup_opened');
        })
    }
    _closePopup() {
        this._popupCloseBtn.addEventListener('click', () => {
            this._popupSelector.classList.remove('popup_opened');
          });
        
          this._popupSelector.addEventListener('click', (evt) => {
            if (evt.target === this._popupSelector) {
                this._popupSelector.classList.remove('popup_opened');
            }
          });
        
          document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Escape') {
                this._popupSelector.classList.remove('popup_opened');
            }
          });
    }

    tooglePopup() {
        this._openPopup();
        this._closePopup();
    }
}