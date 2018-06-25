(function() {

  'use strict';

  angular.module('sorted')
    .config(['$routeProvider', 'siteConfig', 'profileApiProvider', 'silverStripeServiceProvider', 'calcInputServiceProvider',
      function($routeProvider, siteConfig, profileApiProvider, silverStripeServiceProvider, calcInputServiceProvider) {
      var
        calcName = 'kiwisaverFees',
        templateUrl = siteConfig.APP_PATH + 'app/pages/tools/kiwisaver-fees/kiwisaver-fees.html',
        controller = 'KiwisaverFeesController',
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
        .when('/tools/kiwisaver-fees-calculator', {
          templateUrl: templateUrl,
          controller: controller,
          resolve: resolve
        })
        .when('/tools/kiwisaver-fees-calculator/:id', {
          templateUrl: templateUrl,
          controller: controller,
          resolve: resolve
        });
    },
  ]);

}());
