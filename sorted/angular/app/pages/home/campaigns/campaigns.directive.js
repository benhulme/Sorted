(function(){
  'use strict';
  angular.module('sorted')
    .directive('campaigns', ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/home/campaigns/campaigns.html',
        restrict: 'E',
        link: function() {

        },
        controller: ['$scope', 'silverStripeService',
          function($scope, silverStripeService) {

            //init
            $scope.touched = false;
            $scope.selectedQuestion = undefined;

            var qPromise = silverStripeService.get('campaigns');

            function qPromiseSuccess(response) {
              if (response.status === 200) {
                $scope.campaigns = response.data;
              } else {
                console.error('unexpected response status', response);
              }
            }

            function qPromiseFail(response) {
              console.error('failure', response);
            }

            qPromise.then(qPromiseSuccess, qPromiseFail);

          },
        ],
      };
    }]);

}());
