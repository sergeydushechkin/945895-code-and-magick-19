'use strict';

var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var WIZARDS_AMOUNT = 4;
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizardsList = document.querySelector('.setup-similar-list');

// Генерацим имен волшебников
var generateFullname = function () {
  var fullname;

  if (Math.random() > 0.5) {
    fullname = WIZARDS_NAMES[Math.floor(Math.random() * WIZARDS_NAMES.length)] + ' ' + WIZARDS_SURNAMES[Math.floor(Math.random() * WIZARDS_SURNAMES.length)];
  } else {
    fullname = WIZARDS_SURNAMES[Math.floor(Math.random() * WIZARDS_SURNAMES.length)] + ' ' + WIZARDS_NAMES[Math.floor(Math.random() * WIZARDS_NAMES.length)];
  }

  return fullname;
};

// Случайные мантии
var makeCoat = function () {
  return COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)];
};

// Случайные глаза
var makeEyes = function () {
  return EYES_COLORS[Math.floor(Math.random() * EYES_COLORS.length)];
};

// Генерация волшебников
var generateWizzards = function (amount) {
  var wizardsResult = [];

  for (var index = 0; index < amount; index++) {
    var wizard = {};
    wizard.fullname = generateFullname();
    wizard.coatColor = makeCoat();
    wizard.eyesColor = makeEyes();
    wizardsResult[index] = wizard;
  }

  return wizardsResult;
};

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

document.querySelector('.setup').classList.remove('hidden');
wizardsList.appendChild(fillWizardsElement(generateWizzards(WIZARDS_AMOUNT)));
document.querySelector('.setup-similar').classList.remove('hidden');

