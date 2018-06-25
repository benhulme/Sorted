(function () {
  'use strict';

  angular.module('sorted')
    .controller('KiwisaverFeesController',
      ['$scope', 'siteConfig', 'KiwisaverFeesModel', '$timeout', '$window', '$routeParams', 'isLoggedIn', 'pageData', 'calcData', '$analytics',
        function ($scope, siteConfig, KiwisaverFeesModel, $timeout, $window, $routeParams, isLoggedIn, pageData, calcData, $analytics) {

          function createModel() {
            var
              params = {},
              calculator = new $window.SortedCalculator_KiwiSaver_Fees();

            _.forEach($scope.calculator.fields, function (field) {

              if (_.has(field, 'calcModel')) {
                params[field.calcModel] = field.value;
              }

              // include extra attributes
              _.merge(params, _.pick($scope.calculator, ['CalcID']));
            });

            return new KiwisaverFeesModel(params, {calculator: calculator, parse: true});
          }


          $scope.siteConfig = siteConfig;
          $scope.data = pageData.data[0]; // leave zero for the cms data
          $scope.calculator = calcData.data;
          $scope.resultsInteraction = false;
          $scope.interaction = false;
          $scope.model = createModel();

          // setup listener for input form
          $scope.model.on('change', function (model) {

            if(!$scope.interaction){
                  $analytics.eventTrack('startinteraction', { category:'calculators', label:'KS fees'});
                  //console.log('interaction event');
                  $scope.interaction = true;
              }  
            if (model.isValid()) { // re-calculate if valid values set on model
              $scope.$emit('cm-spinner.start');
              model.calculating = true;
              model.calculate()
                .then(function () {
                  //force callback to be asynchronous.
                  $timeout(function() {
                    if(!$scope.resultsInteraction){
                        $analytics.eventTrack('resultscalculated', { category:'calculators', label:'KS fees'});
                        $scope.resultsInteraction = true;
                    }

                    if($scope.model.result.nominal.length === 0 && $scope.model.result.todays.length === 0) {
                      //load default results
                      $.when($scope.model.loadDummyData($scope.calculator.dummyData))
                        .then(function () {
                          model.calculating = true;
                          $scope.$broadcast('output:redraw');
                        });
                    } else {
                      $scope.$broadcast('output:redraw');
                    }

                  }, 0);

                });
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
                  parse: true
                });
            }
          }
          // otherwise load dummy Data
          else {
            // load dummy data initially
            $scope.$emit('cm-spinner.start');
            $.when($scope.model.loadDummyData($scope.calculator.dummyData))
              .then(function () {
                $scope.$broadcast('output:redraw');
              });
          }
        }
      ]
    );

}());
