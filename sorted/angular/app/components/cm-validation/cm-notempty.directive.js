'use strict';

var app = angular.module('cmValidation');

app.directive('cmNotempty', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.notempty = function(modelValue) {

        if (attrs.cmCondition === 'false') {
          return true;
        }

        if ((ctrl.$isEmpty(modelValue) || modelValue === null) && !elm.hasClass('ng-pristine')) {
          return false;
        }

        return true;
      };
    }
  };
});
