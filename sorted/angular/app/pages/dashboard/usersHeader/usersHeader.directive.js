/**
 * Created by stanislavk on 26/02/2016.
 */
(function(){
  'use strict';
  angular.module('sorted')
    .directive('usersHeader', ['siteConfig', function(siteConfig) {
    return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/dashboard/usersHeader/usersHeader.html',
        restrict: 'E'

      };
    }]);

}());

/**
 * Created by stanislavk on 3/03/2016.
 */
