(function(){
  'use strict';

  angular.module('budgetingTool')
    .directive('budgetHeader', ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/components/budget-header/budgetHeader.html',
        restrict: 'E',
      };
    }]);

})();
