'use strict';

(function () {

  var setupPopup = document.querySelector('.setup');

  var setupWizardCoat = setupPopup.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEyes = setupPopup.querySelector('.setup-wizard .wizard-eyes');
  var setupWizardFireball = setupPopup.querySelector('.setup-fireball');

  var coatColorInput = setupPopup.querySelector('.coat-color');
  var eyesColorInput = setupPopup.querySelector('.eyes-color');
  var fireballColorInput = setupPopup.querySelector('.fireball-color');

  var coatColorIndex = 0;
  var eyesColorIndex = 0;
  var fireballColorIndex = 0;

  // Переключение значений циклически
  var switchValue = function (indexValue, max) {
    if (++indexValue >= max) {
      indexValue = 0;
    }
    return indexValue;
  };

  /* ---------------Обработчики--------------- */

  // Изменение цвета мантии
  var onWizardCoatClick = function () {
    coatColorIndex = switchValue(coatColorIndex, window.data.COAT_COLORS.length);
    setupWizardCoat.style.fill = window.data.COAT_COLORS[coatColorIndex];
    coatColorInput.value = window.data.COAT_COLORS[coatColorIndex];
  };

  // Изменение цвета глаз
  var onWizardEyesClick = function () {
    eyesColorIndex = switchValue(eyesColorIndex, window.data.EYES_COLORS.length);
    setupWizardEyes.style.fill = window.data.EYES_COLORS[eyesColorIndex];
    eyesColorInput.value = window.data.EYES_COLORS[eyesColorIndex];
  };

  // Изменение цвета фаерболов
  var onWizardFireballClick = function () {
    fireballColorIndex = switchValue(fireballColorIndex, window.data.FIREBALL_COLORS.length);
    setupWizardFireball.style.backgroundColor = window.data.FIREBALL_COLORS[fireballColorIndex];
    fireballColorInput.value = window.data.FIREBALL_COLORS[fireballColorIndex];
  };

  window.colorize = {
    setupWizardCoat: setupWizardCoat,
    setupWizardEyes: setupWizardEyes,
    setupWizardFireball: setupWizardFireball,
    onWizardCoatClick: onWizardCoatClick,
    onWizardEyesClick: onWizardEyesClick,
    onWizardFireballClick: onWizardFireballClick
  };

})();
