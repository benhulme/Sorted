/*
(function () {
  'use strict';

  function resolver (budgetingToolResolver) {
    return budgetingToolResolver();
  }

  resolver.$inject = ['budgetingToolResolver'];

  angular.module('budgetingTool')
    .config([
      '$routeProvider',
      'siteConfig',
      function ($routeProvider, siteConfig) {
        $routeProvider

        // NOTE: embeds a redirect if there is no budget to display (that is,
        // if the user is not logged in and/or has not been through the questions)
          .when('/tools/budgeting-tool', {
            templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/budgetingTool.html',
            controller: 'BudgetingToolCtrl',
            resolve: {
              viewModel: resolver
            }
          });
      }
    ]);

})();
*/