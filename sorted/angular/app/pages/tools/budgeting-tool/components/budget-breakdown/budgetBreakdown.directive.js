(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('budgetBreakdown', [
      'Budget',
      'budgetingToolConfig',
      'periodAmount',
      'siteConfig',
      function (Budget, budgetingToolConfig, periodAmount, siteConfig) {
        return {
          restrict: 'E',
          templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/components/budget-breakdown/budgetBreakdown.html',
          controller: ['$scope', 'totalValues', function ($scope, totalValues) {
            $scope.breakdownChartOptions = budgetingToolConfig.BREAKDOWN_CHART_OPTIONS;
            $scope.breakdownChartOptions.dataSource = $scope.breakdownChartSource;
            $scope.breakdownDesktopExpanded = $scope.budget.BreakdownExpanded;
            $scope.breakdownMobileExpanded = $scope.budget.BreakdownExpanded;

            // Rather pedantic, but it helps keep the mobile and desktop breakdowns distinct
            $scope.breakdownToggleDesktop = function () {
              $scope.breakdownDesktopExpanded = !$scope.breakdownDesktopExpanded;
              $scope.BreakdownExpanded = !$scope.BreakdownExpanded;
            };

            $scope.breakdownToggleMobile = function () {
              $scope.breakdownMobileExpanded = !$scope.breakdownMobileExpanded;
              $scope.BreakdownExpanded = !$scope.BreakdownExpanded;
            };

            $scope.subtotalDisplay = function () {
              return periodAmount.displayDollars(totalValues.getSubtotal()); 
            };
          }]
        };
      }
    ]);

})();
