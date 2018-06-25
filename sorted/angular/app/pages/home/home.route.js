(function() {

  'use strict';

  angular.module('sorted')
    .config(['$routeProvider', 'siteConfig', function($routeProvider, siteConfig) {
      $routeProvider
        .when('/', {
          templateUrl: siteConfig.APP_PATH + 'app/pages/home/home.html',
          controller: 'HomeController',
        })
        .otherwise({
          redirectTo: function () {
            window.location = location.pathname;
          }});
    },
  ]);

}());
