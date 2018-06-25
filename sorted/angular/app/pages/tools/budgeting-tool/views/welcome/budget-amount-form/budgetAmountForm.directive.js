(function(){
  'use strict';

  angular.module('budgetingTool')
    .directive('budgetAmountForm', ['$location', 'siteConfig', function($location, siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/views/welcome/budget-amount-form/budgetAmountForm.html',
        restrict: 'E'
      };
    }]);

})();
