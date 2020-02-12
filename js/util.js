'use strict';

(function () {

  var showMessage = function (text, color) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center;';
    node.style.backgroundColor = color;
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '24px';

    node.textContent = text;
    document.body.insertAdjacentElement('afterbegin', node);

    setTimeout(function () {
      node.parentElement.removeChild(node);
    }, 2000);
  };

  window.util = {
    showMessage: showMessage
  };

})();
