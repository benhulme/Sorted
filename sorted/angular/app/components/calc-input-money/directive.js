/**
 * Created by greg on 19/02/2016.
 */

(function () {
  'use strict';
  angular.module('sorted')
    .directive('calcInputMoney', ['siteConfig', function (siteConfig) {


      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/calc-input-money/input.html',
        restrict: 'EA',
        scope: {
          field: '=',
          model: '=',
          validation: '=',
          form: '=',
        },
        link: function (scope, elm) {
          scope.$watch('model.$attributes', function()
          {
            // We don't like commas specifically in our numbers
            var temp;
            temp = angular.copy(scope.model.$attributes[scope.field.calcModel]);
            if((temp!==undefined) && (typeof temp === 'string')) {
              temp = temp.replace(/,/g,'');
              if(scope.model.$attributes[scope.field.calcModel] !== temp) {
                scope.model.$attributes[scope.field.calcModel] = temp;
              }
            }

          }, true);

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
