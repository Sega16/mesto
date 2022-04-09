
import Card from "../components/card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { initialCards, config } from "../utils/constants.js";
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import "../pages/index.css";
import { api } from "../components/Api.js";

// ===========================================PROFILE VARIABLES===================================//

const profile = document.querySelector('.profile');
const btnEdit = profile.querySelector('.profile__btn-edit');
const btnAddCard = profile.querySelector('.profile__btn-add');

// =========================================POPUP PROFILE VARIABLES================================//

const popupProfile = document.querySelector('.popup_profile');
const popupName = document.querySelector('.popup__input_type_name');
const popupAbout = document.querySelector('.popup__input_type_about');

// ========================================POPUP CARDS VARIABLES===================================//

const popupCards = document.querySelector('.popup_cards');


// =======================================VALIDATION============================================

const cardAddForm = popupCards.querySelector('.popup__form');
const editProfileForm = popupProfile.querySelector('.popup__form');

const editProfileValidator = new FormValidator(config, editProfileForm);
const addCardValidator = new FormValidator(config, cardAddForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

// =====================================POPUPS=======================================================//

// открытие попапа профиля
btnEdit.addEventListener('click', () => {
    const { name, job } = userInfo.getUserInfo();
    popupName.value = name;
    popupAbout.value = job;
    editProfileValidator.disableSubmitButton();
    profilePopupEdit.openPopup();
})

// открытие попапа новой карточки
btnAddCard.addEventListener('click', () => {
    addCardValidator.resetError();
    addCardValidator.disableSubmitButton();
    cardPopupCreate.openPopup();
})

// ==========================================PROFILE===============================================//
api.getProfile()
    .then(res => {
        userInfo.setUserInfo(res.name, res.about)
    })

// редактирование имени
const handleProfileFormSubmite = (data) => {
    const { name, job } = data;
    api.editProfile(name, job)
        .then(res => {
            userInfo.setUserInfo(res.name, res.job);
            profilePopupEdit.closePopup();
        })
}

// ==========================================CARDS=============================================//


api.getCards()
    .then(cardList => {
        cardList.forEach(data => {
            const newCard = createCard({
                name: data.name,
                link: data.link,
                likes: data.likes,
                id: data.id
            })
            section.addItem(newCard)
        });

    })

// создание карточки
const createCard = (data) => {
    const card = new Card(
        data,
        '.template-card',
        () => {
            popupPic.openPopup(data.name, data.link);
        }
    );
    (id) => {
        confirmPopup.openPopup();
        confirmPopup.changeSubmitHandler(() => {
            api.deleteCard(id)
            .then(res => {
                card.deleteCard();
                confirmPopup.closePopup();
            })
        })
    }
    const cardElement = card.createTemplateCard();
    return cardElement;
}

// получение списка начальных карточек
const section = new Section({
    items: [], renderer: (item) => { const cardElement = createCard(item); section.addItem(cardElement); },
},
    ".cards"
);
section.renderItems();

// создание и сохранение новой карточки
function handleCardAddSubmit(data) {
    api.addCard(data['card'], data.link)
        .then(res => {
            const newCard = createCard({
                name: res.name,
                link: res.link,
                likes: res.likes,
                id: res._id
            });
            section.addItem(newCard);
            cardPopupCreate.closePopup();
        })
}

const popupPic = new PopupWithImage('.popup_img')
const cardPopupCreate = new PopupWithForm('.popup_cards', handleCardAddSubmit);
const profilePopupEdit = new PopupWithForm('.popup_profile', handleProfileFormSubmite);
const confirmPopup = new PopupWithForm('.popup_cards_delete-confirm');

popupPic.setEventListeners();
cardPopupCreate.setEventListeners();
profilePopupEdit.setEventListeners();
confirmPopup.setEventListeners();

const userInfo = new UserInfo({
    profileNameSelector: '.profile__title',
    profileJobSelector: '.profile__subtitle',
});


