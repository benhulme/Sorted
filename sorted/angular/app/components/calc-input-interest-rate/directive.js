

(function () {
  "use strict";
  angular.module('sorted')
    .directive('calcInputInterestRate', ['siteConfig', function (siteConfig) {

    return {
      templateUrl: siteConfig.APP_PATH + 'app/components/calc-input-interest-rate/input.html',
      restrict: 'EA',
      scope: {
        field: '=',
        model: '='
      },
      controller: ['$scope', function($scope){
        $scope.allowDecimal = true;

        // on enter press blur field
        $scope.doBlur = function($event){
          var target = $event.target;
          target.blur();
        };
      }],
      link: function (scope, elm) {
        elm.on('focus', 'input', function (event) {
          angular.element(event.currentTarget).select();
        });
      },
    };
  }]);
}());
