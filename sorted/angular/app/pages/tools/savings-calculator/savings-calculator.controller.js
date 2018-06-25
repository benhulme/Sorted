/**
 * Created by greg on 19/02/2016.
 */

(function () {
  "use strict";

  angular.module('sorted')
    .controller('SavingsCalculatorController',
      ['$scope', 'siteConfig', 'SavingsCalculatorModel', '$window', '$routeParams', 'isLoggedIn', 'pageData',
        'calcData', 'calcService', '$analytics',
        function ($scope, siteConfig, SavingsCalculatorModel, $window, $routeParams, isLoggedIn, pageData,
                  calcData, calcService, $analytics) {

          // Helper functions
          function createModels() {

            var
              parsedParams = [],
              calculator = new $window.SortedCalculator_Savings();

            _.forEach($scope.calculator.models, function (model) {

              var
                params = {};

              _.forEach(model.fields, function (field) {
                if (field.calcModel) {
                  params[field.calcModel] = field.value;
                }
              });

              // include additional attributes
              _.merge(params, _.pick(model, ['unique', 'name', 'id', 'type']));

              parsedParams.push(params);
            });

            return new SavingsCalculatorModel({
              models: parsedParams,
              CalcID: $scope.calculator.CalcID
            }, {
              parse: true,
              calculator: calculator
            });
          }

          function getCategoryLabel(currentModel) {
            var label = 'Term for ';

            label += $scope.getDurationDesc(currentModel);

            return label;
          }

          function getChartData(chartData, currentModel) {

            var
              hasResult = currentModel.hasResult(), // flag whether dummy data used for display or not
              contributions = [],
              interest = [],
              categories = [],
              chart = _.merge({}, chartData.options); // setup up default chart

            if (hasResult) {
              // load data from input and result objects
              contributions.push(currentModel.$attributes.initial_savings);
              contributions.push((currentModel.$attributes.type) ?
              currentModel.result.$attributes.total_saved - currentModel.result.$attributes.interest :
                currentModel.result.$attributes.contributions);

              interest.push(0); // start from 0 always
              interest.push(currentModel.result.$attributes.interest);


              var start = moment(currentModel.$attributes.starting, siteConfig.DATE_FORMAT),
                end = moment(currentModel.$attributes.ending, siteConfig.DATE_FORMAT),
                diff = moment.duration(end.diff(start));

              categories.push((currentModel.$attributes.type) ? start.format('ll') : 'Now');
              categories.push((currentModel.$attributes.type) ? end.format('ll') : _.capitalize(diff.humanize(true)));

              _.merge(chart, {
                series: [
                  {
                    name: 'Amount deposited',
                    data: contributions
                  },
                  {
                    name: 'Compound interest',
                    data: interest
                  }
                ],
                categoryAxis: {
                  title: {
                    text: getCategoryLabel(currentModel)
                  },
                  categories: categories
                }
              });
            }

            return chart;
          }

          // Init ...
          $scope.siteConfig = siteConfig;

          $scope.data = pageData.data[0]; // page content
          $scope.calculator = calcData.data;

          $scope.model = createModels();
          $scope.resultsInteraction = false;
          $scope.interaction = false;

          $scope.model.collection.currentType = 0;

          // Determine if the calculation 'results' has any meaningful values
          $scope.hasResult = function () {
            return $scope.model.hasResult();
          };

          $scope.getDurationDesc = function (currentModel) {
            var label = '';
            if (currentModel.$attributes.type === 0) { // regular amount
              label += currentModel.$attributes.regular_duration_amount;
              label += ' ';
              label += currentModel.$attributes.regular_duration_amount_type;
            }
            else { // savings goal
              var
                start = moment(currentModel.$attributes.ending, siteConfig.DATE_FORMAT),
                end = moment(currentModel.$attributes.starting, siteConfig.DATE_FORMAT),
                diff = end.diff(start);
              label += moment.duration(diff).humanize();
            }
            return label;
          };

          $scope.$watch('model.collection.currentType', function() {

            $scope.currentModel = $scope.model.collection.get($scope.model.collection.currentType);
            $scope.currentNudge = $scope.calculator.nudge[$scope.model.collection.currentType];

            $scope.$broadcast('chart:draw', getChartData($scope.calculator.chart, $scope.currentModel));

          });

          $scope.model.collection.on('change', function (model) {
              
            if(!$scope.interaction){
              $analytics.eventTrack('startinteraction', { category:'calculators', label:'savings'});
              //console.log('interaction event');
              $scope.interaction = true;
            }

            // re-calculate
            if (model.calculate().hasResult()) {
                if(!$scope.resultsInteraction){
                        $analytics.eventTrack('resultscalculated', { category:'calculators', label:'savings'});
                        $scope.resultsInteraction = true;
                    }
              $scope.$broadcast('chart:draw', getChartData($scope.calculator.chart, model));
            }
          });

          // on load, draw the chart - but wait for it to be ready to hear broadcasts
          $scope.$on('chart:ready', function () {
            $scope.$broadcast('chart:draw', getChartData($scope.calculator.chart, $scope.model.collection.get($scope.calculator.controls[0].value)));
          });

          //saving and loading

          $scope.$on('save:calc', function (event, title) {

            var modelData = calcService.prepareCollection($scope.model.collection);

            var postData = {
              CalcID: $scope.data.CalcID,
              Data: modelData,
              Title: title,
            };

            $scope.calcTitle = title;

            if ($scope.loadedId) {
              postData.ID = $scope.loadedId;
              calcService.update(postData, $scope.loadedId).then($scope.calcSaved, $scope.calcSavedFailed);
            } else {
              calcService.save(postData).then($scope.calcSaved, $scope.calcSavedFailed);
            }

          });

          $scope.calcSaved = function(response) {
            angular.element('#save-as-modal').modal('hide');
            $scope.loadId = response.data.ID;
          };

          $scope.calcSavedFailed = function(response) {
            console.error('failed ', response);
          };

          $scope.loadCalc = function(response) {
            calcService.loadCollection($scope.model.collection, response.data.data.Data);

            if (response.data.data.Data[0].result.length === 0) {
              //@TODO get the second button clicked
            }

          };

          $scope.loadCalcFailed = function(response) {
            console.error('failed ', response);
          };

          if ($routeParams.id && isLoggedIn) {
            $scope.loadedId = $routeParams.id;
            calcService.get($scope.loadedId).then($scope.loadCalc, $scope.loadCalcFailed);
          }

        }]);
}());


