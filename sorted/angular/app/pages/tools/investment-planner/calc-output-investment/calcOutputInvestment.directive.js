(function() {
  'use strict';
  angular.module('sorted')
    .directive('calcOutputInvestment',  ['siteConfig', '$http', '$q',  function(siteConfig, $http, $q) {
      return {
        templateUrl: siteConfig.APP_PATH +
          'app/pages/tools/investment-planner/calc-output-investment/calc-output-investment.html',
        restrict: 'EA',
        scope: {
          model: '=',
          result: '=',
          dropdown: '=',
          resultData: '=',
        },
        link: function (scope) {

          scope.$on('save:calc', function (event, title) {

            // call save on the model
            var
              opts = {
                success: function () {
                  angular.element('#save-as-modal').modal('hide');
                },
                error: function () {
                },
                silent: true,
                parse: true // flag to pass response through parse for cleanings and storing
              };
            scope.model.$attributes.Title = title;

            scope.model.save(null,  opts);
          });
        },
        controller: ['$scope',
          function($scope) {
            $scope.quizResult = false;
            $scope.siteConfig = siteConfig;

            $scope.$watch('result', function() {
              if($scope.result || $scope.result === 0){
                $scope.currentResult = _.find($scope.outputs, {type: $scope.result});
                $scope.quizResultTitle = $scope.currentResult.title;
                $scope.dropdown.value = $scope.result.toString();
                $scope.quizResult = true;
              }
            });

            $scope.$watch('dropdown.value', function() {

              if ($scope.dropdown && $scope.dropdown.value) {
                var type = parseInt($scope.dropdown.value);
                $scope.currentResult = _.find($scope.outputs, {type: type});
              }

            });

            $scope.loadOutput = function(endpoint) {
              var req = {
                method: 'GET',
                url: endpoint,
              };
              return $http(req);
            };

            function qPromiseSuccess(response) {
              if (response.status === 200) {
                return response.data;
              } else {
                console.error('unexpected response status', response);
                return false;
              }
            }

            function qPromiseFail(response) {
              console.error('failure', response);
              return false;
            }

            var aggressive = $scope.loadOutput(siteConfig.APP_PATH + '/json/investment/aggressive.json');
            var growth = $scope.loadOutput(siteConfig.APP_PATH + '/json/investment/growth.json');
            var balanced = $scope.loadOutput(siteConfig.APP_PATH + '/json/investment/balanced.json');
            var conservative = $scope.loadOutput(siteConfig.APP_PATH + '/json/investment/conservative.json');
            var defensive = $scope.loadOutput(siteConfig.APP_PATH + '/json/investment/defensive.json');

            $q.all([
              aggressive.then(qPromiseSuccess, qPromiseFail),
              growth.then(qPromiseSuccess, qPromiseFail),
              balanced.then(qPromiseSuccess, qPromiseFail),
              conservative.then(qPromiseSuccess, qPromiseFail),
              defensive.then(qPromiseSuccess, qPromiseFail),
            ]).then(function(response){
              $scope.outputs = response;
              if($scope.result){
                $scope.currentResult = _.find($scope.outputs, {type: $scope.result});
                $scope.dropdown.value = $scope.result.toString();
              }else{
                $scope.currentResult = _.find($scope.outputs, {type: 'BALANCED'});
              }
            });

          },
        ],
      };
    },
  ]);
}());
