(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('budgetCategory', [
      'budgetingToolConfig', 
      'periodAmount',
      'siteConfig', 
      function (budgetingToolConfig, periodAmount, siteConfig) {
        return {
          restrict: 'E',
          templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/components/budget-master-category/budget-category/budgetCategory.html',
          controller: ['$scope', function ($scope) {
            $scope.getCategoryAmount = function (category) {
              return periodAmount.displayDollars(category.Cents, category.Period);
            };

            $scope.MAX_CATEGORY_TITLE = budgetingToolConfig.MAX_CATEGORY_TITLE;
          }]
        };
      }
    ]);

})();
