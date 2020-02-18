'use strict';

(function () {

  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

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
    coatColorIndex = switchValue(coatColorIndex, COAT_COLORS.length);
    setupWizardCoat.style.fill = COAT_COLORS[coatColorIndex];
    coatColorInput.value = COAT_COLORS[coatColorIndex];
    window.similar.updateWizards();
  };

  // Изменение цвета глаз
  var onWizardEyesClick = function () {
    eyesColorIndex = switchValue(eyesColorIndex, EYES_COLORS.length);
    setupWizardEyes.style.fill = EYES_COLORS[eyesColorIndex];
    eyesColorInput.value = EYES_COLORS[eyesColorIndex];
    window.similar.updateWizards();
  };

  // Изменение цвета фаерболов
  var onWizardFireballClick = function () {
    fireballColorIndex = switchValue(fireballColorIndex, FIREBALL_COLORS.length);
    setupWizardFireball.style.backgroundColor = FIREBALL_COLORS[fireballColorIndex];
    fireballColorInput.value = FIREBALL_COLORS[fireballColorIndex];
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
