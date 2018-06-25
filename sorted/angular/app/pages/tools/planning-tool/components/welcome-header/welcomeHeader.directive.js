/**
 * Created by stanislavk on 24/08/2016.
 */
(function () {
  'use strict';

  angular.module('sorted')
    .directive('welcomeHeader', ['siteConfig', function (siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/planning-tool/components/welcome-header/welcomeHeader.html',
        restrict: 'E',
        scope: {
          data: '='
        },
        controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
          $scope.breadcrumbs = [
            {
              "title": "tools",
              "path": "tools"
            },
            {
              "title": "Goal planner",
              "path": "tools/goal-planner/welcome"
            }
          ];

          $scope.siteConfig = siteConfig;
          if (typeof $scope.data !== 'undefined') {
            $rootScope.$emit('newPageLoaded', {'title': $scope.data.Title, 'description': $scope.data.MetaDescription});
          }
        }
        ]
      };

    }]);

}());
