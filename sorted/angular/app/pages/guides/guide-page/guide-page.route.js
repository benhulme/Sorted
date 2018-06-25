(function() {

    'use strict';

    angular.module('sorted')
    .config(['$routeProvider', 'siteConfig', function($routeProvider, siteConfig) {
        $routeProvider
          .when('/guides/:guide', {
            templateUrl: siteConfig.APP_PATH + 'app/pages/guides/guide-page/guide-page.html',
            controller: 'GuidePageController'
          });
    }
    ]);

}());
