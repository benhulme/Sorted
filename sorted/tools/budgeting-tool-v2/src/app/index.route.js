(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/tool/tool.html',
        controller: 'ToolController',
        controllerAs: 'tool'
      })
      .when('/welcome', {
        templateUrl: 'app/welcome/welcome.html',
        controller: 'WelcomeController',
        controllerAs: 'welcome'
      })
      .when('/budget-template', {
        templateUrl: 'app/budgettemplate/budgettemplate.html',
        controller: 'BudgettemplateController',
        controllerAs: 'btemplate'
      })
      .otherwise({
        redirectTo: '/welcome'
      });
  }

})();
