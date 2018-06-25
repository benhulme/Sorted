/**
 * Created by greg on 1/03/2016.
 */

(function() {

  'use strict';

  angular.module('sorted')
    .config(['$routeProvider', 'siteConfig', 'profileApiProvider', 'silverStripeServiceProvider', 'calcInputServiceProvider',
      function($routeProvider, siteConfig, profileApiProvider, silverStripeServiceProvider, calcInputServiceProvider) {

        var resolve = {
          isLoggedIn: function(){
            return profileApiProvider.$get().isLoggedIn();
          },
          pageData: function () {
            return silverStripeServiceProvider.$get().get('kiwisaverSavingsCalculator');
          },
          calcData: function () {
            return calcInputServiceProvider.$get().get('kiwisaverSavingsCalculator');
          }
        };

      $routeProvider
        .when('/tools/kiwisaver-savings-calculator', {
          templateUrl: siteConfig.APP_PATH + 'app/pages/tools/kiwisaver-savings-calculator/index.html',
          controller: 'KiwisaverSavingsController',
          resolve: resolve
        })
        .when('/tools/kiwisaver-savings-calculator/:id/', {
          templateUrl: siteConfig.APP_PATH + 'app/pages/tools/kiwisaver-savings-calculator/index.html',
          controller: 'KiwisaverSavingsController',
          resolve: resolve
        });

    }
    ]);

}());
