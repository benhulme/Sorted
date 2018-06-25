(function() {

  'use strict';

  angular.module('sorted')
    .config(['$routeProvider', 'siteConfig', function($routeProvider, siteConfig) {
      $routeProvider
        .when('/profile', {
          templateUrl: siteConfig.APP_PATH + 'app/pages/profile/profile.html',
          controller: 'ProfileController',
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
/**
 * Created by stanislavk on 26/02/2016.
 */
