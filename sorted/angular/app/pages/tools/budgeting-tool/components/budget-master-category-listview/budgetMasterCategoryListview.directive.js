(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('budgetMasterCategoryListview', [
      'periodAmount',
      'siteConfig',
      function (periodAmount, siteConfig) {
        return {
          restrict: 'E',
          templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/components/budget-master-category-listview/budgetMasterCategoryListview.html',
          controller: ['$scope', function ($scope) {
            $scope.masterCategoryDisplayTotal = function (masterCategory) {
              return periodAmount.displayDollars(masterCategory.Cents);
            };
          }]
        };
      }
    ]);

})();
