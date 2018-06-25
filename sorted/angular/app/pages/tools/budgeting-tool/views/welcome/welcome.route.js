(function() {
    'use strict';

  function resolver (welcomeResolver) {
    return welcomeResolver();
  }

  resolver.$inject = ['welcomeResolver'];

  angular.module('budgetingTool')
    .config(['$routeProvider', 'siteConfig', function($routeProvider, siteConfig) {
      $routeProvider
      
        .when('/tools/budgeting-tool/welcome', {
            templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/views/welcome/welcome.html',
            controller: 'WelcomeCtrl',
            resolve: {
              viewModel: resolver
            }
        });
    }]);

}());
