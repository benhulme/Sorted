/**
 * Created by greg on 11/02/2016.
 */

(function(){
  "use strict";
  angular.module('sorted')
    .directive('orderSeminarsItem', ['siteConfig', function (siteConfig) {

      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/order/order-seminars-item/orderSeminarsItem.html',
        restrict: 'E',
        link: function(){}
      };
    }]);
}());
