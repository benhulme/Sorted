(function() {
  'use strict';
  angular.module('sorted')
    .directive('parallax', ['$window', function($window) {
      return {
        restrict: 'A',
        scope: {},
        link: function(scope, elm) {

          var parallaxFactors = [0.25, 0.2, 0.1, 0.025];

          scope.maxItems = parallaxFactors.length;

          elm.addClass('parallax-outer');

          var parallaxElms = elm.find('[parallax-layer]');
          parallaxElms.addClass('parallax-inner');

          var orderedElms = _.sortBy(parallaxElms, function(parallaxElm) {
            return parallaxElm.attributes['parallax-layer'].value;
          });

          scope.moveElements = function() {
            var numItemsMoved = 0;
            angular.forEach(orderedElms, function(orderedElm, index) {
              var parallaxFactor = 0;
              if (index < scope.maxItems) {
                parallaxFactor = parallaxFactors[index];
              } else {
                parallaxFactor = parallaxFactors[scope.maxItems - 1];
              }
              angular.element(orderedElm).css({
                top: $window.scrollY * parallaxFactor,
              });
              numItemsMoved++;
            });
            return numItemsMoved;
          };

          angular.element($window).bind('scroll', scope.moveElements);

        },
      };
    }]);

}());
