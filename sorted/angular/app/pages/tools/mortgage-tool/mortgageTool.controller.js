// jshint ignore:start
(function () {
  'use strict';

  angular.module('sorted')
    .controller('MortgageToolController',
      ['$scope', 'siteConfig', 'MortgageToolModel', '$window', '$routeParams', 'isLoggedIn', 'pageData', 'calcData', '$analytics',
        function ($scope, siteConfig, MortgageToolModel, $window, $routeParams, isLoggedIn, pageData, calcData, $analytics) {

          function createModel() {

            var
              parsedParams = [],
              mortgageManager = new $window.SortedCalculator_Mortgage_Manager(),
              mortgageRepayment = new $window.SortedCalculator_Mortgage_Repayment();

            // loop through each json model
            _.forEach($scope.calculator.inputs, function (model) {
              var
                params = {};

              // loop through the fields for the current model
              _.forEach($scope.calculator.fields, function (field) {
                if (field.calcModel) {
                  params[field.calcModel] = field.value;
                }
              });

              // include 'unique' and 'identifier' attributes
              _.merge(params, _.pick(model, ['id', 'unique', 'title']));

              parsedParams.push(params);
            });

            return new MortgageToolModel({
                models: parsedParams,
                CalcID: $scope.calculator.CalcID
              },
              {
                parse: true,
                mortgageRepayment: mortgageRepayment,
                mortgageManager: mortgageManager
              });
          }

          function getModel(){
            if(_.isEmpty($scope.model)){
              return createModel();
            }
            else {
              return $scope.model;
            }
          }

          // Init ...
          $scope.siteConfig = siteConfig;

          $scope.data = pageData.data[0]; // page content needs zero as that's how the cms return it
          $scope.calculator = calcData.data;
            
          $scope.resultsInteraction = false;
          $scope.interaction = false;
          $scope.loadChange = 0;

          $scope.validation = {}; // required to use Craig's validator

          $scope.model = getModel();     // Setup a wrapper model object

          // now setup a watch on the models (collection)
          $scope.model.collection.on('change', function (model) {
            if($scope.loadChange > 0){  
              if(!$scope.interaction){
                  $analytics.eventTrack('startinteraction', { category:'calculators', label:'Mortgage'});
                  //console.log('interaction event', $scope.loadChange);
                  $scope.interaction = true;
              }  
            }else{
              //console.log('loaded', $scope.loadChange);
              $scope.loadChange++;
            }


            
            try{
              // re-calculate
              if (model.calculate().hasResult()) {
                console.log('result!');
                  if(!$scope.resultsInteraction){
                        $analytics.eventTrack('resultscalculated', { category:'calculators', label:'Mortgage'});
                        $scope.resultsInteraction = true;
                    }
                // notify child directives of change of mortgage model
                $scope.$broadcast('output:update', model.collection.indexOf(model)); // -> model.id
              }
            }
            catch (e){
              console.error('calculation failed ', e);
            }

          });

          // listener for child directives (input) when Mortgage Input is switched/selected/changed
          $scope.$on('input:changed', function (event, modelId) {
            $scope.$broadcast('output:update', modelId);
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
                .set({ID: _.toString($routeParams.id)}, {silent: true}) // dont trigger on-change listener just yet
                .fetch({
                  parse: true,
                  //silent:true,
                  success: function () {
                    // the first model is loaded by default, so ensure
                    // all listeners are listening to the correct one
                    $scope.$broadcast('output:update', 0);
                  }
                });
            }
          }

        }
      ]
    );

}());
