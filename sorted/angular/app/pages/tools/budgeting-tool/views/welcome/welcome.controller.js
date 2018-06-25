(function() {
  'use strict';

  angular.module('budgetingTool')
    .controller('WelcomeCtrl', [
      '$location',
      '$scope',
      '$window',
      'Budget',
      'budgetingToolConfig',
      'periodAmount',
      'siteConfig',
      'viewModel',
      function($location, $scope, $window, Budget, budgetingToolConfig, periodAmount, siteConfig, viewModel) {
        $scope.siteConfig = siteConfig;
        $scope.data = viewModel.toolPage;
        $scope.data.BudgetPeriods = budgetingToolConfig.BUDGET_PERIODS;
        $scope.initialPeriod = budgetingToolConfig.BUDGET_PERIODS[budgetingToolConfig.DEFAULT_BUDGET_PERIOD];
        $scope.isLoggedIn = viewModel.isLoggedIn;

        // Work with a copy of budget
        $scope.budget = angular.copy(Budget.create());
        if (viewModel.salary) {
          $scope.budget.Cents = viewModel.salary;
        }

        function redirectIfBudgetExists() {
          // User closed the login window. May have a budget, check:
          Budget.clear();
          Budget.get()
            .then(function (budget) {
              if (!_.isEmpty(budget)) {
                return $location.path(budgetingToolConfig.BUDGETING_TOOL_PATH);
              }
            });
        }

        $scope.next = function () {
          console.log($scope.budget.Cents);

          if ($scope.budgetAmountForm.$valid) {
            var cents = angular.copy(
              periodAmount.convert($scope.budget.Cents, $scope.initialPeriod, $scope.budget.Period)
            );
            $scope.budget.IncomeStreams = [{
              Title: 'My income',
              Cents: cents,
              Removeable: false
            }];
            angular.copy($scope.budget, Budget.budget);


            return $location.path(budgetingToolConfig.BUDGETING_TOOL_PATH + '/budget-template');
          }
        };

        angular.element($window).on('hidden.bs.modal', redirectIfBudgetExists);
        $scope.$on('$destroy', function () {
          angular.element($window).off('hidden.bs.modal', redirectIfBudgetExists);
        });
      }
    ]);

}());
