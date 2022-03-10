
 class Card {
    constructor(data, selector, openPopupPic) {
        this._name = data.name;
        this._link = data.link;
        this._selector = selector;
        this._openPopupPic = openPopupPic;
        
    }

    _getTemplate() {
        this._objectCard = document.
            querySelector('#template-card').
            content.querySelector('.card').
            cloneNode(true);

        return this._objectCard;
    }

    // шаблон карточки
    createTemplateCard() {
        this._item = this._getTemplate();

        this._item.querySelector('.card-text').textContent = this._name;
        this._imgCard = this._item.querySelector('.card-img');
        this._imgCard.src = this._link;
        this._imgCard.alt = this._name;
        _addListeners();
        return this._item;
    }


    // слушатели лайка удаления открытия карточки
    _addListeners() {
        this._imgCard.addEventListener('click', () => {
            this._openPopupPic(this._name, this._link);
        });
        this._item.addEventListener('click', (evt) => {
            this._likeCard(evt);
        });
        this._item.addEventListener('click', (evt) => {
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

export default {Card};