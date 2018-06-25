(function(){
  'use strict';

  angular.module('sorted')
    .directive('headerShareButtons', ['siteConfig', function (siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/header-share-buttons/headerShareButtons.html',
        restrict: 'E',
        scope: {
          facebook: '@',
          twitter: '@',
          gplus: '@',
          email: '@'
        },
        link: function ($scope) {
          $scope.siteConfig = siteConfig;
        }
      };
    }]);

})();
