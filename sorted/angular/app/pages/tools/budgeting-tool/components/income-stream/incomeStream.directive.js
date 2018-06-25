(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('incomeStream', ['siteConfig', function (siteConfig) {
      return {
        restrict: 'E',
        scope: {
          placeholder: '@',
          stream: '=model',
          period: '=',
          removeStream: '&'
        },
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/components/income-stream/incomeStream.html'
      };
    }]);

})();
