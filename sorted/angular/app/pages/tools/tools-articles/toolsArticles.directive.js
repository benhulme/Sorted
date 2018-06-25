(function() {
  'use strict';

  angular.module('sorted')
  .directive('toolsArticles', ['siteConfig', function(siteConfig) {
    return {
      templateUrl: siteConfig.APP_PATH + 'app/pages/tools/tools-articles/toolsArticles.html',
      restrict: 'E',
      scope: false,
      controller:[ '$scope', 'silverStripeService', function($scope,silverStripeService){
        var qPromise = silverStripeService.get('blankCalculatorsDefaults');

        function qPromiseSuccess(response) {
          if (response.status === 200) {
            $scope.blankPlatesCustom  = response.data;
          } else {
            console.error('unexpected response status', response);
          }
        }

        function qPromiseFail(response) {
          console.error('failure', response);
        }

        qPromise.then(qPromiseSuccess, qPromiseFail);
      }]
    };
  }]);

}());
