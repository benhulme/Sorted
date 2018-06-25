(function() {
  'use strict';
  angular.module('sorted')
    .directive('kiwisaverFeesCalcInflation',  ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/kiwisaver-fees/kiwisaver-fees-calc-inflation/calc-inflation.html',
        restrict: 'EA',
        scope: {
          field: '=',
          model: '='
        }
      };
    },
  ]);
}());
