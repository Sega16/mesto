let content = document.querySelector('.content');
let profile = content.querySelector('.profile');

let btnEdit = profile.querySelector('.profile__btn-edit');
let profileName = profile.querySelector('.profile__title');
let profileAdout = profile.querySelector('.profile__subtitle');

let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__close');
let popupBtnSave = popup.querySelector('.popup__btn');
let popupName = popup.querySelector('div.popup__cover div.popup__container form.popup__form .popup__input_name');
let popupAbout = popup.querySelector('div.popup__cover div.popup__container form.popup__form .popup__input_about');
let popupForm = popup.querySelector('div.popup__cover div.popup__container form.popup__form');

let cards = content.querySelector('.cards');
let card = cards.querySelector('.card');
let likeBtnAll = card.querySelector('.card__like');

function PopupOpened() {
    popup.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupAbout.value = profileAdout.textContent;
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileAdout.textContent = popupAbout.value;
    closePopup();
}
function closePopup() {
    popup.classList.remove('popup_opened');
}
btnEdit.addEventListener('click', PopupOpened);
popupForm.addEventListener('submit', formSubmitHandler);
popupClose.addEventListener('click', closePopup);
