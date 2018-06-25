(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('mobileSave', [
      'siteConfig',
      function (siteConfig) {
        return {
          restrict: 'E',
          templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/components/mobile-save/mobileSave.html'
        };
      }
    ]);
    
})();
