(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('budgetBreakdownLegend', [
      'siteConfig',
      function (siteConfig) {
        return {
          restrict: 'E',
          templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/components/budget-breakdown/budget-breakdown-legend/budgetBreakdownLegend.html',
          controller: ['$scope', 'totalValues', function ($scope, totalValues) {
            $scope.getLegendAmount = function (amount) {
              var subtotal = totalValues.getSubtotal();
              return amount
                .div(subtotal)
                .times(100)
                .toNumber();
            };
          }]
        };
      }
    ]);

})();

