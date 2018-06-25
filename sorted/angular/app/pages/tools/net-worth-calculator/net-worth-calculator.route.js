/**
 * Created by greg on 15/02/2016.
 */
(function () {

  'use strict';

  angular.module('sorted')
    .config(['$routeProvider', 'siteConfig', 'profileApiProvider', 'silverStripeServiceProvider', 'calcInputServiceProvider',
      function ($routeProvider, siteConfig, profileApiProvider, silverStripeServiceProvider, calcInputServiceProvider) {

        var
          calcName = 'netWorthCalculator',
          templateUrl = siteConfig.APP_PATH + 'app/pages/tools/net-worth-calculator/net-worth-calculator.html',
          controller = 'NetWorthCalculatorController',
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
          .when('/tools/net-worth-calculator', {
            templateUrl: templateUrl,
            controller: controller,
            resolve: resolve
          })
          .when('/tools/net-worth-calculator/:id', {
            templateUrl: templateUrl,
            controller: controller,
            resolve: resolve
          });
      }
    ]);

}());
