/**
 * Created by greg on 29/02/2016.
 */

(function () {
  "use strict";

  angular.module('sorted')
    .directive('calcSelect',
      ['siteConfig', function (siteConfig) {

        return {
          templateUrl: siteConfig.APP_PATH + 'app/components/calc-select/select.html',
          restrict: 'EA',
          scope: {
            field: '=',
            model: '=',
            label: '=',
          },
          controller: ['$scope', function ($scope) {
            // set the default selected item


            if (_.find($scope.field.options, {selected: true})) {
              $scope.model.set($scope.field.calcModel, _.find($scope.field.options, {selected: true}).value);
            }
          }]
        };
      }
      ]);
}());
