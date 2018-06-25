/**
 * Created by stanislavk on 26/02/2016.
 */
(function(){
  'use strict';
  angular.module('sorted')
    .directive('dashboardPlates', ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/dashboard/dashboardPlates/dashboardPlates.html',
        restrict: 'E',
        scope: {},
        controller: ['$scope','$http','userCalculators','silverStripeService', function($scope,$http,userCalculators,silverStripeService){

          var qPromise = silverStripeService.get('blankCalculatorsDefaults');

          function qPromiseSuccess(response) {
            if (response.status === 200) {
              $scope.blankPlatesCustom  = response.data;
            } else {
              console.error('unexpected response status', response);
            }
          }

          function qPromiseFail(response) {
            console.error('failure', response);
          }

          qPromise.then(qPromiseSuccess, qPromiseFail);

          userCalculators.getUsedCalcIds().then(function(resp){
             $scope.usedId = resp;
          });


          userCalculators.getBlankCalculators().then(function(data){
            $scope.data = data[0];
          });

          $scope.$watch(function(){
            return userCalculators.usedCalcId;
          },function(resp){
            userCalculators.getBlankCalculators().then(function(data){
              $scope.usedId = resp;
              $scope.data = data[0];
            });

          },true);


          $scope.checkId = function(id){
            for(var i=0; i<$scope.usedId.length; i++){
              if(id === $scope.usedId[i]){
                return true;
              }
            }
          };

        }]
      };
    }]);

}());
