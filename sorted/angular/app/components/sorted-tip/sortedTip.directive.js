(function () {
  'use strict';

  angular.module('sorted')
    .directive('sortedTip', [
      'siteConfig',
      function (siteConfig) {
        return {
          restrict: 'AE',
          templateUrl: siteConfig.APP_PATH + 'app/components/sorted-tip/sortedTip.html',
          transclude: true
        };
      }
    ]);

})();
