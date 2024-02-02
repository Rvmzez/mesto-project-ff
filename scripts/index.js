const cardTemplate = document.querySelector('#card-template').content;
const addButton = document.querySelector('.profile__add-button');
const placesList = document.querySelector('.places__list');

function createCard(initialCards) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__image').src = initialCards.link;
    cardElement.querySelector('.card__title').textContent = initialCards.name;

    deleteButton.addEventListener('click', () => {
        deleteCard(cardElement)
    })
    return cardElement
};

function deleteCard(cardElement) {
    cardElement.remove()
    };

initialCards.forEach((element) => {
    placesList.append(createCard(element))
});
       

