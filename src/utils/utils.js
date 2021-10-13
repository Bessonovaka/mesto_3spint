
import { initialCards } from './constants.js';
import { Card } from '../components/Card.js';
import { cardList } from '../utils/constants.js';

export const renderElements = () => {
    initialCards.forEach((item) => {
      const card = new Card(item, '#photo-grid-card');
  
      const cardElement = card.generateCard();
      cardList.prepend(cardElement);
    });
};