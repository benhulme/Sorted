(function() {

  'use strict';

  angular.module('sorted')
    .config(['$routeProvider', 'siteConfig', function($routeProvider, siteConfig) {
      $routeProvider
        .when('/dashboard', {
          templateUrl: siteConfig.APP_PATH + 'app/pages/dashboard/dashboard.html',
          controller: 'DashboardController',
          resolve: {
              check: ['$location', 'userStorage', function($location, userStorage){
                    var user = userStorage;
                  if ( !user.isLoggedIn() )
                  {
                      $location.path('/');
                  }
              }]
          }
        });

    }
    ]);

}());
