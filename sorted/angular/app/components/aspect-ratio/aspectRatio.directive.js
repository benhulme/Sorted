(function() {
  'use strict';
  angular.module('sorted')
    .directive('aspectRatio', ['$window', function($window) {
      return {
        restrict: 'A',
        scope: {
          aspectRatio: '@',
        },
        link: function(scope, elm) {

          scope.resize = function() {

            var contentWidth = elm.width();

            var ratios = scope.aspectRatio.split(':');

            if (ratios.length !== 2) {
              return false;
            }

            scope.ratioX = parseInt(ratios[0]);
            scope.ratioY = parseInt(ratios[1]);

            if (isNaN(scope.ratioX) || isNaN(scope.ratioY)) {
              return false;
            }

            if (scope.ratioX <= 0 || scope.ratioY <= 0) {
              return false;
            }

            var newHeight = (contentWidth / scope.ratioX) * scope.ratioY;

            elm.css({
              height: newHeight + 'px',
            });

            return newHeight;
          };

          scope.resize();

          scope.checkContentWidth = function() {
            return elm.width();
          };

          scope.$watch(scope.checkContentWidth, scope.resize);

          angular.element($window).bind('resize', scope.resize);

        },
      };
    }]);

}());
