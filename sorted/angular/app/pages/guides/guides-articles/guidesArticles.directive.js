(function() {

  'use strict';
  angular.module('sorted')
    .directive('guidesArticles', ['siteConfig', function(siteConfig) {

      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/guides/guides-articles/guidesArticles.html',
        restrict: 'E',
        link: function() {},
        controller: ['$scope', 'silverStripeService', '$location',
          function($scope, silverStripeService, $location) {

            $scope.getCategory = function() {
              return $location.search().category;
            };

            var qPromise = silverStripeService.get('guidesArticles');

            function qPromiseSuccess(response) {
              if (response.status === 200) {
                $scope.guidesArticles = response.data;
              } else {
                console.error('unexpected response status', response);
              }
            }

            function qPromiseFail(response) {
              console.error('failure', response);
            }

            $scope.stripTags = function(string) {
              return string.replace(/<\/?[^>]+>/gi, '');
            };

            qPromise.then(qPromiseSuccess, qPromiseFail);

          }
        ]
      };

    }]);

}());
