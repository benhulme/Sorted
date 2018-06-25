(function() {

    'use strict';

    angular.module('sorted')
    .config(['$routeProvider', 'siteConfig', function($routeProvider, siteConfig) {

        $routeProvider

        .when('/guides', {
            templateUrl: siteConfig.APP_PATH + 'app/pages/guides/guides.html',
            controller: 'GuidesController'
        });

    }]);

}());


