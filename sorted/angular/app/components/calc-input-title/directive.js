/**
 * Created by greg on 2/03/2016.
 */


(function () {
  'use strict';
  angular.module('sorted')
    .directive('calcInputTitle', ['siteConfig', function (siteConfig) {

      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/calc-input-title/index.html',
        restrict: 'EA',
        scope: {
          field: '='
        },
      };
    }]);
}());
