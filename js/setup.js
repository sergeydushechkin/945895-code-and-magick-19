'use strict';

(function () {
  var WIZARDS_AMOUNT = 4;
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizardsList = document.querySelector('.setup-similar-list');

  // Создает DOM-элементы с магов
  var fillWizardsElement = function (wizard) {
    var wizardModel = wizardTemplate.cloneNode(true);
    wizardModel.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardModel.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardModel.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardModel;
  };

  // Наполняет элемент волшебниками
  var renderWizards = function (wizards, amount) {
    var fragment = document.createDocumentFragment();
    for (var index = 0; index < amount; index++) {
      fragment.appendChild(fillWizardsElement(wizards[index]));
    }
    wizardsList.appendChild(fragment);
  };

  // Загружает список волшебников
  var loadWizardsSuccess = function (wizards) {
    renderWizards(wizards, WIZARDS_AMOUNT);
  };

  // В случае ошибки при загрузке
  var loadWizardsError = function (errorText) {
    window.util.showMessage(errorText, 'red');
  };

  /* ---------------Основной код--------------- */

  window.backend.load(loadWizardsSuccess, loadWizardsError);


})();
