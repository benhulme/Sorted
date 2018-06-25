(function(){
  'use strict';
  angular.module('sorted')
    .directive('signupPrompt', ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/home/signup-prompt/signup-prompt.html',
        restrict: 'E',
        link: function() {

        },
        controller: ['$scope', 'silverStripeService',
          function($scope, silverStripeService) {

            var qPromise = silverStripeService.get('signupPrompt');

            function qPromiseSuccess(response) {
              if (response.status === 200) {
                $scope.signupPrompt = response.data[0];
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
