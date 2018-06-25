(function() {
  'use strict';
  angular.module('sorted')
    .directive('vertMiddle', ['$window', function($window) {
      return {
        restrict: 'A',
        scope: {
          vertDisableBelow: '@',
        },
        link: function(scope, elm, attrs) {

          scope.align = function() {

            if (scope.vertDisableBelow && ($window.innerWidth <= scope.vertDisableBelow)) {
              elm.find('.' + attrs.vertMiddle).css({
                marginTop: '0',
                marginBottom: '0',
              });
              return false;
            }

            var contentHeight = elm.find('.' + attrs.vertMiddle).height();

            var containerHeight = elm.height();

            var margin = (containerHeight - contentHeight) / 2;

            elm.find('.' + attrs.vertMiddle).css({
              marginTop: margin + 'px',
              marginBottom: margin + 'px',
            });


            return margin;

          };

          elm.find('.vert-middle-preload').on('load', function() {
            scope.align();
          });

          scope.align();

          scope.checkContentHeight = function() {
            return elm.find('.' + attrs.vertMiddle).height();
          };

          scope.$watch(scope.checkContentHeight, scope.align);

          angular.element($window).bind('resize', scope.align);

        },
      };
    }]);

}());
