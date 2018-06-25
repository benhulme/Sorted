'use strict';

//requires attribute data-match='name-of-field-to-match'

var app = angular.module('cmValidation');

app.directive('cmMatch', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {

      var formName = elm.parents('form').attr('name');

      var fieldToMatch = scope[formName][attrs.cmMatch];

      ctrl.$validators.match = function(modelValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

        if (attrs.cmCondition === 'false') {
          return true;
        }

        if (fieldToMatch.$viewValue === modelValue) {
          // it is valid
          return true;
        }

        // it is invalid
        return false;
      };
    }
  };
});
