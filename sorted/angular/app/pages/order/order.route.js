/**
 * Created by greg on 10/02/2016.
 */

(function() {
  'use strict';

  angular.module('sorted')
    .config(['$routeProvider', 'siteConfig', function ($routeProvider, siteConfig) {

      $routeProvider
        .when('/order', {
          templateUrl: siteConfig.APP_PATH + 'app/pages/order/order.html',
          controller: 'OrderController'
        });
    }]);

}());
