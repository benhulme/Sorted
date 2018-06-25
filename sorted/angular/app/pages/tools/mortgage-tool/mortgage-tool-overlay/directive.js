/**
 * Created by greg on 8/03/2016.
 */

(function () {
  'use strict';
  angular.module('sorted')
    .directive('mortgageToolOverlay', ['siteConfig', function (siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/mortgage-tool/mortgage-tool-overlay/overlay.html',
        restrict: 'EA',
        scope: {
          model: '=',
          calculator: '='
        },
        controller: ['$scope',
          function ($scope) {

            // Initially, assign the first model to the 'watched model'
            $scope.currentModel = $scope.model.collection.at(0);

            // listen for changes by parent scope and reset currentModel
            $scope.$on('output:update', function (event, modelIndex) {
              $scope.currentModel = $scope.model.collection.at(modelIndex);
            });
          }]
      };
    }]);
}());

