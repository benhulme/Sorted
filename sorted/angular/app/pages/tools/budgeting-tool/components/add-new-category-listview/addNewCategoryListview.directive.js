(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('addNewCategoryListview', [
      'siteConfig',
      function (siteConfig) {
        return {
          restrict: 'E',
          templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/components/add-new-category-listview/addNewCategoryListview.html'
        };
      }
    ]);

})();
