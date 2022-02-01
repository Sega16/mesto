
let content = document.querySelector('.content');

// ===========================================PROFILE VARIABLES===================================//
let profile = content.querySelector('.profile');
let btnEdit = profile.querySelector('.profile__btn-edit');
let profileName = profile.querySelector('.profile__title');
let profileAdout = profile.querySelector('.profile__subtitle');

// =========================================POPUP PROFILE VARIABLES================================//
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let popupName = popup.querySelector('.popup__input_type_name');
let popupAbout = popup.querySelector('.popup__input_type_about');
let popupForm = popup.querySelector('.popup__form');

// ========================================POPUP CARDS VARIABLES===================================//
let popupCards = document.querySelector('.popup_cards');
let popupCloseCard = document.querySelector('.popup__close_card');
let btnAddCard = profile.querySelector('.profile__btn-add');
let popupCardTitle = document.querySelector('.popup__input_type_title');
let cardImg = document.querySelector('.popup__input_type_link');
let btnSaveCard = document.querySelector('.popup__btn_add_card');
let popupFormCards = popupCards.querySelector('.popup__form_cards');

// ======================================POPUP IMG VARIABLES========================================//
let popupImg = document.querySelector('.popup_img');
let popupimgView = document.querySelector('.popup_img-view');
let templateImg = document.querySelector('#template-img').content;
// =============================================CARDS VARIABLES======================================//
let templateCard = document.querySelector('#template-card').content;
let cards = content.querySelector('.cards');

// ========================================DELETE AND LIKE CARD=====================================//

function addListeners(div) {
    div.querySelector('.card__delete').addEventListener('click', deleteCard);
    div.querySelector('.card__like').addEventListener('click', likeCard);
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
    addListeners(startCard);
    cards.append(startCard);

}
function addCard(evt) {
    evt.preventDefault();
    const newCard = templateCard.cloneNode(true);
    newCard.querySelector('.card__text').textContent = popupCardTitle.value;
    newCard.querySelector('.card__img').src = cardImg.value;
    addListeners(newCard);
    cards.prepend(newCard);
}

render();

const cardPic = cards.querySelectorAll('.card__img');

const foto = document.querySelector('.card__img');

function renderPics() {
    cardPic.forEach(cardPics);
}

// ============================ВОТ ТУТ СИЖУ УЖЕ 2 ДНЯ=================================

function cardPics() {
    let foto = document.querySelector('.card__img');
    const popupPic = templateImg.cloneNode(true);
    popupPic.querySelector('.popup_img-view').src = foto.src;
    popupImg.append(popupPic);
    console.log(foto)
    
}

cardPics();

function openCardPic() {
    popupImg.classList.add('popup_opened');
}
foto.addEventListener('click', openCardPic);




// =======================================POPUPS=================================================

function editProfile() {
    popup.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupAbout.value = profileAdout.textContent;
}
function createCard() {
    popupCards.classList.add('popup_opened');
}

function openPopupPic() {
    popupImg.classList.add('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileAdout.textContent = popupAbout.value;
    closePopup();
}
function closePopup() {
    popupCards.classList.remove('popup_opened');
    popup.classList.remove('popup_opened');
}
// ===============================================HANDLERS==================================================


popupFormCards.addEventListener('submit', addCard,);
btnAddCard.addEventListener('click', createCard);
btnEdit.addEventListener('click', editProfile);
popupForm.addEventListener('submit', formSubmitHandler);
popupClose.addEventListener('click', closePopup);
popupCloseCard.addEventListener('click', closePopup);
btnSaveCard.addEventListener('click', closePopup);
