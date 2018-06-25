(function() {
  'use strict';
  angular.module('sorted')
    .directive('cmPrint',  ['$window','$analytics', function($window, $analytics) {
      return {
        restrict: 'A',
        scope: {},
        link: function(scope, elm) {

          elm.on('click', function(event) {
            $analytics.eventTrack('button', { category:'print', action: 'button'});
            event.preventDefault();
            $window.print();

          });

        },
      };
    },
  ]);
}());
