
import { Card } from "../components/card.js";
import { FormValidator } from "../components/formValidator.js";
import { Section } from "../components/section.js";
import { initialCards, config } from "../utils/constants.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/popupWithForm.js";
import { UserInfo } from "../components/userInfo.js";
import "../pages/index.css";

// ===========================================PROFILE VARIABLES===================================//

const profile = document.querySelector('.profile');
const btnEdit = profile.querySelector('.profile__btn-edit');
const btnAddCard = profile.querySelector('.profile__btn-add');
const profileName = profile.querySelector('.profile__title');
const profileAdout = profile.querySelector('.profile__subtitle');

// =========================================POPUP PROFILE VARIABLES================================//

const popupProfile = document.querySelector('.popup_profile');
const popupName = document.querySelector('.popup__input_type_name');
const popupAbout = document.querySelector('.popup__input_type_about');
const popupForm = document.querySelector('.popup__form');

// ========================================POPUP CARDS VARIABLES===================================//

const popupCards = document.querySelector('.popup_cards');

// ======================================POPUP IMG VARIABLES========================================//

const popupImg = document.querySelector('.popup_img');

// =====================================POPUPS=======================================================//

// открытие попапа профиля
btnEdit.addEventListener('.click', () => {
    const { name, job } = userInfo.getUserInfo();
    popupName.value = name;
    popupAbout.value = job;
    editProfileValidator.disableSubmitButton();
    profilePopupEdit.openPopup();
})

// открытие попапа новой карточки
btnAddCard.addEventListener('.click', () => {
    addCardValidator.resetError();
    addCardValidator.disableSubmitButton();
    cardPopupCreate.openPopup();
})

// ==========================================PROFILE===============================================//

// редактирование имени
const handleProfileFormSubmite = (data) => {
    const { name, job } = data;
    userInfo.setUserinfo(name, job);
    profilePopupEdit.closePopup();
}

// ==========================================CARDS=============================================//

// создание карточки
function createCard(dataCard) {
    const templateCard = new Card(dataCard, '#template-card', () => {
        popupPic.openPopup(dataCard.name, dataCard.link);
    });
    const objectCard = templateCard.createTemplateCard();
    return objectCard;
}

// получение списка начальных карточек
const section = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            const cardElement = createCard(item);
            section.addItem(cardElement);
        },
    },
    ".cards"
);
section.renderItems();

// создание и сохранение новой карточки
function handleCardAddSubmite(data) {
    const newCard = createCard({
        name: data["card"],
        link: data.link,
    });
    section.addItem(newCard);
    cardPopupCreate.closePopup();
}

const popupPic = new PopupWithImage(popupImg)
const cardPopupCreate = new PopupWithForm(popupCards, handleCardAddSubmite);
const profilePopupEdit = new PopupWithForm(popupProfile, handleProfileFormSubmite);

popupPic.setEventListeners();
cardPopupCreate.setEventListeners();
profilePopupEdit.setEventListeners();

const userInfo = new UserInfo({
    profileNameSelector: profileName,
    profileJobSelector: profileAdout,
});

// =======================================VALIDATION============================================

const addCardForm = popupCards.querySelector('.popup__form');
const editProfileForm = popupProfile.querySelector('.popup__form');

const editProfileValidator = new FormValidator(config, editProfileForm);
const addCardValidator = new FormValidator(config, addCardForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
