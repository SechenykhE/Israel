'use strict';

(function () {

  // localStorage и маска на телефон
  var modalOrder = document.querySelector('.js-order');
  var modalSuccess = document.querySelector('.js-success');
  var userName = modalOrder.querySelector('[name=user-name]');
  var userPhone = modalOrder.querySelector('[name=user-phone]');

  var isStorageSupport = true;
  var storageName = '';
  var storagePhone = '';

  try {
    storageName = localStorage.getItem('userName');
    storagePhone = localStorage.getItem('userPhone');
  } catch (err) {
    isStorageSupport = false;
  }


  // открытие и закрытие модальных окон
  var buttonOrder = document.querySelector('.header__call-order');
  var modal = document.querySelector('.modal');
  var buttonCloseOrder = modalOrder.querySelector('.modal__close');
  var buttonCloseSuccess = modalSuccess.querySelector('.modal__close');
  var body = document.querySelector('body');
  var modalsForm = modalOrder.querySelector('.modal-order__form');

  var showModal = function (popup) {
    popup.classList.remove('modal--close');
    popup.classList.add('modal--show');
    body.classList.add('hidden');
    document.addEventListener('keydown', onEscPress);
    buttonCloseOrder.addEventListener('click', onButtonClick);
    buttonCloseSuccess.addEventListener('click', onButtonClick);
    popup.addEventListener('mousedown', onDocumentMousedownPress);
  };

  var closeModal = function (modalOpen) {
    modalOpen.classList.remove('modal--show');
    modalOpen.classList.add('modal--close');
    document.removeEventListener('keydown', onEscPress);
    buttonCloseOrder.removeEventListener('click', onButtonClick);
    buttonCloseSuccess.removeEventListener('click', onButtonClick);
    modal.removeEventListener('mousedown', onDocumentMousedownPress);
    body.classList.remove('hidden');
  };

  var closeOpenedModal = function () {
    var modalOpen = document.querySelector('.modal--show');
    if (modalOpen) {
      closeModal(modalOpen);
    }
  };

  var onEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeOpenedModal();
    }
  };

  var onButtonClick = function () {
    closeOpenedModal();
  };

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
      modalsForm.classList.add('form--error');
    } else {
      modalsForm.classList.add('form--success');
      if (isStorageSupport) {
        localStorage.setItem('userName', userName.value);
        localStorage.setItem('userPhone', userPhone.value);
      }
      evt.preventDefault();
      closeOpenedModal();
      showModal(modalSuccess);
    }

  });

  // tabs

  var program = document.querySelector('.programs');
  var programsButtons = program.querySelectorAll('.programs__item');
  var programsTexts = program.querySelectorAll('.programs__text');

  var switchTabs = function (tabs, i, classActive) {
    tabs.forEach(function (item) {
      item.classList.remove(classActive);
    });
    tabs[i].classList.add(classActive);
  };

  programsButtons.forEach(function (button, i) {
    button.addEventListener('click', function () {
      switchTabs(programsButtons, i, 'programs__item--active');
      switchTabs(programsTexts, i, 'programs__text--active');
    });
  });

  // Swiper

  /* var liveSwiper = document.querySelector('.live-israel');
  var liveSlider = null;

  /!*liveSwiper.classList.remove('live--no-js');*!/

  var activeSwiper = function () {
    liveSlider = new Swiper('.live-israel__wrapper', {
      direction: 'horizontal',
      loop: true,
      autoplay: {
        delay: 4000,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        bulletClass: 'live-israel__control',
        bulletActiveClass: 'live-israel__control--active',
      },
    });
  };

  if (window.matchMedia('(max-width: 767px)').matches) {
    activeSwiper();
  }

  window.addEventListener('resize', function () {
    var viewport = document.documentElement.clientWidth;
    if (viewport < 768 && !liveSlider) {
      activeSwiper();
    } else if (viewport >= 768 && liveSlider) {
      liveSlider.destroy();
      liveSlider = null;
    }
  });*/

  // question

  var question = document.querySelector('.question');
  var questionButtons = question.querySelectorAll('.question__item');

  question.classList.remove('question--no-js');

  questionButtons.forEach(function (button, i) {
    button.addEventListener('click', function () {
      if (button.classList.contains('question__item--active')) {
        button.classList.remove('question__item--active');
      } else {
        switchTabs(questionButtons, i, 'question__item--active');
      }
    });
  });

  /* window.vendor.svg4everybody();*/
  /* window.vendor.Swiper();*/
})();
