
import { Card } from "./card.js";
import { FormValidator, config } from "./formValidator.js";

const popupItem = Array.from(document.querySelectorAll('.popup'));

// ===========================================PROFILE VARIABLES===================================//

const profile = document.querySelector('.profile');
const btnEdit = profile.querySelector('.profile__btn-edit');
const btnAddCard = profile.querySelector('.profile__btn-add');
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

const cards = document.querySelector('.cards');
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

// ==========================================CARDS=============================================//

// создание карточки
function createCard(dataCard) {
    const templateCard = new Card(dataCard, '#template-card', openPopupPic)
    const objectCard = templateCard.createTemplateCard();
    return objectCard;
}

// получение списка начальных карточек
function render() {
    initialCards.forEach(renderCard);
}

// добавление новых карточек
function renderCard(item) {
    const cardItem = createCard(item)
    cards.prepend(cardItem);
}

// cохранение новой карточки
function addCard(evt) {
    evt.preventDefault();
    renderCard({ name: popupCardInputTitle.value, link: popupCardInputLink.value });
    closePopup(popupCards);
}

render();

// =======================================VALIDATION============================================

const addCardForm = popupCards.querySelector('.popup__form');
const editProfileForm = popupProfile.querySelector('.popup__form');

const editProfileValidator = new FormValidator(config, editProfileForm);
const addCardValidstor = new FormValidator(config, addCardForm);

editProfileValidator.enableValidation();
addCardValidstor.enableValidation();

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
    editProfileValidator.resetError();
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
function openPopupNewCard() {
    popupFormCards.reset();
    openPopup(popupCards);
}

// закрытие попапа новой карточки
function closePopupCard() {
    closePopup(popupCards);
}

// открытие попапа картинки
function openPopupPic(name, link) {
    openPopup(popupImg);
    popupimgView.src = link;
    popupImgCaption.textContent = name;
    popupimgView.alt = name;
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

btnAddCard.addEventListener('click', () => {
    addCardValidstor.resetError();
    addCardValidstor.disableSubmitButton();
    openPopupNewCard();
});
btnEdit.addEventListener('click', editProfile);
popupForm.addEventListener('submit', saveProfileInformation);
btnPopupImgClose.addEventListener('click', closePopupImg);
btnPopupProfileClose.addEventListener('click', closePopupProfile);
btnPopupCloseCard.addEventListener('click', closePopupCard);
popupFormCards.addEventListener('submit', addCard);

