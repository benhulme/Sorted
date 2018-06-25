/**
 * Created by stanislavk on 4/03/2016.
 */
(function(){
  'use strict';
  angular.module('sorted')
    .directive('modalWindow', ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/dashboard/modalWindow/modalWindow.html',
        restrict: 'E'

      };
    }]);

}());
