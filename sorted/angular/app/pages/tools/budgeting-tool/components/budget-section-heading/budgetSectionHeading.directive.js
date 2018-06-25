(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('budgetSectionHeading', [
      'siteConfig',
      function (siteConfig) {
        return {
          restrict: 'E',
          templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/components/budget-section-heading/budgetSectionHeading.html'
        };
      }
    ]);

})();
