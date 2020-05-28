'use strict';

(function () {

  var URL_LOAD = 'https://javascript.pages.academy/code-and-magick/data';
  var URL_SAVE = 'https://javascript.pages.academy/code-and-magick';
  var STATUS_OK = 200;

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        throw new Error('Ошибка получения данных:' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения при получении данных: ' + xhr.status + ' ' + xhr.statusText);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос на получение данных не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        throw new Error('Ошибка отправки данных:' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения при отправке данных: ' + xhr.status + ' ' + xhr.statusText);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос на отправку не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
