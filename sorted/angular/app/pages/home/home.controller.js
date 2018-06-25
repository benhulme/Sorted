(function () {
  'use strict';

  angular.module('sorted')
    .controller('HomeController', ['$scope', '$location', '$window', 'siteConfig',
      function ($scope, $location, $window, siteConfig) {
        $scope.siteConfig = siteConfig;
      },
    ]);

}());
