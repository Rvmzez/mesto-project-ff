(()=>{"use strict";var e=[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}];function t(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o)}function n(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o)}function o(e){"Escape"===e.key&&n(document.querySelector(".popup_is-opened"))}var r=document.querySelector("#card-template").content;function c(e,t,n,o){var c=r.querySelector(".card").cloneNode(!0),p=c.querySelector(".card__delete-button"),u=c.querySelector(".card__like-button"),a=c.querySelector(".card__image");return a.src=e.link,a.alt=e.name,c.querySelector(".card__title").textContent=e.name,p.addEventListener("click",(function(){t(c)})),u.addEventListener("click",(function(){n(u)})),a.addEventListener("click",(function(){o(e)})),c}function p(e){e.classList.toggle("card__like-button_is-active")}function u(e){e.remove()}var a=document.querySelector(".places__list"),d=document.querySelector(".profile__edit-button"),i=document.querySelector(".profile__add-button"),s=document.querySelectorAll(".popup"),l=document.querySelector(".popup_type_edit"),_=document.querySelector(".popup_type_new-card"),m=document.querySelector(".popup_type_image"),y=m.querySelector(".popup__image"),v=m.querySelector(".popup__caption"),f=document.querySelector(".popup__input_type_name"),k=document.querySelector(".popup__input_type_description"),q=document.querySelector(".profile__title"),S=document.querySelector(".profile__description"),L=document.querySelector(".popup__input_type_card-name"),g=document.querySelector(".popup__input_type_url"),h=document.querySelector(".popup__form"),x=_.querySelector(".popup__form");e.forEach((function(e){a.append(c(e,u,p,C))})),s.forEach((function(e){e.classList.add("popup_is-animated")})),d.addEventListener("click",(function(){f.value=q.textContent,k.value=S.textContent,t(l)})),i.addEventListener("click",(function(){return t(_)})),h.addEventListener("submit",(function(e){var t,o;e.preventDefault(),t=f.value,o=k.value,q.textContent=t,S.textContent=o,h.reset(),f.value=q.textContent,k.value=S.textContent,n(l)})),x.addEventListener("submit",(function(t){var o;t.preventDefault(),o=c({name:L.value,link:g.value,alt:L.value},u,p,C),a.children.length<e.length?a.append(o):a.prepend(o),x.reset(),n(_)}));for(var E=function(e){s[e].addEventListener("click",(function(t){(t.target.classList.contains("popup__close")||t.target.classList.contains("popup"))&&n(s[e])}))},b=0;b<s.length;b++)E(b);function C(e){y.src=e.link,y.alt=e.name,v.textContent=e.name,m.classList.add("popup_is-animated"),m.classList.add("popup_is-opened"),document.addEventListener("keydown",o)}})();