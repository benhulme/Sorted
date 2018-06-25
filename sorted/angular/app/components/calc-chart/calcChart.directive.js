/**
 * Created by greg on 16/02/2016.
 */

(function () {
  'use strict';
  angular.module('sorted')
    .directive('calcChart', ['siteConfig', function (siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/calc-chart/calc-chart.html',
        restrict: 'EA',
        scope: false,
        controller: ['$scope', function ($scope) {

          // Private methods
          function drawChart(opts) {
            angular.element('#chart').kendoChart(opts);
          }

          var
            defaultData = {
              transitions: false,
            };


          // register an event listener other than watching the global scope.results object
          $scope.$on('chart:draw', function (event, data) {
            $scope.chartData = data;

            drawChart(_.merge({}, defaultData, data));
          });

          // let parent directives know that the chart is ready
          $scope.$emit('chart:ready');

        }]
      };
    }]);

}());
