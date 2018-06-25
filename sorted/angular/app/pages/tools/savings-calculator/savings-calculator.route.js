/**
 * Created by greg on 19/02/2016.
 */

(function() {

  'use strict';

  angular.module('sorted')
    .config(['$routeProvider', 'siteConfig', 'profileApiProvider', 'silverStripeServiceProvider', 'calcInputServiceProvider',
      function ($routeProvider, siteConfig, profileApiProvider, silverStripeServiceProvider, calcInputServiceProvider) {

      var
        calcName = 'savingsCalculator',
        templateUrl = siteConfig.APP_PATH + 'app/pages/tools/savings-calculator/savings-calculator.html',
        controller = 'SavingsCalculatorController',
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
        .when('/tools/savings-calculator', {
          templateUrl: templateUrl,
          controller: controller,
          resolve: resolve
        })
        .when('/tools/savings-calculator/:id', {
          templateUrl: templateUrl,
          controller: controller,
          resolve: resolve
        });
      }
    ]);

}());
