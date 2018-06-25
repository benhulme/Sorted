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
    .directive('calcNudgeSlider', ['siteConfig', function (siteConfig) {

      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/calc-nudge-slider/slider.html',
        restrict: 'EA',
        scope: {
          model: '=',
          nudge: '='
        },
        link: function (scope) {
          scope.$on('slideEnded', function () {


            /*if (scope.model.get('type')) { // == 1 -> goal => 'ending' date
              // nudgeModel is a valueOf moment.duration from start
              var newEnding = moment(Math.abs(scope.nudgeModel)); // new date milliseconds since epoch
              scope.model.set('ending', newEnding.format(siteConfig.DATE_FORMAT));
            }
            else { // regular amount => integer
              scope.model.set('regular_amount', scope.nudgeModel);
            }*/

            scope.$apply(scope.model.set(scope.nudge.field, scope.nudgeModel));

            // notify parent directive of change
            //scope.$emit('result:redraw'); // upwards through parent scopes

          });
        },
        controller: ['$scope', function ($scope) {

          // set default value from json config
          $scope.nudgeModel = $scope.model.$attributes[$scope.nudge.field];

          // store default values for each saving type
          /*$scope.defaults = _.merge({}, {
            regular_amount: $scope.nudge.options,
            ending: {
              floor: null, // ending not available immediately
              ceil: moment($scope.model.$attributes.starting, siteConfig.DATE_FORMAT).valueOf() * -1,
              step: moment.duration(1, 'day').asMilliseconds()
            }
          });*/

          $scope.$watch('model.result.$attributes', function () {

            console.error('nudge slider watch fired with no logic present');

            /*if (_.has($scope.model, 'result')) {

              // type 1 -> goal => 'ending' date
              if ($scope.model.get('type')) {

                // ceiling is not initially available, so set it the first time
                if (_.isNull($scope.defaults.ending.floor) && $scope.model.get('ending').length > 0) {
                  _.merge($scope.defaults.ending, {
                    floor: moment($scope.model.$attributes.ending, siteConfig.DATE_FORMAT).add(1, 'months').valueOf() * -1
                  });
                }
                // if the user has updated the ending date to exceed the initial ceiling
                // OR conversely has modified the starting date, reset these values
                else if (moment($scope.model.get('ending'), siteConfig.DATE_FORMAT).isAfter(moment(Math.abs($scope.defaults.ending.floor))) || !moment($scope.model.get('starting'), siteConfig.DATE_FORMAT).isSame(moment(Math.abs($scope.defaults.ending.ceil))
                  )) {
                  _.merge($scope.defaults.ending, {
                    ceil: moment($scope.model.$attributes.starting, siteConfig.DATE_FORMAT).valueOf() * -1,
                    floor: moment($scope.model.$attributes.ending, siteConfig.DATE_FORMAT).add(1, 'months').valueOf() * -1
                  });
                }

                // update the nudge options for ending aka savings goal
                _.merge($scope.nudge.options, $scope.defaults.ending);

                // update the nudgeModel value
                $scope.nudgeModel = moment($scope.model.$attributes.ending, siteConfig.DATE_FORMAT).valueOf() * -1;
              }
              // type 0 -> regular amount => integer
              else {
                _.merge($scope.nudge.options, $scope.defaults.regular_amount);
                $scope.nudgeModel = $scope.model.$attributes.regular_amount;
              }

            }*/
          }, true);
        }]

      };
    }]);

  /**
   *
   * var testObj4 = {
  type: "1",
  saving_amount: "5000",
  regular_amount: "",
  saving_freq: "52",
  starting: "04/01/2013",
  ending: "13/03/2013",
  initial_savings: "200",
  interest_rate: "5.2",
  age_month: "1",
  age_year: "1913",
  iar: 1,
  nudge_dollars: 530,
  expected: {
    age: 100,
    contributions: null,
    interest: 14.25,
    period: 4,
    total: 480.15,
    total_saved: 5000,
    nudge_age: 100,
    nudge_interest: 12.83,
    nudge_period: 3,
    nudge_total: 530,
    nudge_total_saved: 4976.80
  }
};
   *
   */

  /**
   *
   * var testObj5 = {
  type: "0",
  saving_amount: "",
  regular_amount: "1",
  saving_freq: "52",
  starting: "31/01/2020",
  ending: "31/01/2021",
  initial_savings: "",
  interest_rate: "2",
  age_month: "1",
  age_year: "2000",
  iar: 0,
  nudge_dollars: 10,
  expected: {
    age: 21,
    contributions: 1,
    interest: 0.51,
    period: 12,
    total: 52.51,
    total_saved: '',
    nudge_age: 21,
    nudge_interest: 5.08,
    nudge_period: 12,
    nudge_total: 10,
    nudge_total_saved: 525.08
  }
};
   *
   */

}());


