(function() {
  'use strict';

  angular.module('budgetingTool')
    .controller('BudgetTemplateCtrl', [
      '$scope', 
      'Budget',
      'siteConfig',
      'viewModel',
      function($scope, Budget, siteConfig, viewModel) {
        $scope.siteConfig = siteConfig;
        $scope.data = viewModel.data;
        $scope.budget = Budget.get();
      }
    ]);

}());
