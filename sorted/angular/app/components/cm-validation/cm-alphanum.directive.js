'use strict';

var app = angular.module('cmValidation');

var ALPHANUM_REGEXP = /^[a-z0-9]+$/i;

app.directive('cmAlphanum', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.alphanum = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

        if (attrs.cmCondition === 'false') {
          return true;
        }

        if (ALPHANUM_REGEXP.test(viewValue)) {
          // it is valid
          return true;
        }

        // it is invalid
        return false;
      };
    }
  };
});
