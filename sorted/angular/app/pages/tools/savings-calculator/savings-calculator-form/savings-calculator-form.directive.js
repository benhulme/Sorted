/**
 * Created by greg on 19/02/2016.
 */

(function () {
  'use strict';
  angular.module('sorted')
    .directive('savingsCalculatorForm', ['siteConfig', function(siteConfig){

      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/savings-calculator/savings-calculator-form/form.html',
        restrict: 'EA',
        scope: {
          models: '=',
          calculator: '=',
          nudge: '=',
        },
        link: function(scope, elm) {

          elm.on('blur', '#regularAmount', function(event) {

            var amount = parseInt(angular.element(event.currentTarget).val());

            scope.nudge.options.ceil = amount * 5;
            scope.nudge.options.floor = amount;

          });

          scope.selectedButton = 0;

          elm.on('click', '.savings-calc-type-selector .input-select-button', function (event) {

            var clicked = angular.element(event.currentTarget);

            scope.$apply(function () {
              scope.selectedButton = parseInt(clicked.attr('data-value'));
            });

            // if data-related attribute defined, trigger visibility
            // hide other all toggle
            if (clicked.data('related')) {
              var related = angular.element(clicked.data('related'));

              related.parent().find(clicked.data('toggle')).addClass('_hidden');

              // show related
              related.removeClass('_hidden');
            }

            if (scope.selectedButton === 0) {
              angular.element('#savingsGoalResult').addClass('_hidden');
              angular.element('#regularSavingsResult').removeClass('_hidden');
            } else {
              angular.element('#savingsGoalResult').removeClass('_hidden');
              angular.element('#regularSavingsResult').addClass('_hidden');
            }

            if (scope.models) {
              scope.$apply(function() {
                scope.models.currentType = clicked.data('value');
              });
            }

          });
        },
        controller: ['$scope', function($scope) {
            $scope.getValidation = function(modelId, fieldId) {
              var model = _.find($scope.calculator.models, { id: modelId });
              var field = _.find(model.fields, { id: fieldId });
              return field.validation;
            };
          },
        ],
      };
    }]);

}());
