(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('addNewCategory', [
      'siteConfig',
      function (siteConfig) {
        return {
          restrict: 'E',
          templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/components/add-new-category/addNewCategory.html'
        };
      }
    ]);

})();
