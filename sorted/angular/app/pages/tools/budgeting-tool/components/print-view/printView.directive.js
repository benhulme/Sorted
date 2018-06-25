/**
 * Created by stanislavk on 2/11/2016.
 */
(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('printView', [
      'siteConfig',
      function (siteConfig) {
        return {
          restrict: 'E',
          templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/components/print-view/printView.html'
        };
      }
    ]);

})();
