(function() {
    'use strict';

    angular.module('sorted')
    .controller('GuidesController', ['$scope', 'siteConfig', 'guidesViewModel',
      function($scope, siteConfig, guidesViewModel) {
        $scope.siteConfig = siteConfig;
        $scope.search = '';
        guidesViewModel.build().then(function (vm) {
          $scope.data = vm;
        });
      }
    ]);

}());
