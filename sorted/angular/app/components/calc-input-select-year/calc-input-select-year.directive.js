/**
 * Created by greg on 22/02/2016.
 */

(function () {
  "use strict";

  angular.module('sorted')
    .directive('calcInputSelectYear',
      ['siteConfig', function (siteConfig) {

        return {
          templateUrl: siteConfig.APP_PATH + 'app/components/calc-input-select-year/input.html',
          restrict: 'EA',
          scope: {
            field: '=',
            model: '='
          },
          link: function ($scope, el) {

            /**
             * listen for datepicker change event to set value on model
             */
            el.on('change', 'input', function (event) {
              var newDate = angular.element(event.currentTarget).data('kendoDatePicker').value(),
                newYear = moment(newDate).year();

              // does not require format string in constructor as is ISO compliant datetime string
              $scope.model.set($scope.field.calcModel, newYear);
            });

          },
          controller: ['$scope', function ($scope) {
            // move to config
            $scope.options = {
              format: 'yyyy',
              start: 'decade',
              depth: 'decade',
              max: moment().toDate(),
              min: moment().add(moment.duration(-100, 'years')).toDate(),
              footer: null
            };

            // set the default value if present
            $scope.dateModel = $scope.model.get($scope.field.calcModel);

            $scope.$watch('model.$attributes[field.calcModel]', function () {
              // update the input value
              $scope.dateModel = $scope.model.get($scope.field.calcModel);
            }, true);
          }]
        };
      }]);
}());
