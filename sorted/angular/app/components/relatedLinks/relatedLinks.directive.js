(function(){
  'use strict';
  angular.module('sorted')
    .directive('relatedLinks', ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/relatedLinks/relatedLinks.html',
        restrict: 'E',
        link: function() {

        },
        controller: ['$scope', 'silverStripeService', '$location',
          function($scope, silverStripeService, $location) {

            $scope.getCategory = function(){
              return $location.search().category;
            };


            var qPromise = silverStripeService.get('relatedLinks');

            function qPromiseSuccess(response) {
              if (response.status === 200) {
                $scope.relatedLinks = response.data;

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
/**
 * Created by stanislavk on 28/01/2016.
 */
