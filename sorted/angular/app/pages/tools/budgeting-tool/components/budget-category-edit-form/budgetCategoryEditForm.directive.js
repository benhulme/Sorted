(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('budgetCategoryEditForm', [
      'siteConfig',
      function (siteConfig) {
        return {
          restrict: 'E',
          templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/components/budget-category-edit-form/budgetCategoryEditForm.html'
        };
      }
    ]);

})();
