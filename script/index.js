
import Card from "./card.js";
console.log(Card)

const popupItem = Array.from(document.querySelectorAll('.popup'));

// ===========================================PROFILE VARIABLES===================================//

const profile = document.querySelector('.profile');
const btnEdit = profile.querySelector('.profile__btn-edit');
const profileName = profile.querySelector('.profile__title');
const profileAdout = profile.querySelector('.profile__subtitle');

// =========================================POPUP PROFILE VARIABLES================================//

const popupProfile = document.querySelector('.popup_profile');
const btnPopupProfileClose = document.querySelector('.popup__close_profile');
const popupName = document.querySelector('.popup__input_type_name');
const popupAbout = document.querySelector('.popup__input_type_about');
const popupForm = document.querySelector('.popup__form');

// ========================================POPUP CARDS VARIABLES===================================//

const popupCards = document.querySelector('.popup_cards');
const btnPopupCloseCard = document.querySelector('.popup__close_card');
const btnAddCard = profile.querySelector('.profile__btn-add');
const popupCardInputTitle = document.querySelector('.popup__input_type_title');
const popupCardInputLink = document.querySelector('.popup__input_type_link');
const btnSaveCard = document.querySelector('.popup__btn_save_card');
const popupFormCards = popupCards.querySelector('.popup__form_cards');

// ======================================POPUP IMG VARIABLES========================================//
const popupImg = document.querySelector('.popup_img');
const popupimgView = document.querySelector('.img-view');
const btnPopupImgClose = document.querySelector('.popup__close_img');
const popupImgCaption = document.querySelector('.img-caption');

// =============================================CARDS VARIABLES======================================//
const templateCard = document.querySelector('#template-card').content;
const cards = document.querySelector('.cards');


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
function createTemplateCard(dataCard) {
    const objectCard = templateCard.cloneNode(true);
    objectCard.querySelector('.card__text').textContent = dataCard.name;
    objectCard.querySelector('.card__img').src = dataCard.link;
    objectCard.querySelector('.card__img').alt = dataCard.name;
    addListeners(objectCard, dataCard);
    return objectCard;
}

// получение NodeList
function render() {
    initialCards.forEach((item) => renderCard(item));

}

// добавление новых карточек
function renderCard(dataCard) {
    cards.prepend(createTemplateCard(dataCard));
}

// Сохранение новой карточки
function addCard(evt) {
    evt.preventDefault();
    renderCard({ name: popupCardInputTitle.value, link: popupCardInputLink.value });
    closePopup(popupCards);
}

render();

// =======================================POPUPS=================================================


// открытие попапа 
function openPopup(popupProfile) {
    popupProfile.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}

// закрытие попапа
function closePopup(popupProfile) {
    popupProfile.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
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
    popupFormCards.reset();
    openPopup(popupCards);
    checkСonditionBtn(config, btnSaveCard, popupFormCards);
}

// закрытие попапа новой карточки
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


// закрытие попапа кликом по оверлею
popupItem.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(evt.target);
            evt.stopPropagation();
        };
    });
});

// закрытие попапа по нажатию Esc
function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
        evt.stopPropagation();
    };
}

btnAddCard.addEventListener('click', createCard);
btnEdit.addEventListener('click', editProfile);
popupForm.addEventListener('submit', saveProfileInformation);
btnPopupImgClose.addEventListener('click', closePopupImg);
btnPopupProfileClose.addEventListener('click', closePopupProfile);
btnPopupCloseCard.addEventListener('click', closePopupCard);
btnSaveCard.addEventListener('click', addCard);

