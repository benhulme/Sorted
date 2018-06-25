(function() {
  'use strict';
  angular.module('sorted')
    .directive('toolTitle',  ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/tool-title/tool-title.html',
        restrict: 'E',
        scope: {
          data: '='

        },

        controller: ['$scope', '$location',
          function($scope, $location) {
            $scope.siteConfig = siteConfig;
            $scope.url = $location.absUrl();

          },
        ],
      };
    }]);

}());
