'use strict';

var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var WIZARDS_AMOUNT = 4;
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizardsList = document.querySelector('.setup-similar-list');

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

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

// Валидация формы
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

// Переключение значений циклически
var switchValue = function (indexValue, max) {
  if (++indexValue >= max) {
    indexValue = 0;
  }
  return indexValue;
};

// Изменение цвета мантии
var onWizardCoatClick = function () {
  coatColorIndex = switchValue(coatColorIndex, COAT_COLORS.length);
  setupWizardCoat.style.fill = COAT_COLORS[coatColorIndex];
  coatColorInput.value = COAT_COLORS[coatColorIndex];
};

// Изменение цвета глаз
var onWizardEyesClick = function () {
  eyesColorIndex = switchValue(eyesColorIndex, EYES_COLORS.length);
  setupWizardEyes.style.fill = EYES_COLORS[eyesColorIndex];
  eyesColorInput.value = EYES_COLORS[eyesColorIndex];
};

// Изменение цвета фаерболов
var onWizardFireballClick = function () {
  fireballColorIndex = switchValue(fireballColorIndex, FIREBALL_COLORS.length);
  setupWizardFireball.style.backgroundColor = FIREBALL_COLORS[fireballColorIndex];
  fireballColorInput.value = FIREBALL_COLORS[fireballColorIndex];
};

// Показать попап с параметрами персонажа
var openPopup = function () {
  setupPopup.classList.remove('hidden');
  document.addEventListener('keydown', onFormEscKeydown);
  setupUserName.addEventListener('input', onUserNameInvalid);
  setupWizardCoat.addEventListener('click', onWizardCoatClick);
  setupWizardEyes.addEventListener('click', onWizardEyesClick);
  setupWizardFireball.addEventListener('click', onWizardFireballClick);
};

// Убрать попап с параметрами персонажа
var closePopup = function () {
  setupPopup.classList.add('hidden');
  document.removeEventListener('keydown', onFormEscKeydown);
  setupUserName.removeEventListener('invalid', onUserNameInvalid);
  setupWizardCoat.removeEventListener('click', onWizardCoatClick);
  setupWizardEyes.removeEventListener('click', onWizardEyesClick);
  setupWizardFireball.removeEventListener('click', onWizardFireballClick);
};

/* ---------------Основной код--------------- */
var setupOpen = document.querySelector('.setup-open');
var setupPopup = document.querySelector('.setup');
var setupClose = setupPopup.querySelector('.setup-close');
var setupUserName = setupPopup.querySelector('.setup-user-name');

var setupWizardCoat = setupPopup.querySelector('.setup-wizard .wizard-coat');
var setupWizardEyes = setupPopup.querySelector('.setup-wizard .wizard-eyes');
var setupWizardFireball = setupPopup.querySelector('.setup-fireball');

var coatColorInput = setupPopup.querySelector('.coat-color');
var eyesColorInput = setupPopup.querySelector('.eyes-color');
var fireballColorInput = setupPopup.querySelector('.fireball-color');

var coatColorIndex = 0;
var eyesColorIndex = 0;
var fireballColorIndex = 0;

wizardsList.appendChild(fillWizardsElement(generateWizzards(WIZARDS_AMOUNT)));
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


