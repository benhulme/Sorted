(function(){
  'use strict';
  angular.module('sorted')
    .directive('popularTools', ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/home/popular-tools/popular-tools.html',
        restrict: 'E',
        link: function() {

        },
        controller: ['$scope', 'silverStripeService',
          function($scope, silverStripeService) {

            $scope.siteConfig = siteConfig;

            var toolsPromise = silverStripeService.get('popularTools');

            function toolsPromiseSuccess(response) {
              if (response.status === 200) {
                $scope.tools = response.data;
              } else {
                console.error('unexpected response status', response);
              }
            }

            function toolsPromiseFail(response) {
              console.error('failure', response);
            }

            toolsPromise.then(toolsPromiseSuccess, toolsPromiseFail);

          },
        ],
      };
    }]);

}());
