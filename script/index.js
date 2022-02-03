
const content = document.querySelector('.content');
const popup = document.querySelector('.popup');
// ===========================================PROFILE VARIABLES===================================//

const profile = content.querySelector('.profile');
const btnEdit = profile.querySelector('.profile__btn-edit');
const profileName = profile.querySelector('.profile__title');
const profileAdout = profile.querySelector('.profile__subtitle');

// =========================================POPUP PROFILE VARIABLES================================//

const popupProfile = document.querySelector('.popup_profile');
const btnPopupProfileClose = document.querySelector('.popup__close_profile');
const popupName = popup.querySelector('.popup__input_type_name');
const popupAbout = popup.querySelector('.popup__input_type_about');
const popupForm = popup.querySelector('.popup__form');

// ========================================POPUP CARDS VARIABLES===================================//

const popupCards = document.querySelector('.popup_cards');
const btnPopupCloseCard = document.querySelector('.popup__close_card');
const btnAddCard = profile.querySelector('.profile__btn-add');
const popupCardInputTitle = document.querySelector('.popup__input_type_title');
const popupCardInputLink = document.querySelector('.popup__input_type_link');
const btnSaveCard = document.querySelector('.popup__btn_save_card');
const popupFormCards = popupCards.querySelector('.popup__form_cards');

// ======================================POPUP IMG VARIABLES========================================//
<<<<<<< HEAD
let popupImg = document.querySelector('.popup_img');
let popupimgView = document.querySelector('.img-view');
let popupImgClose = document.querySelector('.popup__close_img');
let popupImgCaption = document.querySelector('.img-caption');
=======

const popupImg = document.querySelector('.popup_img');
const popupimgView = document.querySelector('.popup_img-view');
const btnPopupImgClose = document.querySelector('.popup__close_img');
const popupImgCaption = document.querySelector('.popup_img-caption');
>>>>>>> develop
// =============================================CARDS VARIABLES======================================//
const templateCard = document.querySelector('#template-card').content;
const cards = content.querySelector('.cards');


// ========================================DELETE AND LIKE CARD=====================================//

// слушатели удаления, лайка и выбора картинки
function addListeners(card, data) {
    card.querySelector('.card__delete').addEventListener('click', deleteCard);
    card.querySelector('.card__like').addEventListener('click', likeCard);
    card.querySelector('.card__img').addEventListener('click', function () {
        openPopupPic(data)
    });
}
// удаление карточки
function deleteCard(evt) {
    evt.target.closest('.card').remove();
}
// лайк карточки
function likeCard(evt) {
    evt.target.closest('.card__like').classList.toggle('card__like_active');
}

// ==========================================TEMPLATE=============================================//


// шаблон создания карточки
function newCard(text) {
    const objectCard = templateCard.cloneNode(true);
    objectCard.querySelector('.card__text').textContent = text.name;
    objectCard.querySelector('.card__img').src = text.link;
    objectCard.querySelector('.card__img').alt = text.name;
    addListeners(objectCard, text);
    return objectCard;
}
// получение NodeList
function render() {
    initialCards.forEach(stockeCards);

}
// создние стартовых карточек
function stockeCards(text) {
    cards.prepend(newCard(text));
}


// Сохранение новой карточки
function addCard(evt) {
    evt.preventDefault();
    stockeCards({ name: popupCardInputTitle.value, link: popupCardInputLink.value });
    closePopup(popupCards);
}
render();
// =======================================POPUPS=================================================


// открытие попапа 
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

// закрытие попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

// открытие попапа профиля
function editProfile() {
    openPopup(popupProfile);
    popupName.value = profileName.textContent;
    popupAbout.value = profileAdout.textContent;
}

// закрытие попапа профиля
function closePopupProfile() {
    closePopup(popupProfile);
}

// сохранение данных профиля
function saveProfileInformation(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileAdout.textContent = popupAbout.value;
    closePopup(popupProfile);
}

// открытие попапа новой карточки
function createCard() {
    popupCardInputLink.value = "";
    popupCardInputTitle.value = "";
    openPopup(popupCards);
}

// закрфтие попапа новой карточки
function closePopupCard() {
    closePopup(popupCards);
}

// открытие попапа картинки
function openPopupPic(data) {
    openPopup(popupImg);
    popupimgView.src = data.link;
    popupImgCaption.textContent = data.name;
    popupimgView.alt = data.name;
}

// закрытие попапа картинки 
function closePopupImg() {
    closePopup(popupImg);
}

// ===============================================HANDLERS==================================================

btnAddCard.addEventListener('click', createCard);
btnEdit.addEventListener('click', editProfile);
popupForm.addEventListener('submit', saveProfileInformation);
btnPopupImgClose.addEventListener('click', closePopupImg);
btnPopupProfileClose.addEventListener('click', closePopupProfile);
btnPopupCloseCard.addEventListener('click', closePopupCard);
btnSaveCard.addEventListener('click', addCard);