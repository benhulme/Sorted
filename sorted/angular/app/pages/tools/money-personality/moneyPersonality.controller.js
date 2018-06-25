(function() {
  'use strict';

  angular.module('sorted')
    .controller('MoneyPersonalityController',
     ['$scope', 'siteConfig', 'MoneyPersonalityModel', '$timeout', '$window', '$routeParams', 'isLoggedIn', 'pageData', 'calcData', '$analytics',
      function ($scope, siteConfig, MoneyPersonalityModel, $timeout, $window, $routeParams, isLoggedIn, pageData, calcData, $analytics) {

        function createModel() {
            var
              params = {},
              calculator = new $window.SortedCalculator_MoneyPersonalityProfiler();

            _.forEach($scope.calculator.fields, function (field) {

              if (_.has(field, 'calcModel')) {
                params[field.calcModel] = field.value;
              }

              // include extra attributes
              _.merge(params, {CalcID: '10'});
            });

            return new MoneyPersonalityModel(
              params, 
              {
                calculator: calculator,
                parse: true
              });
          }


        $scope.siteConfig = siteConfig;
        $scope.data = pageData.data[0];  // leave zero to match cms data
        $scope.calculator = calcData.data;
        $scope.dropdown = calcData.data.dropdown;
        $scope.model = createModel();
        $scope.result = false;
        $scope.resultsInteraction = false;
        $scope.interaction = false;

        // setup listener for input form
        $scope.model.on('change', function (model) {
          if(!$scope.interaction){
              $analytics.eventTrack('startinteraction', { category:'calculators', label:'Money Personality'});
              //console.log('interaction event');
              $scope.interaction = true;
          }  
          if (model.isValid()) { // re-calculate if valid values set on model 
            if (model.calculate()) {
              //console.log('model has calculated');
              if(!$scope.resultsInteraction){
                        $analytics.eventTrack('resultscalculated', { category:'calculators', label:'Money Personality'});
                        $scope.resultsInteraction = true;
                    }                      
              if (model.result) {
                $scope.allReady = true;
                $scope.result = model.result.$attributes.code;
              } else {
                $scope.allReady = false;
                $scope.result = false;
              }
            }   
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

        

      },
    ]
  );

}());
