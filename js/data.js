'use strict';

(function () {

  var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

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
  var generateWizards = function (amount) {
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

  window.data = {
    FIREBALL_COLORS: FIREBALL_COLORS,
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    generateWizards: generateWizards
  };

})();
