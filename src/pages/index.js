
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { config } from "../utils/constants.js";
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import "../pages/index.css";
import { api } from "../components/Api.js";

let userId;
let urlAvatar;
// ===========================================PROFILE VARIABLES===================================//

const profile = document.querySelector('.profile');
const btnEdit = profile.querySelector('.profile__btn-edit');
const btnAddCard = profile.querySelector('.profile__btn-add');

// =========================================POPUP PROFILE VARIABLES================================//

const popupProfile = document.querySelector('.popup_profile');
const popupName = document.querySelector('.popup__input_type_name');
const popupAbout = document.querySelector('.popup__input_type_about');
const avatarPopupEdit = document.querySelector('.popup_avatar');
const avatarFormEdit = avatarPopupEdit.querySelector('.popup__form');

// ========================================POPUP CARDS VARIABLES===================================//

const popupCards = document.querySelector('.popup_cards');

// =======================================VALIDATION============================================

const cardAddForm = popupCards.querySelector('.popup__form');
const editProfileForm = popupProfile.querySelector('.popup__form');

const editProfileValidator = new FormValidator(config, editProfileForm);
const addCardValidator = new FormValidator(config, cardAddForm);
const avatarValidatorEdit = new FormValidator(config, avatarFormEdit);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
avatarValidatorEdit.enableValidation();

// =====================================POPUPS=======================================================//

// открытие попапа профиля
btnEdit.addEventListener('click', () => {
    const { name, job } = userInfo.getUserInfo();
    popupName.value = name;
    popupAbout.value = job;
    addCardValidator.resetValidation();
    profilePopupEdit.openPopup();
})

// открытие попапа новой карточки
btnAddCard.addEventListener('click', () => {
    addCardValidator.resetValidation();
    cardPopupCreate.openPopup();
})

// ==========================================PROFILE===============================================//

Promise.all([api.getProfile(), api.getCards()])
    .then(([userData, cards]) => {
        userInfo.setUserInfo(userData.name, userData.about);
        userInfo.setUseravatar(userData.avatar);
        userId = userData._id;
        const usersCards = [];
        usersCards.reverse();
        section.renderItems(cards.reverse());
    })
    .catch(err => console.log(err));

// api.getProfile()
//     .then(res => {
//         userInfo.setUserInfo(res.name, res.about)
//         userInfo.setUseravatar(res.avatar)
//         userId = res._id
//     }).catch(console.log);

//     api.getCards()
//     .then(cardList => {
//         cardList.forEach(data => {
//             const newCard = createCard({
//                 name: data.name,
//                 link: data.link,
//                 likes: data.likes,
//                 id: data._id,
//                 userId: userId,
//                 ownerId: data.owner._id,
//                 avatar: data.avatar
//             })
// section.addItem(newCard);
//         });
//     }).catch(console.log);


// получение списка начальных карточек
const section = new Section(
    {
        items: [],
        renderer: (item) => {
            const cardElement = createCard(item);
            section.addItem(cardElement);
        },
    },
    ".cards",

)

// редактирование аватара
function submitEditAvatarForm(avatar) {
    popupAvatar.renderLoading(true);
    api.updateAvatar(avatar.link)
        .then((res) => {
            userInfo.setUserInfo(res.name, res.about);
            userInfo.setUseravatar(res.avatar);
            popupAvatar.closePopup();
        }).catch(console.log)
        .finally(() => {
            popupAvatar.renderLoading(false);
        });
}

// редактирование имени
const handleProfileFormSubmite = (data) => {
    const { name, job } = data;
    profilePopupEdit.renderLoading(true);
    api.editProfile(name, job)
        .then(res => {
            userInfo.setUserInfo(res.name, res.about);
            profilePopupEdit.closePopup();
        }).catch(console.log)
        .finally(() => {
            profilePopupEdit.renderLoading(false);
        });
}

const userInfo = new UserInfo({
    profileNameSelector: '.profile__title',
    profileJobSelector: '.profile__subtitle',
    profileAvatarSelector: '.profile__avatar'
});
// ==========================================CARDS=============================================//

// создание карточки
function createCard(data) {
    const card = new Card( data
        , '.template-card',
        () => {
            popupPic.openPopup(data.name, data.link);
        },
        (id) => {
            confirmPopup.openPopup();
            confirmPopup.changeSubmitHandler(() => {
                api.deleteCard(id)
                    .then(res => {
                        card.deleteCard();
                        confirmPopup.closePopup();
                    }).catch(console.log);
            });
        },
        (id) => {
            console.log('like')
            if (card.isLiked()) {
                api.deleteLike(id)
                    .then(res => {
                        card.setLikes(res.likes);
                    });
            }
            else {
                api.addLike(id)
                    .then(res => {
                        card.setLikes(res.likes);
                    }).catch(console.log);
            }
        }
    );
    const cardElement = card.createTemplateCard();
    return cardElement;
}

// создание и сохранение новой карточки
function handleCardAddSubmit(data) {
    cardPopupCreate.renderLoading(true);
    api.addCard(data["card"], data.link)
        .then((res) => {
            const newCard = createCard({
                name: res.name,
                link: res.link,
                likes: res.likes,
                id: res._id,
                userId: userId,
                ownerId: res.owner._id,
                avatar: res.avatar
            });
            section.addItem(newCard);
            cardPopupCreate.closePopup();
        }).catch(console.log)
        .finally(() => {
            cardPopupCreate.renderLoading(false);
        });
}



const popupPic = new PopupWithImage('.popup_img')
const cardPopupCreate = new PopupWithForm('.popup_cards', handleCardAddSubmit);
const profilePopupEdit = new PopupWithForm('.popup_profile', handleProfileFormSubmite);
const confirmPopup = new PopupWithForm('.popup_cards_delete-confirm');
const popupAvatar = new PopupWithForm(".popup_avatar", submitEditAvatarForm);
const avatarEditButton = document.querySelector('.profile__wrapper');

avatarEditButton.addEventListener('click', () => {
    avatarValidatorEdit.resetValidation();
    popupAvatar.openPopup();
})

popupAvatar.setEventListeners();
popupPic.setEventListeners();
cardPopupCreate.setEventListeners();
profilePopupEdit.setEventListeners();
confirmPopup.setEventListeners();