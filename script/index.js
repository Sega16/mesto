let content = document.querySelector('.content');
let profile = content.querySelector('.profile');

let btnEdit = profile.querySelector('.profile__btn-edit');
let profileName = profile.querySelector('.profile__title');
let profileAdout = profile.querySelector('.profile__subtitle');

let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__close');
let nameInput = popup.querySelector('.popup__name');
let aboutInput = popup.querySelector('.popup__about');
let popupBtnSave = popup.querySelector('.popup__btn')

let cards = content.querySelector('.cards');
let card = cards.querySelector('.card');
let likeBtnAll = card.querySelector('.card__like');

function likeActive() {
    likeBtnAll.classList.add('card__like_active');
}
likeBtnAll.addEventListener('click', likeActive);

function PopupOpened() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAdout.textContent;
}
btnEdit.addEventListener('click', PopupOpened);

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAdout.textContent = aboutInput.value;
}
popupBtnSave.addEventListener('submit', formSubmitHandler);
popupBtnSave.addEventListener('click', closePopup);
popupBtnSave.addEventListener('click', formSubmitHandler);

function closePopup() {
    popup.classList.remove('popup_opened');
}
popupClose.addEventListener('click', closePopup);
