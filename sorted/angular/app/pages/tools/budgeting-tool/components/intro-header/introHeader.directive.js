(function(){
  'use strict';

  angular.module('budgetingTool')
    .directive('introHeader', ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/components/intro-header/introHeader.html',
        restrict: 'E',
        scope: false
      };
    }]);

})();
