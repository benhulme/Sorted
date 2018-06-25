(function() {
  'use strict';
 
  function resolver (budgetTemplateResolver) {
    return budgetTemplateResolver();
  }

  resolver.$inject = ['budgetTemplateResolver'];

  angular.module('budgetingTool')
    .config(['$routeProvider', 'siteConfig', function($routeProvider, siteConfig) {
      $routeProvider
      
      .when('/tools/budgeting-tool/budget-template', {
          templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/views/budget-template/budgetTemplate.html',
          controller: 'BudgetTemplateCtrl',
          resolve: {
            viewModel: resolver
          }
      });
    }
  ]);

}());
