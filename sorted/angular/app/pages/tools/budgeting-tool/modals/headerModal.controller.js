/* global BigNumber */
(function () {
  'use strict';

  angular.module('budgetingTool')
    .controller('HeaderModalCtrl', [
      '$location',
      '$scope',
      '$timeout',
      '$uibModalInstance',
      'Budget',
      'budgetingToolConfig',
      'periodAmount',
      'Profile',
      'siteConfig',
      function ($location, $scope, $timeout, $uibModalInstance, Budget, budgetingToolConfig, periodAmount, Profile, siteConfig) {
        $scope.budget = angular.copy(Budget.budget);
        $scope.initialPeriod = angular.copy($scope.budget.Period);
        $scope.data = {
          BudgetPeriods: budgetingToolConfig.BUDGET_PERIODS
        };
        $scope.profile = Profile.get();
        $scope.siteConfig = siteConfig;
        $scope.budgetingToolConfig = budgetingToolConfig;

        $scope.addIncomeStream = function () {
          if ($scope.budget.IncomeStreams.length >= budgetingToolConfig.INCOME_STREAM_MAX) {
            return;
          }
          $scope.budget.IncomeStreams.push({ Removeable: true });
        };

        $scope.removeIncomeStream = function (index) {
          $scope.budget.IncomeStreams.splice(index, 1);
        };

        function sumStreams (streams) {
          return _.reduce(streams, function (sum, stream) {
            if (stream.Cents) {
              return sum.plus(stream.Cents);
            }
            return sum;
          }, new BigNumber(0));
        }

        $scope.saveHeaderModal = function () {
          // Work with a copy to avoid updating fields a split second before the modal closes
          var newBudget = angular.copy($scope.budget);

          // If a stream has an amount but no title, INCOME_STREAM_PLACEHOLDER is used
          newBudget.IncomeStreams = _(newBudget.IncomeStreams)
            .filter(function (val) { return val.Cents.greaterThan(0); })
            .map(function (val) {
              val.Title = val.Title || budgetingToolConfig.INCOME_STREAM_PLACEHOLDER;
              val.Cents = periodAmount.convert(val.Cents, $scope.initialPeriod, $scope.budget.Period);
              return val;
            })
            .value();
          newBudget.Cents = sumStreams(newBudget.IncomeStreams);

          $uibModalInstance.close(newBudget);
        };

        $scope.toProfile = function () {
          $uibModalInstance.dismiss('cancel');
          return $location.path('/profile');
        };

        $scope.cancelHeaderModal = function () {
          $uibModalInstance.dismiss('cancel');
        };

        $scope.getAvailable = function () {
          var available = periodAmount.convert(
            sumStreams($scope.budget.IncomeStreams), 
            $scope.initialPeriod, 
            $scope.budget.Period
          );
          return periodAmount.displayDollars(available, $scope.budget.Period);
        };
      }
    ]);

})();
