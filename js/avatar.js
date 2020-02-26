'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarImage = document.querySelector('.setup-user-pic');
  var fileInput = document.querySelector('.upload input[type=file]');

  /* ---------------Обработчики--------------- */

  var onFileInputChange = function () {
    var filename = fileInput.files[0].name.toLowerCase();

    var matches = FILE_TYPES.some(function (extension) {
      return filename.endsWith(extension);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarImage.src = reader.result;
      });

      reader.readAsDataURL(fileInput.files[0]);
    }
  };

  /* ---------------Экспорт--------------- */

  window.avatar = {
    fileInput: fileInput,
    onFileInputChange: onFileInputChange
  };

})();
