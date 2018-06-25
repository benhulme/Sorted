(function() {
  'use strict';
  angular.module('sorted')
    .directive('buttonSelector', [
      function() {
        return {
          restrict: 'A',
          scope: {
            ngModel: '=',
            digestCalcInput: '&',
          },
          link: function(scope, elm) {

            scope.updateValue = function(event) {
              scope.ngModel = angular.element(event.target).val();
              elm.find('button').removeClass('selected');
              angular.element(event.target).addClass('selected');
              scope.digestCalcInput();
              return scope.ngModel;
            };

            elm.on('click', 'button', scope.updateValue);

          },
        };
      },
    ]
  );
}());
