(function() {

  'use strict';

  angular.module('sorted')
    .config(['$routeProvider', 'siteConfig', function($routeProvider, siteConfig) {
      $routeProvider
        .when('/check-email', {
          templateUrl: siteConfig.APP_PATH + 'app/pages/password/checkEmail/checkEmail.html'
        });
    }
    ]);

}());


/**
 * Created by stanislavk on 15/02/2016.
 */
