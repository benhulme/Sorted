(function() {
  'use strict';

  angular.module('sorted')
    .controller('DebtCalculatorController',
      ['$scope', 'siteConfig', 'silverStripeService', 'calcInputService', '$q', '$rootScope',
        'debtCalculatorModel', 'Profile', 'calcService', 'pageData', 'calcData', 'isLoggedIn', '$routeParams','$analytics',
      function($scope, siteConfig, silverStripeService, calcInputService, $q, $rootScope,
               debtCalculatorModel, Profile, calcService, pageData, calcData, isLoggedIn, $routeParams, $analytics) {

        $scope.siteConfig = siteConfig;
        $scope.debtCalculatorModel = debtCalculatorModel;

        $scope.calcTitle = null;
        $scope.loadId = null;
        $scope.interaction = false;
        $scope.resultsInteraction = false;
        $scope.loadChange = 0;

        $scope.sliderOptions = {
            floor: 0,
            ceil: 1000,
            showSelectionBar: true
        };

        var debtCalculator = new SortedCalculator_Debt();

        $scope.updateCurrentModel = function(formType, unique) {
          $scope.model = $scope.models[unique];
          $scope.unique = unique;
          $scope.formType = formType;
          $scope.$digest();
        };

        $scope.runCalculation = function(prepared) {

          var formatted;
          var raw;
          var result;
          
          switch ($scope.formType) {

            case 'creditCard':
              formatted = {
                cc: {
                  cc1: prepared.data,
                },
              };
              raw = debtCalculator.calculate(formatted);
              result = raw.cc.cc1;
              break;

            case 'hirePurchase':
              formatted = {
                hp: {
                  hp1: prepared.data,
                },
              };
              raw = debtCalculator.calculate(formatted);
              result = raw.hp.hp1;
              break;
            case 'carLoan':
              formatted = {
                cl: {
                  cl1: prepared.data,
                },
              };
              raw = debtCalculator.calculate(formatted);
              result = raw.cl.cl1;
              break;
            case 'personalLoan':
              formatted = {
                pl: {
                  pl1: prepared.data,
                },
              };
              raw = debtCalculator.calculate(formatted);
              result = raw.pl.pl1;
              break;

          }
          return result;
        };

        $scope.$watch('models', function() {

          if (!$scope.model) {
            return;
          }
          
          if($scope.loadChange > 2){  
            if(!$scope.interaction){
                $analytics.eventTrack('startinteraction', { category:'calculators', label:'debt Calc'});
                //console.log('interaction event', $scope.loadChange);
                $scope.interaction = true;
            }
          }else{
              //console.log('loaded', $scope.loadChange);
              $scope.loadChange++;
            }

          var prepared = $scope.model.prepare($scope.model.fields);

          if (prepared.ready) {
            console.log('recalc');
            $scope.model.result = $scope.runCalculation(prepared);

            if ($scope.model.result.result_total){
              //console.log('result!');
              if(!$scope.resultsInteraction){
                  $analytics.eventTrack('resultscalculated', { category:'calculators', label:'debt Calc'});
                  $scope.resultsInteraction = true;
              }
              $scope.model.ready = true;
            } else {
              $scope.model.ready = false;
              $scope.model.result = {};
            }

          } else {
            $scope.model.ready = false;
            $scope.model.result = {};
          }

        }, true);

        $scope.createModels = function(forms) {

          var models = {};

          angular.forEach(forms, function(form) {

            var currentModel = $scope[form.model];

            angular.forEach(form.inputs, function(input) {

              models[input.unique] = currentModel.getInstance(form);

              if (!$scope.model) {
                $scope.formType = form.type;
                $scope.model = models[input.unique];
                $scope.unique = input.unique;
              }

            });

          });

          return models;

        };

        $scope.digestCalc = function() {
          $scope.$digest();
        };

        $scope.$on('save:calc', function (event, title) {

          var modelData = calcService.prepare($scope.models);

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

        //models and data$scope.model.fields.interestFreePeriod.value

        $scope.loadCalc = function(response) {
          $scope.models = calcService.load($scope.models, response.data.data.Data);
        };

        $scope.loadCalcFailed = function(response) {
          console.error('failed ', response);
        };


        $scope.data = pageData.data[0];
        $scope.calculator = calcData.data;
        $scope.models = $scope.createModels($scope.calculator);

        if ($routeParams.id && isLoggedIn) {
          $scope.loadedId = $routeParams.id;
          calcService.get($scope.loadedId).then($scope.loadCalc, $scope.loadCalcFailed);
        }

      },
    ]
  );

}());
