/**
 * Created by greg on 11/02/2016.
 */

(function(){
  "use strict";
  angular.module('sorted')
    .directive('orderBookletsItem', ['siteConfig', function (siteConfig) {

      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/order/order-booklets-item/orderBookletsItem.html',
        restrict: 'E',
        link: function(){}
      };
    }]);
}());
