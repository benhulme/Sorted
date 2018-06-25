/**
 * Created by greg on 22/02/2016.
 */

(function () {
  "use strict";

  angular.module('sorted')
    .directive('calcInputSelectDate',
      ['siteConfig', function (siteConfig) {

        return {
          templateUrl: siteConfig.APP_PATH + 'app/components/calc-input-select-date/input.html',
          restrict: 'EA',
          scope: {
            field: '=',
            model: '='
          },
          link: function ($scope, el) {

            /**
             * listen for datepicker change event to set value on model
             */
            el.on('change', 'input', function(event){

              var newDate = angular.element(event.currentTarget).val();
              var formattedDate = moment(Date.parse(newDate));

              // does not require format string in constructor as is ISO compliant datetime string
              $scope.model.set($scope.field.calcModel, (formattedDate.isValid()) ? formattedDate.format(siteConfig.DATE_FORMAT) : '');
            });

          },
          controller: ['$scope', function($scope){
            // move to config
            $scope.options = {
              format: 'dd/MM/yyyy',
              parseFormats: [siteConfig.DATE_FORMAT]
            };

            // set the default value if present
            $scope.dateModel = $scope.model.get($scope.field.calcModel);

            $scope.$watch('model.$attributes[field.calcModel]', function () {
              // update the input value
              if ($scope.model) {
                $scope.dateModel = $scope.model.get($scope.field.calcModel);
              }
            }, true);
          }]
        };
      }]);
}());
