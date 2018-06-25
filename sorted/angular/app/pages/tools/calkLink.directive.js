/**
 * Created by stanislavk on 10/03/2016.
 */
(function() {
  'use strict';
  angular.module('sorted')
    .directive('calcLink', ['$window', function($window){
      return {
        restrict: 'A',
        link: function(scope, elm) {
          elm.on('click', '.ui-results-link', function (e) {
            e.preventDefault();
            var output = angular.element('.calc-output');
            var top = output.offset().top - 80;
            $window.scrollTo(0, top);
          });
        }
      };

    }]);
}());
