(function() {
  'use strict';
  angular.module('sorted')
    .directive('calcInputQuiz',  ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/calc-input-quiz/calc-input-quiz.html',
        restrict: 'EA',
        scope: {
          calculator: '=',
          models: '=',
          updateParent: '&updateCurrentModel',
          digestCalc: '&',
        },
        link: function(scope, elm) {

          elm.on('click', '.calc-heading', function(event) {

            var selected = elm.find('.calc-input-group.selected');
            var clicked = angular.element(event.currentTarget);

            if (!clicked.parent().hasClass('selected')) {

              selected.find('.calc-input-container').slideUp();
              selected.removeClass('selected');

              clicked.parent().find('.calc-input-container').slideDown();
              clicked.parent().addClass('selected');

              var formType = clicked.attr('data-form-type');
              var unique = clicked.attr('data-unique');

              scope.updateParent({
                formType: formType,
                unique: unique,
              });

            }

          });

          scope.digestCalcInput = function() {
            scope.$digest();
            scope.digestCalc();
          };

        },
        controller: ['$scope', 'calcStaticValues',
          function($scope, calcStaticValues) {

            $scope.calcStaticValues = calcStaticValues;

            $scope.currentGroup = 'creditCard';
            $scope.currentIndex = 0;

            $scope.siteConfig = siteConfig;

            $scope.slider = {
              options: {
                floor: 1,
                ceil: 30000000,
                showSelectionBar: true,
              },
            };

          },
        ],
      };
    },
  ]);
}());
