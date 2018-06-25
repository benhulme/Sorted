(function() {
  'use strict';

  angular.module('sorted')
    .controller('ProfileController', ['$scope', 'siteConfig', 'silverStripeService', 'userStorage', '$timeout',
        function($scope, siteConfig, silverStripeService, userStorage,$timeout) {
          var today = new Date();
          $scope.siteConfig = siteConfig;
          $scope.sent = false;
          $scope.ThisYear = today.getFullYear();

          $scope.user = userStorage.data;

          if($scope.user.BirthDate){
            $scope.user.dataYear = +$scope.user.BirthDate.split('-')[0] ;
            $scope.user.dataMonth = $scope.user.BirthDate.split('-')[1];
          }



          $scope.profileFormSubmit = function(){
            $scope.user.BirthDate= $scope.user.dataYear+'-'+$scope.user.dataMonth+'-01';
            userStorage.saveProfile(JSON.stringify($scope.user)).then(
              function(){
                $scope.sent = true;
                $timeout(function(){
                  $scope.sent = false;
                }, 5000);
              }

            );
          };




        }
      ]
    );
}());


/**
 * Created by stanislavk on 26/02/2016.
 */
