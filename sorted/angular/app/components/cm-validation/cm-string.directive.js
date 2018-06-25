'use strict';

var app = angular.module('cmValidation');

var STRING_REGEXP = /^[a-zA-Z0-9 \-\']+$/;

app.directive('cmString', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.string = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

        if (attrs.cmCondition === 'false') {
          return true;
        }

        if (STRING_REGEXP.test(viewValue)) {
          // it is valid
          return true;
        }

        // it is invalid
        return false;
      };
    }
  };
});
