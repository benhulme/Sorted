(function() {

  'use strict';

  angular.module('sorted')
    .config(['$routeProvider', 'siteConfig', 'profileApiProvider', 'silverStripeServiceProvider', 'calcInputServiceProvider',
      function ($routeProvider, siteConfig, profileApiProvider, silverStripeServiceProvider, calcInputServiceProvider) {

      var
        calcName = 'retirementPlanner',
        templateUrl = siteConfig.APP_PATH + 'app/pages/tools/retirement-planner/retirement-planner.html',
        controller = 'RetirementPlannerController',
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
        .when('/tools/retirement-planner', {
          templateUrl: templateUrl,
          controller: controller,
          resolve: resolve
        })
        .when('/tools/retirement-planner/:id', {
          templateUrl: templateUrl,
          controller: controller,
          resolve: resolve
        });
    },
  ]);

}());
