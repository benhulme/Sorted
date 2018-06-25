(function() {

  'use strict';

  angular.module('sorted')
   .config(['$routeProvider', 'siteConfig', 'profileApiProvider', 'silverStripeServiceProvider', 'calcInputServiceProvider',
      function($routeProvider, siteConfig, profileApiProvider, silverStripeServiceProvider, calcInputServiceProvider) {      
        var
        calcName = 'investmentPlanner',
        templateUrl = siteConfig.APP_PATH + 'app/pages/tools/investment-planner/investment-planner.html',
        controller = 'InvestmentPlannerController',
        resolve = {
          isLoggedIn: function () {
            return profileApiProvider.$get().isLoggedIn();
          },
          pageData: function () {
            return silverStripeServiceProvider.$get().get(calcName);
          },
          calcData: function () {
            return calcInputServiceProvider.$get().get(calcName);
          }
        };      


      $routeProvider
        .when('/tools/investor-kickstarter', {
          templateUrl: templateUrl,
          controller: controller,
          resolve: resolve
        })
         .when('/tools/investor-kickstarter/:id', {
          templateUrl: templateUrl,
          controller: controller,
          resolve: resolve
        });
    },
  ]);

}());
