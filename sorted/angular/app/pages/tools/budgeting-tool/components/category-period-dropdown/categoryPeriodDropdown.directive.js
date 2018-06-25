(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('categoryPeriodDropdown', ['siteConfig', function (siteConfig) {
        return {
          restrict: 'E',
          scope: false,
          templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/components/category-period-dropdown/categoryPeriodDropdown.html',
          link: function ($scope) {
            $scope.setPeriod = function (period) {            
              $scope.category.Period = period;
            };
          }
        };
      }
    ]);

})();
