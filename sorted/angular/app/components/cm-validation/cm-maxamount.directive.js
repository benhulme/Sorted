'use strict';

var app = angular.module('cmValidation');

var INTEGER_REGEXP = /^\-?\d+$/;

app.directive('cmMaxamount', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.maxamount = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

        if (attrs.cmCondition === 'false') {
          return true;
        }

        if (INTEGER_REGEXP.test(viewValue) && viewValue <= parseInt(attrs.cmMaxamount)) {
          // it is valid
          return true;
        }

        // it is invalid
        return false;
      };
    }
  };
});
