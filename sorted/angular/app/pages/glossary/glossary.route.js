(function() {

  'use strict';

  angular.module('sorted')
    .config(['$routeProvider', 'siteConfig', function($routeProvider, siteConfig) {
      $routeProvider
        .when('/glossary', {
          templateUrl: siteConfig.APP_PATH + 'app/pages/glossary/glossary.html',
          controller: 'GlossaryController'
        })
        .when('/glossary/?category', {
          templateUrl: siteConfig.APP_PATH + 'app/pages/glossary/glossary.html',
          controller: 'GlossaryController'
        });
    }
  ]);

}());
