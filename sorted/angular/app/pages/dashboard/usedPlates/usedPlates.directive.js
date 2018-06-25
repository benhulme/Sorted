/**
 * Created by stanislavk on 26/02/2016.
 */
(function(){
  'use strict';
  angular.module('sorted')
    .directive('usedPlates', ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/dashboard/usedPlates/usedPlates.html',
        restrict: 'E',
        scope: {},
        controller: ['$scope','$http','userCalculators','silverStripeService', function($scope,$http,userCalculators,silverStripeService){

          var qPromise = silverStripeService.get('usedCalculatorsDefaults');

          function qPromiseSuccess(response) {
            if (response.status === 200) {
              $scope.usedPlatesCustom  = response.data;
            } else {
              console.error('unexpected response status', response);
            }
          }

          function qPromiseFail(response) {
            console.error('failure', response);
          }

          qPromise.then(qPromiseSuccess, qPromiseFail);

          userCalculators.getUsedCalculators().then(function(data){
            $scope.data = data.data;
          });


          $scope.deleteById = function(id){
            userCalculators.deleteById(id).then(function(){
              userCalculators.getUsedCalcIds().then(function(){
               userCalculators.getUsedCalculators().then(function(resp){
                 $scope.data = resp.data;
               });
                $('.modal-'+id).modal('hide');
                $('.modal-backdrop').remove();
              });

            });
          };

          $scope.hideUndone = function(){
            return false;
          };


        }]
      };
    }]);

}());
