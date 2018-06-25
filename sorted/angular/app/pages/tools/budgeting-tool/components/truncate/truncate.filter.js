(function () {
  'use strict';

  angular.module('budgetingTool')
    .filter('truncate', function () {
      return function (input, length) {
        if (input.length < length) {
          return input;
        }
        return input.substring(0, length-3) + '...';
      };
    });

})();
