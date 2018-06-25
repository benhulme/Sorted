(function() {
  'use strict';
  angular.module('sorted')
    .directive('headerSmallTitle',  ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/header-small-title/header-small-title.html',
        restrict: 'EA',
        scope: {
          data: '=',
        },
        controller: ['$scope', '$rootScope', function($scope, $rootScope) {

          $scope.siteConfig = siteConfig;

          var stopWatch = $scope.$watch('data', function() {
            if ($scope.data) {
              $rootScope.$emit('newPageLoaded', {'title': $scope.data.Title, 'description': $scope.data.MetaDescription });
              stopWatch();
            }
          });
        },
        ],
      };
    }]);

}());
