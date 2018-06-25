
(function() {
  'use strict';

  angular.module('sorted')
    .directive('resultCollapse',  ['siteConfig', function(siteConfig) {

      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/planning-tool/components/result-collapse/resultCollapse.html',
        restrict: 'E',
        scope: {
          data: '=',
          base: '='
        }
      };
    }]);
}());
