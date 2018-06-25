(function() {
  'use strict';
  angular.module('sorted')
    .directive('sequence', ['$interval', function($interval) {
      return {
        restrict: 'A',
        scope: {},
        link: function(scope, elm, attrs) {

          var sequenceElms = elm.find('[sequence-order]');
          var sequenceInterval;

          sequenceElms.addClass('_invisible');

          scope.orderedElms = _.sortBy(sequenceElms, function(sequenceElm) {
            return sequenceElm.attributes['sequence-order'].value;
          });

          scope.counter = 0;

          scope.fadeIn = function() {
            angular.element(scope.orderedElms[scope.counter]).removeClass('_invisible');
            scope.counter++;
            if (scope.counter >= scope.orderedElms.length) {
              $interval.cancel(sequenceInterval);
              return true;
            } else {
              return false;
            }
          };

          sequenceInterval = $interval(scope.fadeIn, attrs.sequence);

        },
      };
    }]);

}());
