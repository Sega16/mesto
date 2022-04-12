
export class Card {
  constructor(data, selector, openPopupPic, handleDeleteClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._selector = selector;
    this._openPopupPic = openPopupPic;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  // получение шаблона карточки
  _getTemplate() {
    const objectCard = document.
      querySelector(this._selector).
      content.querySelector('.card').
      cloneNode(true);
    return objectCard;
  }

  isLiked() {
    const userlikedCard = this._likes.find(user => user._id === this._userId);
    return userlikedCard;
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this._likeCountElement = this._item.querySelector('.card__like-count')
    this._likeCountElement.textContent = this._likes.length;
    if(this.isLiked()) {
      this._fillLike();
    } else {
      this._addLike();
    }
  }

  // сборка шаблона карточки
  createTemplateCard() {  
    this._item = this._getTemplate();
    this._item.querySelector('.card__text').textContent = this._name;
    this._imgCard = this._item.querySelector('.card__img');
    this._imgCard.src = this._link;
    this._imgCard.alt = this._name;
    this._like = this._item.querySelector('.card__like');
    this._addListeners();
    this.setLikes(this._likes);
    if(this._ownerId !== this._userId) {
      this._item.querySelector('.card__delete').style.display = 'none';
    }
    return this._item;
  }

  // слушатели лайка удаления открытия карточки
  _addListeners() {
    this._imgCard.addEventListener('click', () => {
      this._openPopupPic(this._name, this._link);
    });
    this._like.addEventListener('click', () => {
      this._handleLikeClick(this._id);
    });
    this._item.querySelector('.card__delete').addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });
  }

  // управление лайком карточки
  _fillLike() {
    this._like.classList.add('card__like_active');
  }
  _addLike() {
    this._like.classList.remove('card__like_active');
  }

  // удаление карточки
  deleteCard() {
    this._item.remove();
    this._item = null;
  }
}

