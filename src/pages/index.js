
import Card from "../components/card.js";
import { FormValidator } from "../components/formValidator.js";
import { Section } from "../components/section.js";
import { initialCards, config } from "../utils/constants.js";
import { PopupWithImage } from '../components/popupWithImage.js';
import { PopupWithForm } from "../components/popupWithForm.js";
import { UserInfo } from "../components/userInfo.js";
import "../pages/index.css";

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

const addCardForm = popupCards.querySelector('.popup__form');
const editProfileForm = popupProfile.querySelector('.popup__form');

const editProfileValidator = new FormValidator(config, editProfileForm);
const addCardValidator = new FormValidator(config, addCardForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

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
    cardPopup.openPopup();
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
const createCard = (data) => {
    const card = new Card(data, ".template-card", () => {
        popupPic.openPopup(data.name, data.link);
    });
    const cardElement = card.createTemplateCard();
    return cardElement;
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
function handleCardAddSubmit(data) {
    const newCard = createCard({
        name: data["card"],
        link: data.link,
    });
    section.addItem(newCard);
    cardPopupCreate.closePopup();

}



const popupPic = new PopupWithImage('.popup_img')
const cardPopupCreate = new PopupWithForm('.popup_cards', handleCardAddSubmit);
const profilePopupEdit = new PopupWithForm('.popup_profile', handleProfileFormSubmite);

popupPic.setEventListeners();
cardPopupCreate.setEventListeners();
profilePopupEdit.setEventListeners();

const userInfo = new UserInfo({
    profileNameSelector: '.profile__title',
    profileJobSelector: '.profile__subtitle',
});


