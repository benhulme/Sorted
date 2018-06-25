(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('budgetPeriodDropdown', [
      'budgetingToolConfig', 
      'periodAmount',
      'siteConfig', 
      function (budgetingToolConfig, periodAmount, siteConfig) {
        return {
          restrict: 'E',
          scope: {
            amount: '=',
            model: '='
          },
          templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/components/budget-period-dropdown/budgetPeriodDropdown.html',
          controller: ['$scope', function ($scope) {
            $scope.periods = budgetingToolConfig.BUDGET_PERIODS;
            $scope.setPeriod = function (oldPeriod, newPeriod) { 
              if ($scope.amount !== undefined && !$scope.amount.eq(0)) {
                // For use in inlineEditableAmount directive
                angular.copy(
                  periodAmount.convert($scope.amount, oldPeriod, newPeriod),
                  $scope.amount
                );
              }
              angular.copy(newPeriod, $scope.model);
            };
          }],
        };
      }
    ]);

})();
