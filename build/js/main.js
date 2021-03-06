'use strict';

(function () {
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  var modalOrder = document.querySelector('.js-order');
  var modalSuccess = document.querySelector('.js-success');
  var userName = modalOrder.querySelector('[name=user-name]');
  var userPhone = modalOrder.querySelector('[name=user-phone]');

  var isStorageSupport = true;
  var storageName = '';
  var storagePhone = '';

  var TEL_LENGTH = 11;

  try {
    storageName = localStorage.getItem('userName');
    storagePhone = localStorage.getItem('userPhone');
  } catch (err) {
    isStorageSupport = false;
  }

  // Валидация телефона
  var inputsTel = document.querySelectorAll('.js-tel');
  var inputsName = document.querySelectorAll('.js-name');

  inputsName.forEach(function (input) {
    input.addEventListener('input', function () {
      if (input.value === '') {
        input.classList.add('form__input--error');
      } else {
        input.classList.remove('form__input--error');
        input.classList.add('form__input--success');
      }
    });
  });

  var validateTel = function (element) {
    window.iMaskJS(element, {
      min: 110,
      mask: '+7 (000) 000 00 00',
    });
  };

  inputsTel.forEach(function (input) {
    validateTel(input);
  });

  inputsTel.forEach(function (input) {
    input.addEventListener('input', function () {

      var inputLength = input.value.replace(/\D+/g, '').length;
      if (inputLength < TEL_LENGTH) {
        input.classList.add('form__input--error');
        input.setCustomValidity('Введите телефонный номер полностью');
      } else {
        input.classList.remove('form__input--error');
        input.classList.add('form__input--success');
        input.setCustomValidity('');
      }
    });
  });

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

  var wantGoForm = document.querySelector('.form--want-go');
  var contactsForm = document.querySelector('.form--contacts');

  wantGoForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    localStorage.setItem('userPhone', userPhone.value);
    showModal(modalSuccess);
  });

  contactsForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    localStorage.setItem('userName', userName.value);
    localStorage.setItem('userPhone', userPhone.value);
    showModal(modalSuccess);
  });

  // tabs

  var program = document.querySelector('.programs');
  var programsList = program.querySelector('.programs__list');
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


  /* programsList.addEventListener('change', function () {
    programsButtons.forEach(function (button, i) {
      if (button.classList.contains('programs__item--active')) {
        switchTabs(programsTexts, i, 'programs__text--active');
      }
    });
  }, false);*/

  // Swiper

  var liveSlider = null;
  var programsSlider = null;

  var liveSwiper = function () {
    liveSlider = new Swiper('.live-israel__swiper', {
      direction: 'horizontal',
      slidesPerView: 1,
      loop: true,
      centeredSlides: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
        bulletClass: 'live-israel__control--bullet',
        bulletActiveClass: 'live-israel__control--active',
      },
    });
  };

  var programsSwiper = function () {
    programsSlider = new Swiper('.programs__swiper', {
      direction: 'horizontal',
      slidesPerView: 'auto',
      loop: true,
      centeredSlides: true,
      slideActiveClass: 'programs__item--active',
    });
  };

  var reviewsSwiper = new Swiper('.reviews__swiper', {
    direction: 'horizontal',
    slidesPerView: 1,
    loop: true,
    centeredSlides: true,
    pagination: {
      el: '.reviews__control',
      type: 'fraction',
      renderFraction: function (currentClass, totalClass) {
        return '<span class="' + currentClass + '"></span>' +
          '<span> / </span>' +
          '<span class="' + totalClass + '"></span>';
      }
    },
    navigation: {
      nextEl: '.reviews__button-right',
      prevEl: '.reviews__button-left'
    },
  });


  if (window.matchMedia('(max-width: 767px)').matches) {
    liveSwiper();
    programsSwiper();

    var programsButtonsList = [];
    programsButtons.forEach(function (button) {
      programsButtonsList.push(button);
    });

    programsList.addEventListener('touchend', function () {
      programsButtons.forEach(function (button) {
        if (button.classList.contains('programs__item--active')) {
          var activeButton = programsList.querySelector('.programs__item--active');
          var j = programsButtonsList.indexOf(activeButton);
          switchTabs(programsTexts, j, 'programs__text--active');
        }
      });
    }, false);
  }

  window.addEventListener('resize', function () {
    var viewport = document.documentElement.clientWidth;
    if (viewport < 768 && !liveSlider) {
      liveSwiper();
      programsSwiper();
    } else if (viewport >= 768 && liveSlider) {
      liveSlider.destroy();
      liveSlider = null;
      programsSlider.destroy();
      programsSlider = null;
    }
  });

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

  window.vendor.svg4everybody();
})();
