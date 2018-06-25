/**
 * Created by greg on 15/02/2016.
 */
/* jshint ignore:start */

(function () {
  'use strict';

  angular.module('sorted')
    .controller('NetWorthCalculatorController',
      ['$scope', 'siteConfig', 'NetWorthCalculatorModel', '$window', '$routeParams', 'isLoggedIn', 'pageData',
        'calcData', '$analytics',
        function ($scope, siteConfig, NetWorthCalculatorModel, $window, $routeParams, isLoggedIn, pageData,
                  calcData, $analytics) {

          // Helper methods
          function getChartData(data) {

            var
              hasResult = $scope.model.hasResult(), // flag whether dummy data used for display or not
              netWorthData = [],
              assetsData = [],
              debtsData = [],
              categoriesData = [],

              dummyData = _.merge({}, {
                  // build year categories dynamically
                  categories: _.map([0, 10, 20], function (input) {
                    return getYear(input.value);
                  })
                },
                {assets: data.dummyData.assets},
                {debts: data.dummyData.debts},
                {
                  netWorth: [
                    _.add(data.dummyData.assets[0], data.dummyData.debts[0]),
                    _.add(data.dummyData.assets[1], data.dummyData.debts[1]),
                    _.add(data.dummyData.assets[2], data.dummyData.debts[2])
                  ]
                }
              );

            // Build the chart data
            // criteria for inclusion is either 'assets' or 'debts' <> 0
            $scope.model.collection.forEach(function (model) {
              addSeriesData(model);
            });

            var chartData = _.merge({}, data.options);
            chartData.categoryAxis.categories = (hasResult) ? categoriesData : dummyData.categories;


            // Set Chart options and data and populate dummy data if no current result
            _.merge(
              chartData,
              // series data and labels
              {
                series: [
                  // Assets
                  _.merge({}, {
                    data: (hasResult) ? assetsData : dummyData.assets,
                    stack: 'Savings/Debts',
                    name: 'Assets',
                    color: "#20d4af"
                  }),
                  // Debts
                  _.merge({}, {
                    data: (hasResult) ? debtsData : dummyData.debts,
                    stack: 'Savings/Debts',
                    name: 'Liabilities',
                    color: "#ce0058"
                  }),
                  // Net Worth
                  _.merge({}, {
                    data: (hasResult) ? netWorthData : dummyData.netWorth,
                    stack: 'Total',
                    name: 'Your net worth',
                    color: "#00afff"
                  })
                ]
              }
            );


            return chartData;


            // helper functions
            function getYear(fromNow) {
              var currentYear = new Date().getFullYear();
              return (parseInt(fromNow)) ? new Date(currentYear + parseInt(fromNow)).getFullYear() : currentYear;
            }

            function addSeriesData(model) {
              if (model.result.get('sum_total') !== 0 || model.result.get('debt_total') !== 0) {

                // push the result values into the respective chartData arrays
                netWorthData.push(model.result.get('total'));
                assetsData.push(model.result.get('sum_total'));
                debtsData.push(parseInt(model.result.get('debt_total') * -1));

                var fromNow = model.get('identifier'); // poorly named int indicating number years from now
                categoriesData.push(getYear(fromNow));
              }
            }
          }

          function createModels() {

            var
              parsedParams = [],
              calculator = new $window.SortedCalculator_Net_Worth();

            // loop through each json model
            _.forEach($scope.calculator.models, function (model) {
              var
                params = {};

              // loop through the fields for the current model
              _.forEach(model.fields, function (field) {
                if (field.calcModel) {
                  params[field.calcModel] = field.value;
                }
              });

              // include 'unique' and 'identifier' attributes
              _.merge(params, _.pick(model, ['unique', 'identifier', 'id']));

              parsedParams.push(params);
            });


            // pass in a reference to the 'sorted calculator'
            return new NetWorthCalculatorModel({
                models: parsedParams,
                CalcID: $scope.calculator.CalcID
              },
              {
                parse: true,
                calculator: calculator
              }
            );
          }

          // Init ...
          $scope.siteConfig = siteConfig;

          $scope.data = pageData.data[0]; // page content
          $scope.calculator = calcData.data;

          //$scope.models = createModels();     // Setup a collection of Models
          $scope.model = createModels();     // Setup a wrapper model object
            
          $scope.resultsInteraction = false;
          $scope.interaction = false;

          // Determine if the calculation 'results' has any meaningful values
          $scope.hasResult = function () {
            return $scope.model.hasResult();
          };

          // draw the default chart
          $scope.$broadcast('chart:draw', getChartData(_.cloneDeep($scope.calculator.chart)));

          // now setup a watch on the models (collection)
          $scope.model.collection.on('change', function (model) {
            if(!$scope.interaction){
              $analytics.eventTrack('startinteraction', { category:'calculators', label:'networth'});
              //console.log('interaction event');
              $scope.interaction = true;
            }    
            // re-calculate
            if (model.calculate().hasResult()) {
                if(!$scope.resultsInteraction){
                        $analytics.eventTrack('resultscalculated', { category:'calculators', label:'networth'});
                        $scope.resultsInteraction = true;
                    }
              $scope.$broadcast('chart:draw', getChartData(_.cloneDeep($scope.calculator.chart)));
            }
          });

          /**
           * If url has param, then assume loading 'existing' calculator
           * @param id is calculator id provided by back-end
           *
           */
          if (_.has($routeParams, 'id')) {

            // check if User is Logged In
            if (isLoggedIn) {

              $scope.model
                .set('ID', $routeParams.id)
                .fetch({
                  parse: true,
                  success: function (model, response, options) {
                    console.info('success: ', model, response, options);
                  },
                  error: function (model, response, options) {
                    console.error('error: ', model, response, options);
                    // TODO  need to handle exceptions here.

                    // status 404 and message
                    // '{status:'error', message: 'Data Not found'}
                  }
                });
            }

          }

          $scope.$on('chart:ready', function(){
            // draw the default chart
            $scope.$broadcast('chart:draw', getChartData($scope.calculator.chart));
          });

        }
      ]
    );
}());
/* jshint ignore:end */
