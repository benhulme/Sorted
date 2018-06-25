

(function () {
  "use strict";
  angular.module('sorted')
    .directive('calcInputYears', ['siteConfig', function (siteConfig) {

    return {
      templateUrl: siteConfig.APP_PATH + 'app/components/calc-input-years/input.html',
      restrict: 'EA',
      scope: {
        field: '=',
        model: '='
      },
      controller: ['$scope', function($scope){
        $scope.allowDecimal = false;

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
      }
    };
  }]);
}());
