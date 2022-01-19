let content = document.querySelector('.content');
let profile = content.querySelector('.profile');

let btnEdit = profile.querySelector('.profile__btn-edit');
let profileName = profile.querySelector('.profile__title');
let profileAdout = profile.querySelector('.profile__subtitle');

let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__close');
let popupName = popup.querySelector('.popup__input_type_name');
let popupAbout = popup.querySelector('.popup__input_type_about');
let popupForm = popup.querySelector('.popup__form');

function popupOpened() {
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
btnEdit.addEventListener('click', popupOpened);
popupForm.addEventListener('submit', formSubmitHandler);
popupClose.addEventListener('click', closePopup);
