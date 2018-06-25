(function() {
  'use strict';
  angular.module('sorted')
    .directive('modelLink', [
      function() {
        return {
          restrict: 'A',
          scope: {
            modelLink: '=',
            ngModel: '=',
          },
          link: function(scope) {

            scope.linkToModel = function() {
              if (scope.modelLink === 0) {
                scope.ngModel = null;
              } else {
                scope.ngModel = scope.modelLink;
              }
            };

            scope.modelToLink = function() {
              scope.modelLink = scope.ngModel;
            };

            scope.$watch('modelLink', scope.linkToModel, true);

            scope.$watch('ngModel', scope.modelToLink);

          },
        };
      },
    ]
  );

}());
