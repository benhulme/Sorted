/**
 * Created by greg on 22/02/2016.
 */
/**
 * Created by greg on 19/02/2016.
 */

(function () {
  'use strict';
  angular.module('sorted')
    .directive('calcInputNumber', ['siteConfig', function (siteConfig) {

      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/calc-input-number/input.html',
        restrict: 'EA',
        scope: {
          field: '=',
          model: '='
        },
        link: function (scope, elm) {
          elm.on('focus', 'input', function (event) {
            angular.element(event.currentTarget).select();
          });
        },
        controller: ['$scope',
          function($scope) {            
  
            // on enter press blur field
            $scope.doBlur = function($event){
              var target = $event.target;
              target.blur();
            };
  
          },
        ],
      };
    }]);
}());
