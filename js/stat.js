'use strict';

var STAT_X = 100;
var STAT_Y = 10;
var STAT_GAP = 15;
var STAT_WIDTH = 420;
var STAT_HEIGHT = 270;
var TEXT_HEIGHT = 20;
var SHADOW_GAP = 10;

var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;

// Функция создания окна
var createStatWindow = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, STAT_WIDTH, STAT_HEIGHT);
};

// Вывод заголовка
var printStatsHeader = function (ctx) {
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', STAT_X + STAT_GAP, STAT_Y + STAT_GAP + TEXT_HEIGHT);
  ctx.fillText('Список результатов:', STAT_X + STAT_GAP, STAT_Y + STAT_GAP + TEXT_HEIGHT + TEXT_HEIGHT);
};

// Поиск максимального элемента
var findMaxElement = function (elements) {
  var element = 0;
  for (var index = 0; index < elements.length; index++) {
    if (elements[index] > element) {
      element = elements[index];
    }
  }
  return element;
};

// Печать имен
var printPlayerName = function (ctx, playerNum, playerName) {
  ctx.fillStyle = '#000000';
  ctx.fillText(playerName,
      STAT_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * playerNum,
      STAT_HEIGHT + STAT_Y - STAT_GAP
  );
};

// Рисование графика
var printGraph = function (ctx, playerNum, playerName, playerTime, maxTime) {
  // Считаем высоту графика
  var barSize = (playerTime * BAR_HEIGHT) / maxTime;

  // Выбор цвета графика
  if (playerName === 'Вы') {
    ctx.fillStyle = '#ff0000';
  } else {
    ctx.fillStyle = 'hsl(240, ' + Math.round(Math.random(100) * 100) + '%, 50%)';
  }

  // Рисуем график и время
  ctx.fillRect(
      STAT_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * playerNum,
      STAT_HEIGHT + STAT_Y - STAT_GAP - TEXT_HEIGHT,
      BAR_WIDTH,
      -barSize
  );
  ctx.fillStyle = '#000000';
  ctx.fillText(playerTime,
      STAT_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * playerNum,
      STAT_HEIGHT - barSize - STAT_GAP * 2
  );
};

window.renderStatistics = function (ctx, names, times) {
  // Рисуем окно статистики
  createStatWindow(ctx, STAT_X + SHADOW_GAP, STAT_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  createStatWindow(ctx, STAT_X, STAT_Y, '#ffffff');
  // Вывод заголовка
  printStatsHeader(ctx);
  // Ищем максимальный элемент
  var max = findMaxElement(times);
  // Выводим графики
  for (var playerNum = 0; playerNum < names.length; playerNum++) {
    var time = Math.round(times[playerNum]); // Округляем время
    // Выводим имя
    printPlayerName(ctx, playerNum, names[playerNum]);
    // Рисуем график и время
    printGraph(ctx, playerNum, names[playerNum], time, max);
  }
};
