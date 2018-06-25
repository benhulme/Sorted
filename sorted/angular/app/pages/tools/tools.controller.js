(function() {
    'use strict';

    angular.module('sorted')
    .controller('ToolsController', ['$scope', 'siteConfig', 'toolsViewModel',
      function($scope, siteConfig, toolsViewModel) {
        $scope.siteConfig = siteConfig;
        $scope.search = '';
        toolsViewModel.build().then(function (vm) {
          $scope.data = vm;
        });
      }
    ]);

}());
