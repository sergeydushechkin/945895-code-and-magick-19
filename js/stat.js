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

window.renderStatistics = function (ctx, names, times) {
  // Рисуем окно статистики
  createStatWindow(ctx, STAT_X + SHADOW_GAP, STAT_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  createStatWindow(ctx, STAT_X, STAT_Y, '#ffffff');

  // Вывод заголовка
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', STAT_X + STAT_GAP, STAT_Y + STAT_GAP + TEXT_HEIGHT);
  ctx.fillText('Список результатов:', STAT_X + STAT_GAP, STAT_Y + STAT_GAP + TEXT_HEIGHT + TEXT_HEIGHT);

  // Ищем максимальный элемент
  var max = 0;
  for (var index = 0; index < names.length; index++) {
    if (times[index] > max) {
      max = times[index];
    }
  }

  // Выводим графики
  for (var playerNum = 0; playerNum < names.length; playerNum++) {
    var time = Math.round(times[playerNum]); // Округляем время
    var barSize = (time * BAR_HEIGHT) / max; // Считаем высоту графика

    // Выводим имя и время
    ctx.fillStyle = '#000000';
    ctx.fillText(names[playerNum],
        STAT_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * playerNum,
        STAT_HEIGHT + STAT_Y - STAT_GAP
    );
    ctx.fillText(time,
        STAT_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * playerNum,
        STAT_HEIGHT - barSize - STAT_GAP * 2
    );

    // Рисуем график
    // Выбор цвета графика
    if (names[playerNum] === 'Вы') {
      ctx.fillStyle = '#ff0000';
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.round(Math.random(100) * 100) + '%, 50%)';
    }
    ctx.fillRect(
        STAT_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * playerNum,
        STAT_HEIGHT + STAT_Y - STAT_GAP - TEXT_HEIGHT,
        BAR_WIDTH,
        -barSize
    );
  }
};
