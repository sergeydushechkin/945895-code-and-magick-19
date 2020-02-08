'use strict';

(function () {
  var WIZARDS_AMOUNT = 4;
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizardsList = document.querySelector('.setup-similar-list');

  // Создаем DOM-элементы с магов
  var renderWizards = function (wizard) {
    var wizardModel = wizardTemplate.cloneNode(true);
    wizardModel.querySelector('.setup-similar-label').textContent = wizard.fullname;
    wizardModel.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardModel.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardModel;
  };

  // Наполняем элемент волшебниками
  var fillWizardsElement = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var index = 0; index < wizards.length; index++) {
      fragment.appendChild(renderWizards(wizards[index]));
    }
    return fragment;
  };

  /* ---------------Основной код--------------- */

  wizardsList.appendChild(fillWizardsElement(window.data.generateWizards(WIZARDS_AMOUNT)));

})();
