'use strict';

var app = angular.module('cmValidation');

var INTEGER_REGEXP = /^\-?\d+$/;

app.directive('cmInteger', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.integer = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

        if (attrs.cmCondition === 'false') {
          return true;
        }

        if (INTEGER_REGEXP.test(viewValue)) {
          // it is valid
          return true;
        }
        // it is invalid
        return false;
      };
    }
  };
});
