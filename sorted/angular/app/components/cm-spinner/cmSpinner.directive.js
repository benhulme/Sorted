(function(){
  'use strict';
  angular.module('sorted')
    .directive('cmSpinner', ['siteConfig', '$rootScope',
      function(siteConfig, rootScope) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/cm-spinner/cm-spinner.html',
        restrict: 'E',
        scope: {},
        link: function($scope, element) {

            // TODO move into a service as this should be available BEFORE a parent page/directive!!!

            $scope.siteConfig = siteConfig;

            $scope.showSpinner = false;

            rootScope.$on('cm-spinner.start', function() {
              element.css('display','block');
            });

            rootScope.$on('cm-spinner.stop', function() {
              element.css('display','none');
            });
          }

      };
    }]);

}());
