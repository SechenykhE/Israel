'use strict';

(function () {

  //localStorage и маска на телефон
  var modalOrder = document.querySelector('.js-order');
  var modalSuccess = document.querySelector('.js-success');
  var userName = modalOrder.querySelector('[name=user-name]');
  var userPhone = modalOrder.querySelector('[name=user-phone]');

  var isStorageSupport = true;
  var storageName = "";
  var storagePhone = "";

  try {
    storageName = localStorage.getItem("userName");
    storagePhone = localStorage.getItem("userPhone");
  } catch (err) {
    isStorageSupport = false;
  }


  //открытие и закрытие модальных окон
  var buttonOrder = document.querySelector('.header__call-order');
  var modal = document.querySelector('.modal');
  var buttonCloseOrder = modalOrder.querySelector('.modal__close');
  var buttonCloseSuccess = modalSuccess.querySelector('.modal__close');
  var body = document.querySelector('body');
  var modalsForm = modalOrder.querySelector('.modal-order__form');

  var showModal = function (modal) {
    modal.classList.remove('modal--close');
    modal.classList.add('modal--show');
    body.classList.add('hidden');
    document.addEventListener('keydown', onEscPress);
    buttonCloseOrder.addEventListener('click', onButtonClick);
    buttonCloseSuccess.addEventListener('click', onButtonClick);
    modal.addEventListener('mousedown', onDocumentMousedownPress);
  }

  var closeModal = function (modalOpen) {
    modalOpen.classList.remove('modal--show');
    modalOpen.classList.add('modal--close');
    document.removeEventListener('keydown', onEscPress);
    buttonCloseOrder.removeEventListener('click', onButtonClick);
    buttonCloseSuccess.removeEventListener('click', onButtonClick);
    modal.removeEventListener('mousedown', onDocumentMousedownPress);
  }

  var closeOpenedModal = function () {
    var modalOpen = document.querySelector('.modal--show');
    if(modalOpen) {
      closeModal(modalOpen);
    }
  }

  var onEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeOpenedModal();
    }
  }

  var onButtonClick = function () {
    closeOpenedModal();
  }

  var onDocumentMousedownPress = function (evt) {
    if ((evt.button === 0) && evt.target.classList.contains('modal')) {
      evt.preventDefault();
      closeOpenedModal();
    }
  };

  buttonOrder.addEventListener('click', function (evt) {
    evt.preventDefault();
    showModal(modalOrder);

    if (storageName && storagePhone) {
      userName.value = storageName;
      userPhone.value = storagePhone;
    }
    userName.focus();
  });

  modalsForm.addEventListener('invalid', function () {
    if (modalsForm.validity.valid) {
      modalsForm.classList.add('modal-order__form--success');
    } else {
      modalsForm.classList.add('modal-order__form--error');
    }
  });

   modalsForm.addEventListener('submit', function (evt) {
     if (!userName.value || !userPhone.value) {
       evt.preventDefault();
       modalsForm.classList.add('modal-order__form--error');
     } else {
       modalsForm.classList.add('modal-order__form--success');

       if (isStorageSupport) {
         localStorage.setItem("userName", userName.value);
         localStorage.setItem("userPhone", userPhone.value);
       }
       evt.preventDefault();
       closeOpenedModal();
       showModal(modalSuccess);
     }

  });


  window.vendor.svg4everybody();
})();
