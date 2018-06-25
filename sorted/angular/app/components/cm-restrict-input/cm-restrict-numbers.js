'use strict';

var app = angular.module('cmValidation');

//var INTEGER_REGEXP = /[$]?\b[0-9,.]+$/i;

app.directive('cmRestrictNumbers', function() {
  return {
    restrict: 'A',
    require: '?ngModel',
    scope: {
      allowDecimal: '=',
    },
    link: function(scope, elm) {

      scope.keydown = function(event) {

        if (event.keyCode >= 8 && event.keyCode <= 46) {
          return true;
        }

        //numbers
        if (event.keyCode >= 48 && event.keyCode <= 57) {
          return true;
        }

        //numpad numbers
        if (event.keyCode >= 96 && event.keyCode <= 105) {
          return true;
        }

        //decimal point
        if (scope.allowDecimal && (event.keyCode === 190 || event.keyCode === 110)) {
          return true;
        }

        return false;

      };

      elm.on('keydown', scope.keydown);

    },
  };
});
