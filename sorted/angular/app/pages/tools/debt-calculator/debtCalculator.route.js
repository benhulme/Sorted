(function() {

  'use strict';

  angular.module('sorted')
    .config(['$routeProvider', 'siteConfig', 'profileApiProvider', 'silverStripeServiceProvider', 'calcInputServiceProvider',
      function ($routeProvider, siteConfig, profileApiProvider, silverStripeServiceProvider, calcInputServiceProvider) {

      var
        calcName = 'debtCalculator',
        templateUrl = siteConfig.APP_PATH + 'app/pages/tools/debt-calculator/debt-calculator.html',
        controller = 'DebtCalculatorController',
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
        .when('/tools/debt-calculator', {
          templateUrl: templateUrl,
          controller: controller,
          resolve: resolve,
        })
        .when('/tools/debt-calculator/:id', {
          templateUrl: templateUrl,
          controller: controller,
          resolve: resolve,
        });
    },
  ]);

}());
