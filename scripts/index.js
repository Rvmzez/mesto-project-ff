const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const addButton = document.querySelector('.profile__add-button');

const createCard = initialCards.map(function (item) {
    return {
        name: item.name,
        link: item.link
    }
});

function render () {
    initialCards.forEach(renderCard)
};

function renderCard ({name, link}) {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;

    placesList.append(cardElement)
};

render();

document.querySelector('.page__content').onclick = function (delBtn) {
    if(delBtn.target.className != 'card__delete-button') return
    const crdTmpl = delBtn.target.closest('.places__item')
       crdTmpl.remove()
    }