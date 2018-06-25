(function() {
    'use strict';
    angular.module('sorted')
    .directive('header',  ['siteConfig', function(siteConfig) {

        return {
            templateUrl: siteConfig.APP_PATH + 'app/components/header/header.html',
            restrict: 'EA',
            scope: {
                headerEndpoint: '@header',
            },
            controller: ['$scope', 'silverStripeService', '$rootScope',
            function($scope, silverStripeService, $rootScope) {

                if ($scope.headerEndpoint === 'headerHome') {
                    $scope.headerType = 'HOME';
                } else {
                    $scope.headerType = 'STANDARD';
                }

                var qPromise = silverStripeService.get($scope.headerEndpoint);
                function qPromiseSuccess(response) {

                    if (response.status === 200) {
                        $scope.data = response.data[0];
                        $rootScope.$emit('newPageLoaded', {'title': $scope.data.Title, 'description': $scope.data.MetaDescription });
                    } else {
                        console.error('unexpected response status', response);
                    }
                }

                function qPromiseFail(response) {
                    console.error('failure', response);
                }

                qPromise.then(qPromiseSuccess, qPromiseFail);

                $scope.siteConfig = siteConfig;
            },
            ],
        };

    }]);

}());
