(function() {
    'use strict';

    angular.module('sorted')
    .controller('GlossaryController', ['$scope', 'siteConfig', 'silverStripeService',
    	function($scope, siteConfig, silverStripeService) {
        $scope.siteConfig = siteConfig;
        $scope.search = [];
        $scope.search.category = '';

        var qPromise = silverStripeService.get('glossary');

        function qPromiseSuccess(response) {
          if (response.status === 200) {
            $scope.data = response.data[0];
          } else {
            console.error('unexpected response status', response);
          }
        }

        function qPromiseFail(response) {
          console.error('failure', response);
        }

        qPromise.then(qPromiseSuccess, qPromiseFail);

    }
  ]
);
}());
