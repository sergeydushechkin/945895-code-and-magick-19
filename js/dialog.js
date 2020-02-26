'use strict';

(function () {

  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var setupOpen = document.querySelector('.setup-open');
  var setupPopup = document.querySelector('.setup');
  var setupClose = setupPopup.querySelector('.setup-close');
  var setupUserName = setupPopup.querySelector('.setup-user-name');
  var setupUpload = setupPopup.querySelector('.upload');
  var setupWizardForm = setupPopup.querySelector('.setup-wizard-form');

  // Сбросить позицию окна персонажа
  var resetPopupPosition = function () {
    setupPopup.style.left = '';
    setupPopup.style.top = '';
  };

  // Показать попап с параметрами персонажа
  var openPopup = function () {
    setupPopup.classList.remove('hidden');
    document.addEventListener('keydown', onFormEscKeydown);
    setupUserName.addEventListener('input', onUserNameInvalid);
    setupUpload.addEventListener('mousedown', onUploadMousedown);
    setupWizardForm.addEventListener('submit', onSetupFormSubmit);
    window.colorize.setupWizardCoat.addEventListener('click', window.colorize.onWizardCoatClick);
    window.colorize.setupWizardEyes.addEventListener('click', window.colorize.onWizardEyesClick);
    window.colorize.setupWizardFireball.addEventListener('click', window.colorize.onWizardFireballClick);
    window.avatar.fileInput.addEventListener('change', window.avatar.onFileInputChange);
  };

  // Убрать попап с параметрами персонажа
  var closePopup = function () {
    setupPopup.classList.add('hidden');
    resetPopupPosition();
    document.removeEventListener('keydown', onFormEscKeydown);
    setupUserName.removeEventListener('invalid', onUserNameInvalid);
    setupUpload.removeEventListener('mousedown', onUploadMousedown);
    setupWizardForm.removeEventListener('submit', onSetupFormSubmit);
    window.colorize.setupWizardCoat.removeEventListener('click', window.colorize.onWizardCoatClick);
    window.colorize.setupWizardEyes.removeEventListener('click', window.colorize.onWizardEyesClick);
    window.colorize.setupWizardFireball.removeEventListener('click', window.colorize.onWizardFireballClick);
    window.avatar.fileInput.removeEventListener('change', window.avatar.onFileInputChange);
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

  // Обрабатывает нажатую кнопку для перетаскивания
  var onUploadMousedown = function (evt) {
    evt.preventDefault();
    var drag = false;
    var mouse = {
      x: evt.clientX,
      y: evt.clientY
    };

    // Если двигаем после нажатия
    var onUploadMousemove = function (mousemoveEvt) {
      mousemoveEvt.preventDefault();
      drag = true;

      var shift = {
        x: mouse.x - mousemoveEvt.clientX,
        y: mouse.y - mousemoveEvt.clientY
      };

      mouse = {
        x: mousemoveEvt.clientX,
        y: mousemoveEvt.clientY
      };

      setupPopup.style.left = (setupPopup.offsetLeft - shift.x) + 'px';
      setupPopup.style.top = (setupPopup.offsetTop - shift.y) + 'px';
    };

    // Если отпускам кнопку
    var onUploadMouseup = function () {
      document.removeEventListener('mousemove', onUploadMousemove);
      setupUpload.removeEventListener('mouseup', onUploadMouseup);

      if (drag) {
        // Отменяем клик поле перетаскивания
        var onUploadPreventClick = function (clickEvt) {
          clickEvt.preventDefault();
          setupUpload.removeEventListener('click', onUploadPreventClick);
        };

        setupUpload.addEventListener('click', onUploadPreventClick);
      }
    };

    document.addEventListener('mousemove', onUploadMousemove);
    setupUpload.addEventListener('mouseup', onUploadMouseup);
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

  /* ---------------Обработчики--------------- */

  // При удачной отправке данных
  var onSetupFormLoad = function () {
    window.util.showMessage('Данные успешно отправлены', 'green');
    closePopup();
  };

  // При ошибке отправке данных
  var onSetupFormError = function (errorText) {
    window.util.showMessage(errorText, 'red');
  };

  // При отправке формы
  var onSetupFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(setupWizardForm), onSetupFormLoad, onSetupFormError);
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
