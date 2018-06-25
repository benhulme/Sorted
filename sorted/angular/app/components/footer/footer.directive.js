(function() {
  'use strict';
  angular.module('sorted')
    .directive('footer',  ['siteConfig', '$rootScope',  function(siteConfig, $rootScope) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/footer/footer.html',
        restrict: 'E',
        scope: {},
        link: function (scope, elm) {


          elm.on('submit', '#save-as-form', function (event) {
            var title = angular.element(event.currentTarget).find('#save-as-title').val();
            $rootScope.$broadcast('save:calc', title);
          });

          $rootScope.$on('show:save-as', function (event, title) {
            angular.element().find('#save-as-title').val(title);
          });
        },
        controller: ['$scope',
          function($scope) {
            $scope.siteConfig = siteConfig;
          }
        ]
      };
    }]);

}());
