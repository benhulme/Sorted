'use strict';

var app = angular.module('cmValidation');

app.directive('cmMaxlength', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {

      ctrl.$validators.maxlength = function(modelValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

        if (attrs.cmCondition === 'false') {
          return true;
        }

        if (modelValue.length <= attrs.cmMaxlength) {
          // it is valid
          return true;
        }

        // it is invalid
        return false;
      };
    }
  };
});
