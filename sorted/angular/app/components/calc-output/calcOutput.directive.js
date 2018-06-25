(function() {
  'use strict';
  angular.module('sorted')
    .directive('calcOutput',  ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/calc-output/calc-output.html',
        restrict: 'EA',
        scope: {
          calculator: '=',
          model: '=',
          sliderOptions: '=',
          formType: '=',
          floor: '=',
          save: '&',
        },
        link: function(scope, elm) {

          elm.on('click', '.calc-output-birthdate', function(event) {
            event.preventDefault();
            scope.ageFormHidden = false;
            scope.$digest();
          });

          elm.on('click', '.calc-output-save', function() {

            scope.save();

          });

          scope.$watch('model.fields.nudgeInverseTerm.value', function() {

            if (scope.model.fields.nudgeInverseTerm && scope.model.fields.totalTerm.value) {

              var value = 60 - scope.model.fields.nudgeInverseTerm.value;
              scope.model.fields.totalTerm.value = value;

            }

          });

          scope.$watch('model.fields.totalTerm.value', function() {

            if (scope.model.fields.totalTerm) {

              var value = 60 - scope.model.fields.totalTerm.value;

              scope.model.fields.nudgeInverseTerm.value = value;

            }

          });


        },
        controller: ['$scope', 'calcStaticValues', '$timeout',
          function($scope, calcStaticValues, $timeout) {

            console.log($scope.model.fields[$scope.model.nudge.model], 'result value');

            $scope.ageFormHidden = true;

            $scope.calcOutputConsts = calcStaticValues;

            $scope.$watch('model', function() {
              if ($scope.model) {

                if ($scope.model.fields.monthBorn &&
                   ($scope.model.fields.monthBorn.value || $scope.model.fields.yearBorn.value)) {
                  $scope.ageFormHidden = false;
                } else {
                  $scope.ageFormHidden = true;
                }

                if ($scope.model.nudge) {

                  if (isNaN($scope.model.nudge.options.ceil)) {
                    $scope.sliderOptions.ceil = $scope.model.fields[$scope.model.nudge.options.ceil].value;
                  } else {
                    $scope.sliderOptions.ceil = $scope.model.nudge.options.ceil;

                  }

                  if(angular.isDefined($scope.model.fields.interestFreePeriod)){
                    $scope.sliderOptions.ceil -= $scope.model.fields.interestFreePeriod.value;
                  }

                  if(angular.isDefined($scope.model.fields.deferredPaymentPeriod)){
                    $scope.sliderOptions.ceil -= $scope.model.fields.deferredPaymentPeriod.value;
                  }

                  if ($scope.model.nudge.options.ceilFactor) {
                    $scope.sliderOptions.ceil = $scope.sliderOptions.ceil / $scope.model.nudge.options.ceilFactor;
                  }

                  if (isNaN($scope.model.nudge.options.floor) && $scope.model.nudge.options.floor !== false) {
                    $scope.sliderOptions.floor = $scope.model.fields[$scope.model.nudge.options.floor].value;
                  } else if ($scope.model.nudge.options.floor !== false && $scope.model.nudge.model === 'repaymentAmount') {
                    $scope.sliderOptions.floor = $scope.model.fields.amountOwed.value * 0.02;
                  } else {
                    $scope.sliderOptions.floor = $scope.model.nudge.options.floor;
                  }

                }
                console.log($scope.model.fields[$scope.model.nudge.model], 'updated value');

                $scope.refreshSlider();

              }
            }, true);

            $scope.$watch('floor', function() {
              $scope.sliderOptions.floor = $scope.floor;

            });

            $scope.$watch('sliderOptions', function() {              
              $scope.sliderOptions.interval = 10;
              console.log($scope.sliderOptions);
              if ($scope.sliderOptions) {
                $scope.slider = {
                  options: $scope.sliderOptions,
                };
              }
            });

            $scope.refreshSlider = function () {
              $timeout(function () {
                $scope.$broadcast('rzSliderForceRender');
              });
            };

          },
        ],
      };
    },
  ]);
}());
