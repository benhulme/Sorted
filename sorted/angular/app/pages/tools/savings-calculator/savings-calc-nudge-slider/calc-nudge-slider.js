/**
 * Created by greg on 24/02/2016.
 *
 * To support consistent slider behaviour, the starting & ending millisecond
 * values have been inverted (e.g. * -1) and mapped to the inverse ceil & floor slider
 * options to achieve a -> Increase | <- Decrease savings amount behaviour.
 *
 *
 */
(function () {
  'use strict';
  angular.module('sorted')
    .directive('savingsCalcNudgeSlider', ['siteConfig', 'moment', function (siteConfig, moment) {

      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/savings-calculator/savings-calc-nudge-slider/slider.html',
        restrict: 'EA',
        scope: {
          model: '=',
          nudge: '=',
        },
        link: function (scope) {

          scope.sliderChange = false;

          scope.$on('slideEnded', function () {

            scope.sliderChange = true;

            if (scope.model.get('type') === 1) {
              var newEnding = moment(Math.abs(scope.nudgeModel));
              scope.$apply(scope.model.set('ending', newEnding.format(siteConfig.DATE_FORMAT)));

            } else {
              scope.$apply(scope.model.set('regular_amount', scope.nudgeModel));
            }

            scope.sliderChange = false;

          });
        },
        controller: ['$scope','$timeout', function($scope,$timeout) {

          $scope.$watch('model.attributes', function() {

            $scope.refreshSlider();
            if (($scope.model.changed.ending || $scope.model.changed.starting) && !$scope.sliderChange && $scope.model.attributes.type === 1) {



              //@TODO update the ceil and floor values of the slider
              $scope.nudge.options.ceil = (moment($scope.model.$attributes.starting, siteConfig.DATE_FORMAT).add(7, 'days').valueOf() * -1);
              $scope.nudge.options.floor = moment($scope.model.$attributes.ending, siteConfig.DATE_FORMAT).valueOf() * -1;


              if($scope.nudgeModel> $scope.nudge.options.ceil || $scope.nudgeModel < $scope.nudge.options.floor){
                $scope.nudgeModel = NaN;
              }

              $scope.nudge.options.step = moment.duration(1, 'day').asMilliseconds();
            }



          }, true);

          $scope.refreshSlider = function () {
            $timeout(function () {

              $scope.$broadcast('rzSliderForceRender');
            });
          };
        },
      ]

      };
    }]);

}());


