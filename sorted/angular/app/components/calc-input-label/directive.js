/**
 * Created by greg on 2/03/2016.
 */


(function () {
  'use strict';
  angular.module('sorted')
    .directive('calcInputLabel', ['siteConfig', function (siteConfig) {

      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/calc-input-label/index.html',
        restrict: 'EA',
        scope: {
          field: '='
        },
        controller: ['$scope', function ($scope) {
          $scope.getLabel = function(){
            return ($scope.field.label) ? $scope.field.label : ($scope.field.groupLabel) ? $scope.field.groupLabel : '';
          };
        }]
      };
    }]);
}());
