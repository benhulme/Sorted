(function() {
  'use strict';
  angular.module('sorted')
    .directive('scrollFade', ['$window', '$timeout', function($window, $timeout) {
      return {
        restrict: 'A',
        scope: {},
        link: function(scope, elm) {

          scope.fadeElements = function() {
            if (scope.isInView()) {
              elm.find('[scroll-fade-item]').removeClass('scroll-fade-invisible');
              return true;
            } else {
              return false;
            }
          };

          scope.isInView = function() {
            var elmHeight = elm.height();
            var elmOffset = elm[0].getBoundingClientRect().top;
            var windowHeight = $window.innerHeight;

            if (elmOffset + (elmHeight / 2) < windowHeight) {
              return true;
            } else {
              return false;
            }
          };

          scope.getItemsLength = function() {
            return elm.find('[scroll-fade-item]').length;
          };

          scope.setupFades = function(newVal) {
            if (newVal === 0) {
              return false;
            } else {
              scope.watchDestroy();

              //disabled for tablet and below
              if ($window.innerWidth > 1024 && !scope.isInView()) {
                elm.find('[scroll-fade-item]').addClass('scroll-fade-invisible scroll-fade-transitioner');
                return true;
              } else {
                return false;
              }

            }

          };

          //timeout introduced to avoid issues of wrong element offset on page change

          $timeout(function() {
            scope.watchDestroy = scope.$watch(scope.getItemsLength, scope.setupFades);
            angular.element($window).bind('scroll', scope.fadeElements);
          }, 100);

        },
      };
    }]);

}());
