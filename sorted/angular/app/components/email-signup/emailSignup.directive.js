(function() {
  'use strict';
  angular.module('sorted')
    .directive('emailSignup',  ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/email-signup/email-signup.html',
        restrict: 'E',
        scope: {},
      };
    }]);

}());
