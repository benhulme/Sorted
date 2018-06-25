/**
 * Created by greg on 19/02/2016.
 */

(function () {
  'use strict';
  angular.module('sorted')
    .directive('savingsCalculatorResult', ['siteConfig',  function (siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/savings-calculator/savings-calculator-result/output.html',
        restrict: 'EA',
        scope: {
          model: '=',
          nudge: '=',
        },
        controller: ['$scope', function ($scope) {

          // Helper
          $scope.calcDuration = function (u, currentModel) {
            var
              unit = u || 'days',
              start = moment(currentModel.$attributes.starting, siteConfig.DATE_FORMAT),
              end = moment(currentModel.$attributes.ending, siteConfig.DATE_FORMAT);
            return end.diff(start, unit);
          };

          $scope.getDurationDesc = function (currentModel) {
            var
              diff = $scope.calcDuration('days', currentModel);
            return (diff > 0) ? moment.duration(diff, 'days').humanize() : '-';
          };

          $scope.hasDuration = function (currentModel) {
            var
              diff = $scope.calcDuration('days', currentModel);
            return (diff > 0);
          };



        }]
      };
    }
    ]);
}());
