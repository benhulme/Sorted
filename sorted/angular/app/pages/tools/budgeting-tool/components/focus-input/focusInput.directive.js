(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('focusInput', ['$timeout', function ($timeout) {
      return {
        restrict: 'A',
        link: function (scope, element) {
          $timeout(function () {
            element[0].focus();
          }, 0);
        }
      };
    }]);

})();
