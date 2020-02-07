'use strict';

(function () {

  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var setupOpen = document.querySelector('.setup-open');
  var setupPopup = document.querySelector('.setup');
  var setupClose = setupPopup.querySelector('.setup-close');
  var setupUserName = setupPopup.querySelector('.setup-user-name');

  // Показать попап с параметрами персонажа
  var openPopup = function () {
    setupPopup.classList.remove('hidden');
    document.addEventListener('keydown', onFormEscKeydown);
    setupUserName.addEventListener('input', onUserNameInvalid);
    window.colorize.setupWizardCoat.addEventListener('click', window.colorize.onWizardCoatClick);
    window.colorize.setupWizardEyes.addEventListener('click', window.colorize.onWizardEyesClick);
    window.colorize.setupWizardFireball.addEventListener('click', window.colorize.onWizardFireballClick);
  };

  // Убрать попап с параметрами персонажа
  var closePopup = function () {
    setupPopup.classList.add('hidden');
    document.removeEventListener('keydown', onFormEscKeydown);
    setupUserName.removeEventListener('invalid', onUserNameInvalid);
    window.colorize.setupWizardCoat.removeEventListener('click', window.colorize.onWizardCoatClick);
    window.colorize.setupWizardEyes.removeEventListener('click', window.colorize.onWizardEyesClick);
    window.colorize.setupWizardFireball.removeEventListener('click', window.colorize.onWizardFireballClick);
  };

  // Обработки нажатия кнопки ESC при открытых параметрах персонажа, останавливаем распространение если это имя
  var onFormEscKeydown = function (evt) {
    if (evt.key === ESC_KEY) {
      if (evt.target === setupUserName) {
        evt.stopPropagation();
      } else {
        closePopup();
      }
    }
  };

  // Валидация формы, событие invalid
  var onUserNameInvalid = function () {
    if (setupUserName.validity.tooShort) {
      setupUserName.setCustomValidity('Имя персонажа должно быть не менее 2-х символов');
    } else if (setupUserName.validity.tooLong) {
      setupUserName.setCustomValidity('Имя персонажа должно быть не более 25 символов');
    } else if (setupUserName.validity.valueMissing) {
      setupUserName.setCustomValidity('Имя не может быть пустым');
    } else {
      setupUserName.setCustomValidity('');
    }
  };
  /* ---------------Основной код--------------- */

  document.querySelector('.setup-similar').classList.remove('hidden');

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      closePopup();
    }
  });

})();
