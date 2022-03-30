
export default class Card {
  constructor(data, selector, openPopupPic) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._openPopupPic = openPopupPic;
  }

  // получение шаблона карточки
  _getTemplate() {
    const objectCard = document.
      querySelector(this._selector).
      content.querySelector('.card').
      cloneNode(true);
    return objectCard;
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
    return this._item;
  }

  // слушатели лайка удаления открытия карточки
  _addListeners() {
    this._imgCard.addEventListener('click', () => {
      this._openPopupPic(this._name, this._link);
    });
    this._like.addEventListener('click', (evt) => {
      this._likeCard(evt);
    });
    this._delete.addEventListener('click', (evt) => {
      this._deleteCard(evt);
    })
  }

  // лайк карточки
  _likeCard() {
    this._like.classList.toggle('card__like_active');
  }

  // удаление карточки
  _deleteCard() {
    this._item.remove();
    this._item = null;
  }
}

