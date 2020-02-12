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

  // Загружаем список волшебников
  var loadWizardsSuccess = function (w) {
    wizardsList.appendChild(fillWizardsElement(window.data.generateWizards(WIZARDS_AMOUNT)));
  };

  // Загружаем список волшебников
  var loadWizardsError = function () {

  };

  /* ---------------Основной код--------------- */

  // wizardsList.appendChild(fillWizardsElement(window.data.generateWizards(WIZARDS_AMOUNT)));
  window.backend.load(loadWizardsSuccess, loadWizardsError);
  wizardsList.appendChild(fillWizardsElement(window.data.generateWizards(WIZARDS_AMOUNT)));

})();
