'use strict';

(function () {

  var coatColor;
  var eyesColor;

  // Считает баллы совпадений волшебников
  var getRank = function (wizard) {
    var rank = 0;
    if (coatColor === wizard.colorCoat) {
      rank += 2;
    }
    if (eyesColor === wizard.colorEyes) {
      rank += 1;
    }
    return rank;
  };

  // Сравнивает имена волшебников
  var compareNames = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  // Обновляет список похожих волшебников
  var updateWizards = function () {
    var similarWizzards = window.setup.wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (!rankDiff) {
        rankDiff = compareNames(left.name, right.name);
      }
      return rankDiff;
    });
    window.setup.renderWizards(similarWizzards, window.setup.WIZARDS_AMOUNT);
  };

  /* ---------------Обработчики--------------- */
  var onCoatChange = window.debounce(function (coat) {
    coatColor = coat;
    updateWizards();
  });

  var onEyesChange = window.debounce(function (eyes) {
    eyesColor = eyes;
    updateWizards();
  });

  /* ---------------Экспорт--------------- */
  window.similar = {
    onCoatChange: onCoatChange,
    onEyesChange: onEyesChange
  };

})();
