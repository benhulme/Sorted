(function(){
  'use strict';
  angular.module('sorted')
    .directive('mustReads', ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/home/must-reads/must-reads.html',
        restrict: 'E',
        link: function() {

        },
        controller: ['$scope', 'silverStripeService',
          function($scope, silverStripeService) {

            var qPromise = silverStripeService.get('mustReads');

            function qPromiseSuccess(response) {
              if (response.status === 200) {
                $scope.mustReads = silverStripeService.formatDates(response.data, true);
              } else {
                console.error('unexpected response status', response);
              }
            }

            function qPromiseFail(response) {
              console.error('failure', response);
            }

            $scope.stripTags = function(string) {
              return string.replace(/<\/?[^>]+>/gi, '');
            };

            qPromise.then(qPromiseSuccess, qPromiseFail);

          },
        ],
      };
    }]);

}());
