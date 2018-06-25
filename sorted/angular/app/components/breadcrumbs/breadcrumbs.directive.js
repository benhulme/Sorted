(function(){
  'use strict';

  angular.module('sorted')
    .directive('breadcrumbs', ['$location', 'siteConfig', function ($location, siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/breadcrumbs/breadcrumbs.html',
        restrict: 'E',
        controller: ['$scope', function ($scope) {
          var segments = $location.path()
            .replace(/^#?\/?/g, '')
            .split('/');
          $scope.breadcrumbs = _.map(segments, function (path, index, crumbs) {
            var title = path.replace(/-/g, ' ');
            path = index > 0 ? '/' + path : path;
            path = crumbs.slice(0, index).join('/') + path;
            return {
              title: title,
              path: path
            };
          });
        }]
      };
    }]);

})();
