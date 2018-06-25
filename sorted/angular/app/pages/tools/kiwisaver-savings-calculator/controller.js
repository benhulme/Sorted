/**
 * Created by greg on 1/03/2016.
 */

// jshint ignore: start

(function () {
  "use strict";

  angular.module('sorted')
    .controller('KiwisaverSavingsController',
      ['$scope', 'siteConfig', 'KiwiSaverSavingsModel', '$window', '$routeParams', 'isLoggedIn', 'pageData', 'calcData','$analytics',
        function ($scope, siteConfig, SavingsCalculatorModel, $window, $routeParams, isLoggedIn, pageData, calcData, $analytics) {

          // Helper methods
          function createModel() {
            var params = {};
            _.forEach($scope.calculator.fields, function (itm) {
              params[itm.calcModel] = itm.value;
            });

            // merge in the CalcID for identification in backend.
            _.merge(params, _.pick($scope.calculator, 'CalcID'));

            return new SavingsCalculatorModel(params, {parse: true});
          }

          var calculator = new $window.SortedCalculator_KiwiSaver();

          // Init...
          $scope.siteConfig = siteConfig;

          $scope.data = pageData.data[0]; // page content
          $scope.calculator = calcData.data;
          $scope.model = createModel(calcData.data);
          $scope.resultsInteraction = false;
          $scope.interaction = false;
          $scope.loadChange = 0;

          // Determine if the calculation 'results' has any meaningful values
          $scope.hasResult = function () {    
            var answer = (!_.isEmpty($scope.model)) ? $scope.model.hasResult() : false;

            if(answer){
            //console.log('has results', $scope.model);
              if(!$scope.resultsInteraction){
                //console.log('resultsInteraction fired');
                        $analytics.eventTrack('resultscalculated', { category:'calculators', label:'KS savings'});
                        $scope.resultsInteraction = true;
                    }
            }

            return answer;
          };

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
                    //console.info('success: ', model, response, options);
                  },

                  error: function (model, response, options) {
                    // TODO  need to handle exceptions here.

                    // status 404 and message
                    // '{status:'error', message: 'Data Not found'}
                  }
                });
            }

          }

          // watch for changes and recalculate
          $scope.$watch('model.$attributes', function () {
            if($scope.loadChange > 1){
              if(!$scope.interaction){
                    $analytics.eventTrack('startinteraction', { category:'calculators', label:'KS savings'});
                    //console.log('interaction event', $scope.loadChange);
                    $scope.interaction = true;
                }  
            }else{
              //console.log('loaded');
              $scope.loadChange++;
            }
            //console.log('model.attributes');
            $scope.model.calculate(calculator);
          }, true);

        }
      ]);
}());
