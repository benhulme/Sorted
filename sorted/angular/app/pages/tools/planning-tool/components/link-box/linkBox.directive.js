/**
 * Created by stanislavk on 24/08/2016.
 */

(function() {
  'use strict';

  angular.module('sorted')
    .directive('linkBox',  ['siteConfig', function(siteConfig) {

      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/planning-tool/components/link-box/linkBox.html',
        restrict: 'E',
        scope: {
          data: '='
        }
      };
    }]);
}());
