(function() {
  'use strict';

  angular.module('sorted')
    .controller('RetirementPlannerController',
      ['$scope', 'siteConfig', 'RetirementPlannerModel', '$window', '$routeParams', 'isLoggedIn', 'pageData', 'calcData','$analytics',
        function ($scope, siteConfig, RetirementPlannerModel, $window, $routeParams, isLoggedIn, pageData, calcData, $analytics) {

          function createModel() {
            var
              params = {},
              calculator = new $window.SortedCalculator_Retirement();

            /*var testObj1 = {
              your_gender: 2,
              your_month_born: 3,
              your_year_born: 1985,
              your_retire_age: 65,
              your_life_expectancy: 87,
              live_on: 1000,
              partner: 0,
              partner_gender: 0,
              partner_month_born: 0,
              partner_year_born: 0,
              partner_retire_age: 65,
              partner_life_expectancy: 0,
              your_super: 1,
              your_ks: 50000,
              your_other_schemes: 100000,
              your_other_income: 100,
              partner_super: 0,
              partner_ks: 0,
              partner_other_schemes: 0,
              partner_other_income: 0,
              iar: 1,
              bridge_freq: 52,
              lifestyle_freq: 52,
              required_savings_freq: 52,
              expected: {
                shortfall_post_65: 10217,
                shortfall_pre_65: 0,
                amount_total: 171964,
                deficit_lump_amount: 58,
                desired_retirement_income: 48000,
                retirement_income: 58217,
                income_nz_superannuation: 27914,
                income_kiwisaver_lump_sum: 18002,
                income_other_lump_sums: 1080,
                income_other_income_sources: 11222
              }
            };*/

            // parse the calc json file
            _.forEach($scope.calculator, function (section) {

              // now pull out the fields
              _.forEach(section.fields, function (itm) {
                if(_.has(itm, 'calcModel')){ params[itm.calcModel] = itm.value; }
              });

            });

            // hard coded due to json structure not supporting new attributes at top level easily
            _.merge(params, {CalcID: '1'});

            return new RetirementPlannerModel(params, {
              parse: true,
              calculator: calculator
            });

          }

          // Init ...
          $scope.siteConfig = siteConfig;

          $scope.data = pageData.data[0]; // page content keep the zero as that's how the cms returns the data

          $scope.calculator = calcData.data;
            
          $scope.resultsInteraction = false;
          $scope.interaction = false;
          $scope.loadChange = 0;

          $scope.model = createModel();     // Setup a wrapper model object

          $scope.model.on('change', function (model) {

            if($scope.loadChange > 0){  
              if(!$scope.interaction){
                $analytics.eventTrack('startinteraction', { category:'calculators', label:'retirement'});
                //console.log('interaction event');
                $scope.interaction = true;
              }
            }else{
              //console.log('loaded', $scope.loadChange);
              $scope.loadChange++;
            }


              

            if(model.calculate().hasResult()){
              //console.log('result!')
                if(!$scope.resultsInteraction){
                  console.log('resultsInteraction called!');
                        $analytics.eventTrack('resultscalculated', { category:'calculators', label:'retirement'});
                        //console.log('results');
                        $scope.resultsInteraction = true;
                    }
            }                
            model.calculate().hasResult();
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

        }
    ]
  );

}());
