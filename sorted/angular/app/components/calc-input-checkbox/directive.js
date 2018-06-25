

(function () {
  "use strict";
  angular.module('sorted')
    .directive('calcInputCheckbox', ['siteConfig', function (siteConfig) {

    return {
      templateUrl: siteConfig.APP_PATH + 'app/components/calc-input-checkbox/input.html',
      restrict: 'EA',
      scope: {
        field: '=',
        model: '=',
      },
      controller: ['$scope', function($scope){
        $scope.allowDecimal = false;
      }],
      link: function (scope, elm) {
        elm.on('focus', 'input', function (event) {
          angular.element(event.currentTarget).select();
        });
      }
    };
  }]);
}());
