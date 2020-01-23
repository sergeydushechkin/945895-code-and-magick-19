'use strict';

var STAT_X = 100;
var STAT_Y = 10;
var STAT_GAP = 10;
var STAT_WIDTH = 420;
var STAT_HEIGHT = 270;
var FONT_GAP = 10;

var createStatWindow = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, STAT_WIDTH, STAT_HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {
  createStatWindow(ctx, STAT_X + STAT_GAP, STAT_Y + STAT_GAP, 'rgba(0, 0, 0, 0.7)');
  createStatWindow(ctx, STAT_X, STAT_Y, '#ffffff');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', STAT_X + STAT_GAP * 2, STAT_Y + STAT_GAP * 2);
  ctx.fillText('Список результатов:', STAT_X + STAT_GAP * 2, STAT_Y + STAT_GAP * 2);

};
