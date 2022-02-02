
let content = document.querySelector('.content');

// ===========================================PROFILE VARIABLES===================================//
let profile = content.querySelector('.profile');
let btnEdit = profile.querySelector('.profile__btn-edit');
let profileName = profile.querySelector('.profile__title');
let profileAdout = profile.querySelector('.profile__subtitle');

// =========================================POPUP PROFILE VARIABLES================================//
let popup = document.querySelector('.popup');
let btnPopupClose = document.querySelector('.popup__close');
let popupName = popup.querySelector('.popup__input_type_name');
let popupAbout = popup.querySelector('.popup__input_type_about');
let popupForm = popup.querySelector('.popup__form');

// ========================================POPUP CARDS VARIABLES===================================//
let popupCards = document.querySelector('.popup_cards');
let btnPopupCloseCard = document.querySelector('.popup__close_card');
let btnAddCard = profile.querySelector('.profile__btn-add');
let popupCardInputTitle = document.querySelector('.popup__input_type_title');
let popupCardInputLink = document.querySelector('.popup__input_type_link');
let btnSaveCard = document.querySelector('.popup__btn_save_card');
let popupFormCards = popupCards.querySelector('.popup__form_cards');

// ======================================POPUP IMG VARIABLES========================================//
let popupImg = document.querySelector('.popup_img');
let popupimgView = document.querySelector('.popup_img-view');
let popupImgClose = document.querySelector('.popup__close_img');
let popupImgCaption = document.querySelector('.popup_img-caption');
// =============================================CARDS VARIABLES======================================//
let templateCard = document.querySelector('#template-card').content;
let cards = content.querySelector('.cards');

// ========================================DELETE AND LIKE CARD=====================================//

function addListeners(div, data) {
    div.querySelector('.card__delete').addEventListener('click', deleteCard);
    div.querySelector('.card__like').addEventListener('click', likeCard);
    div.querySelector('.card__img').addEventListener('click', function() {
        openPopupPic(data)
    } );
}
function deleteCard(evt) {
    evt.target.closest('.card').remove();
}
function likeCard(evt) {
    evt.target.closest('.card__like').classList.toggle('card__like_active');
}

// ==========================================TEMPLATE=============================================//

function render() {
    initialCards.forEach(stockeCards);

}
function stockeCards(text) {
    const startCard = templateCard.cloneNode(true);
    startCard.querySelector('.card__text').textContent = text.name;
    startCard.querySelector('.card__img').src = text.link;
    startCard.querySelector('.card__img').alt = text.name;
    addListeners(startCard, text);
    cards.append(startCard);

}
function addCard(evt) {
    evt.preventDefault();
    const newCard = templateCard.cloneNode(true);
    newCard.querySelector('.card__text').textContent = popupCardInputTitle.value;
    newCard.querySelector('.card__img').src = popupCardInputLink.value;
    addListeners(newCard);
    cards.prepend(newCard);
}

render();

// =======================================POPUPS=================================================

function editProfile() {
    popup.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupAbout.value = profileAdout.textContent;
}
function createCard() {
    popupCards.classList.add('popup_opened');
}

function openPopupPic(data) {
    popupImg.classList.add('popup_opened');
    popupimgView.src = data.link
    popupImgCaption.textContent = data.name
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileAdout.textContent = popupAbout.value;
    closePopup();
}
function closePopup() {
    popupImg.classList.remove('popup_opened');
    popupCards.classList.remove('popup_opened');
    popup.classList.remove('popup_opened');
}
// ===============================================HANDLERS==================================================
popupImgClose.addEventListener('click', closePopup);
popupFormCards.addEventListener('submit', addCard,);
btnAddCard.addEventListener('click', createCard);
btnEdit.addEventListener('click', editProfile);
popupForm.addEventListener('submit', formSubmitHandler);
btnPopupClose.addEventListener('click', closePopup);
btnPopupCloseCard.addEventListener('click', closePopup);
btnSaveCard.addEventListener('click', closePopup);
