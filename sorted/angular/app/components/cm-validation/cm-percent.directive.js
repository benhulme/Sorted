'use strict';

var app = angular.module('cmValidation');

var REGEXP = /^(\d+\.?\d{0,2}|\.\d{1,2})$/;

app.directive('cmPercent', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.percent = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

        if (attrs.cmCondition === 'false') {
          return true;
        }

        if (REGEXP.test(viewValue) && viewValue <= 100) {
          // it is valid
          return true;
        }

        // it is invalid
        return false;
      };
    }
  };
});
