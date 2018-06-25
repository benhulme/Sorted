(function() {

    'use strict';

    angular.module('sorted')
    .config(['$routeProvider', 'siteConfig', function($routeProvider, siteConfig) {
        
        $routeProvider
        
        .when('/tools', {
            templateUrl: siteConfig.APP_PATH + 'app/pages/tools/tools.html',
            controller: 'ToolsController'
        })

        .when('/tools/?category', {
            templateUrl: siteConfig.APP_PATH + 'app/pages/tools/tools.html',
            controller: 'ToolsController'
        });
    
    }]);

}());
