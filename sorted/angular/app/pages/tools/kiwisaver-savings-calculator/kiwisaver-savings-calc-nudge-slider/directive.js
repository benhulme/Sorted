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
    .directive('kiwisaverSavingsCalcNudgeSlider', ['siteConfig', function (siteConfig) {

      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/kiwisaver-savings-calculator/kiwisaver-savings-calc-nudge-slider/slider.html',
        restrict: 'EA',
        scope: {
          model: '=',
          nudge: '='
        },
        link: function (scope) {

          scope.$watch('model.$attributes', function() {
            if (scope.nudge.field === 'kiwisaver_contribs_self') {
              //slider ceil is 30% of salary broken down to contribution frequency
              var sliderCeil = Math.round((scope.model.$attributes.salary / scope.model.$attributes.contrib_freq) * 0.3);
              scope.nudge.options.ceil = sliderCeil;
            }
          }, true);

          scope.$on('slideEnded', function () {
            var value;
            //if(scope.nudge.field === 'kiwisaver_contribs'){
              //value = scope.nudge.options.stepsArray[scope.nudgeModel].toString();
            //}else{
              value = scope.nudgeModel;
            //}
            console.log(value, 'new value');     
            scope.$apply(scope.model.set(scope.nudge.field, value));
          });
        },
        controller: ['$scope', function ($scope) {
          // set default value from json config
          //$scope.nudgeModel = _.findIndex($scope.nudge.options.stepsArray, $scope.model.get($scope.nudge.field));   
          $scope.nudgeModel = 3;
          console.log($scope.nudgeModel, 'inital value');       

        }]

      };
    }]);


}());


