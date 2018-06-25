(function () {
  'use strict';

  angular.module('sorted')
    .directive('editableElement', function($compile) {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
          var savedElement = element;
          var inputElement = angular.element('<input type="text" class="budget-title-edit form-control">');

          function truncate(str, max) {
            var len = parseInt(max);
            var ellipsis = len > 3 ? '...' : '';
            if (len < str.length) {
              return str.substr(0, len - ellipsis.length) + ellipsis;
            }
            return str;
          }

          model.$render = function () {
            inputElement.val(model.$viewValue);
          };

          savedElement.bind('click', function () {
            element.replaceWith($compile(inputElement)(scope));
            inputElement[0].focus();
          });

          inputElement.bind('blur keyup', function (e) {
            var editedText = inputElement.val();
            var isBlurKey = _.some([13, 27], function (v) { return v === e.which; });
            if (e.type === 'keyup' && !isBlurKey) {
              return;
            }
            if (attrs.editableMaxLength) {
              editedText = truncate(editedText, attrs.editableMaxLength);
            }
            model.$setViewValue(editedText);
            inputElement.replaceWith($compile(savedElement)(scope));
          });
        }
      };
    });

})();
