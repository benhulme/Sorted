(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('budgetCategoryFacade', [
      'siteConfig',
      function (siteConfig) {
        return {
          restrict: 'E',
          templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/components/budget-category-facade/budgetCategoryFacade.html'
        };
      }
    ]);

})();
