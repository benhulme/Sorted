(function() {
  'use strict';

  angular.module('sorted')
    .controller('DashboardController', ['$scope', 'siteConfig', 'silverStripeService', 'userStorage',
        function($scope, siteConfig, silverStripeService, userStorage) {
          $scope.siteConfig = siteConfig;
          $scope.user = userStorage.data;
        }
      ]
    );
}());
/**
 * Created by stanislavk on 26/02/2016.
 */
