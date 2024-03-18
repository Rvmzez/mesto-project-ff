(()=>{"use strict";function e(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";t.textContent=e?r:n}function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function n(e,n){return fetch(e,n).then(t)}var r={baseUrl:"https://nomoreparties.co/v1/wff-cohort-8",headers:{authorization:"515aac65-b974-45c4-ba8b-ae42da887315","Content-Type":"application/json"}},o=function(e){return n("".concat(r.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:r.headers})},c={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",inputErrorActive:"popup__input-error_active",errorClass:"popup__error_visible",formSubmitInactive:"form__submit_inactive"};function a(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",u)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u)}function u(e){"Escape"===e.key&&i(document.querySelector(".popup_is-opened"))}var l=document.querySelector("#card-template").content;function s(e,t,n,r,o,c,a){var i=l.querySelector(".card").cloneNode(!0),u=i.querySelector(".card__delete-button"),s=i.querySelector(".card__like-button"),d=i.querySelector(".card__image"),p=i.querySelector(".card__like-vision");return d.src=e.link,d.alt=e.name,i.querySelector(".card__title").textContent=e.name,p.textContent=e.likes.length,e.owner._id!==r?u.remove():u.addEventListener("click",(function(){o(e._id).then((function(){t(i)})).catch((function(e){console.log(e)}))})),e.likes.some((function(e){e._id===r?s.classList.add("card__like-button_is-active"):s.classList.remove("card__like-button_is-active")})),s.addEventListener("click",(function(t){t.target.classList.contains("card__like-button_is-active")?a(t,e._id):c(t,e._id)})),d.addEventListener("click",(function(){n(e)})),i}function d(e){e.classList.toggle("card__like-button_is-active")}function p(e){e.remove()}function f(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.inputErrorActive),r.textContent=""}function m(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));_(n,e.querySelector(t.submitButtonSelector),t),n.forEach((function(n){f(e,n,t)}))}function _(e,t,n){(function(e,t){return e.some((function(e){return!e.validity.valid}))})(e)||function(e,t){return e.some((function(e){return e.validity.patternMismatch}))}(e)?v(t,n):(t.disabled=!1,t.classList.remove(n.formSubmitInactive))}function v(e,t){e.disabled=!0,e.classList.add(t.formSubmitInactive)}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var h,b=document.querySelector(".places__list"),S=document.querySelector(".profile__edit-button"),g=document.querySelector(".profile__add-button"),q=document.querySelectorAll(".popup"),E=document.querySelector(".popup_type_edit"),k=document.querySelector(".popup_type_new-card"),L=document.querySelector(".popup_type_image"),C=L.querySelector(".popup__image"),x=L.querySelector(".popup__caption"),A=document.querySelector(".popup__input_type_name"),w=document.querySelector(".popup__input_type_description"),U=document.querySelector(".profile__image"),j=document.querySelector(".profile__title"),I=document.querySelector(".profile__description"),O=document.querySelector(".popup__input_type_card-name"),T=document.querySelector(".popup__input_type_url"),D=document.querySelector(".popup_type_avatar"),P=document.querySelector(".popup__input_type_url-avatar"),z=document.querySelector(".profile__image"),M=document.forms["edit-profile"],B=document.forms["new-place"],N=document.forms["new-avatar"];function J(e){C.src=e.link,C.alt=e.name,x.textContent=e.name,a(L)}function H(e,t){var o=e.target,c=e.target.closest(".card").querySelector(".card__like-vision");(function(e){return n("".concat(r.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:r.headers})})(t).then((function(e){d(o),c.textContent=e.likes.length})).catch((function(e){console.log(e)}))}function V(e,t){var o=e.target,c=e.target.closest(".card").querySelector(".card__like-vision");(function(e){return n("".concat(r.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:r.headers})})(t).then((function(e){d(o),c.textContent=e.likes.length})).catch((function(e){console.log(e)}))}!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);_(n,r,t),e.addEventListener("reset",(function(){v(r,t)})),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?f(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.inputErrorActive)}(e,t,t.validationMessage,n)}(e,o,t),_(n,r,t)}))}))}(t,e),m(t,e)}))}(c),q.forEach((function(e){e.classList.add("popup_is-animated")})),S.addEventListener("click",(function(){A.value=j.textContent,w.value=I.textContent,m(M,c),a(E)})),g.addEventListener("click",(function(){m(B,c),a(k)})),z.addEventListener("click",(function(){m(N,c),a(D)})),M.addEventListener("submit",(function(t){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Сохранение...";t.preventDefault();var c,a,u=t.submitter,l=u.textContent;e(!0,u,l,o),(c=A.value,a=w.value,n("".concat(r.baseUrl,"/users/me"),{method:"PATCH",headers:r.headers,body:JSON.stringify({name:c,about:a})})).then((function(){!function(e,t){j.textContent=e,I.textContent=t}(A.value,w.value),i(E)})).catch((function(e){console.log(e)})).finally((function(){e(!1,u,l)}))})),B.addEventListener("submit",(function(t,c){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...";t.preventDefault();var u,l,d=t.submitter,f=d.textContent;e(!0,d,f,a),(u=O.value,l=T.value,n("".concat(r.baseUrl,"/cards"),{method:"POST",headers:r.headers,body:JSON.stringify({name:u,link:l,alt:u})})).then((function(e){c=e.owner._id;var n=s({name:e.name,link:e.link,alt:e.name,_id:e._id,owner:e.owner,likes:[]},p,J,c,o,H,V);b.prepend(n),t.target.reset(),i(k)})).catch((function(e){console.log(e)})).finally((function(){e(!1,d,f)}))})),N.addEventListener("submit",(function(t){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Сохранение...";t.preventDefault();var c,a=t.submitter,u=a.textContent;e(!0,a,u,o),(c=P.value,n("".concat(r.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:r.headers,body:JSON.stringify({avatar:c})})).then((function(){U.style.backgroundImage="url(".concat(P.value,")"),t.target.reset(),i(D)})).catch((function(e){console.log(e)})).finally((function(){e(!1,a,u)}))})),q.forEach((function(e){e.addEventListener("click",(function(t){(t.target.classList.contains("popup__close")||t.target.classList.contains("popup"))&&i(e)}))})),Promise.all([n("".concat(r.baseUrl,"/users/me"),{headers:{authorization:r.headers.authorization}}),n("".concat(r.baseUrl,"/cards"),{headers:{authorization:r.headers.authorization}})]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return y(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=r[0],a=r[1];h=c._id,j.textContent=c.name,I.textContent=c.about,U.style.backgroundImage="url(".concat(c.avatar,")"),a.forEach((function(e){b.append(s(e,p,J,h,o,H,V))}))})).catch((function(e){console.log(e)}))})();