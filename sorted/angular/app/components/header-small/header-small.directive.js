(function() {
    'use strict';

    angular.module('sorted')
    .directive('headerSmall',  ['siteConfig', function(siteConfig) {

        return {
            templateUrl: siteConfig.APP_PATH + 'app/components/header-small/header-small.html',
            restrict: 'EA',
            scope: {
                data: '=',
                basetitle: '@'
            },
            controller: ['$scope', '$rootScope', function($scope, $rootScope) {

                $scope.siteConfig = siteConfig;
                if(typeof $scope.data !== 'undefined'){
                  $rootScope.$emit('newPageLoaded', {'title': $scope.data.Title, 'description': $scope.data.MetaDescription });
                }
            },
            ],
        };

    }]);

}());
