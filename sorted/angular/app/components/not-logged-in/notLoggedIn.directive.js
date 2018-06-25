(function () {
  'use strict';

  angular.module('sorted')
    .directive('notLoggedIn', [function () {
      return {
        restrict: 'E',
        transclude: true,
        scope: false,
        template: '<p class="login-prompt" ng-if="!isLoggedIn"><ng-transclude></ng-transclude></p>'
      };
    }]);

})();
