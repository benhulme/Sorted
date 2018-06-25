(function(){
  'use strict';
  angular.module('sorted')
    .directive('navigation', ['siteConfig', '$window', '$route', '$rootScope',
      function(siteConfig, $window, $route, $rootScope) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/navigation/navigation.html',
        restrict: 'E',
        scope: {},
        controller: ['$scope',
          function($scope) {
            $scope.siteConfig = siteConfig;
          }
        ],
        link: function(scope, elm) {

          scope.selectNav = function() {
            var currentPath = $window.location.pathname + $window.location.hash;
            var navLinks = elm.find('.nav-link');

            if (currentPath === '/') {
              angular.element('.nav-link[href="/"]').addClass('selected');
            } else {
              angular.forEach(navLinks, function(link) {
                if (angular.element(link).attr('href') !== '/') {
                  if (currentPath.search(angular.element(link).attr('href')) !== -1) {
                    angular.element(link).addClass('selected');
                  } else {
                    angular.element(link).removeClass('selected');
                  }
                }
              });
            }
          };



          $rootScope.$on('$routeChangeSuccess', scope.selectNav);

          scope.selectNav();

        },
      };
    }]);

}());
