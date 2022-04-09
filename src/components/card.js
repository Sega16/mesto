
export default class Card {
  constructor(data, selector, openPopupPic, handleDeleteClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;

    this._selector = selector;
    this._openPopupPic = openPopupPic;
    this._handleDeleteClick = handleDeleteClick;
  }

  // получение шаблона карточки
  _getTemplate() {
    const objectCard = document.
      querySelector(this._selector).
      content.querySelector('.card').
      cloneNode(true);
    return objectCard;
  }

  _setLikes() {
   const likeCountElement = this._item.querySelector('.card__like-count')
   likeCountElement.textContent = this._likes.length
  }

  // сборка шаблона карточки
  createTemplateCard() {
    this._item = this._getTemplate();

    this._item.querySelector('.card__text').textContent = this._name;
    this._imgCard = this._item.querySelector('.card__img');
    this._imgCard.src = this._link;
    this._imgCard.alt = this._name;

    this._like = this._item.querySelector('.card__like');
    this._delete = this._item.querySelector('.card__delete');

    this._addListeners();

    this._setLikes();

    return this._item;
  }

  // слушатели лайка удаления открытия карточки
  _addListeners() {
    this._imgCard.addEventListener('click', () => {
      this._openPopupPic(this._name, this._link);
    });
    this._like.addEventListener('click', () => {
      this._likeCard();
    });
    this._delete.addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });
  }

  // лайк карточки
  _likeCard() {
    this._like.classList.toggle('card__like_active');
  }

  // удаление карточки
  deleteCard() {
    this._item.remove();
    this._item = null;
  }
}

