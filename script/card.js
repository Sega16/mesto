
class Card {
  constructor(data, selector, openPopupPic) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._openPopupPic = openPopupPic;

  }

  // получение шаблона карточки
  _getTemplate() {
    this._objectCard = document.
      querySelector('#template-card').
      content.querySelector('.card').
      cloneNode(true);
    return this._objectCard;
  }

  // сборка шаблона карточки
  createTemplateCard() {
    this._item = this._getTemplate();
    this._item.querySelector('.card__text').textContent = this._name;
    this._imgCard = this._item.querySelector('.card__img');
    this._imgCard.src = this._link;
    this._imgCard.alt = this._name;
    this._addListeners();
    return this._item;
  }

  // слушатели лайка удаления открытия карточки
  _addListeners() {
    this._imgCard.addEventListener('click', () => {
      this._openPopupPic(this._name, this._link);
    });
    this._item.querySelector('.card__like').addEventListener('click', (evt) => {
      this._likeCard(evt);
    });
    this._item.querySelector('.card__delete').addEventListener('click', (evt) => {
      this._deleteCard(evt);
    })
  }

  // лайк карточки
  _likeCard(evt) {
    evt.target.closest('.card__like').classList.toggle('card__like_active');
  }

  // удаление карточки
  _deleteCard() {
    this._item.remove();
  }
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Нижний Тагил',
    link: './images/Tagil.jpg'
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
    name: 'Рейнисфияра',
    link: './images/Black-beach.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export { Card, initialCards };