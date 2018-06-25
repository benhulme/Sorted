(function() {
  'use strict';

  angular.module('sorted')
    .controller('GuidePageController', ['$scope', 'silverStripeService', '$location', '$routeParams', '$rootScope', function($scope, silverStripeService, $location, $routeParams, $rootScope) {

        var url = $routeParams.guide;
        $scope.getCategory = function() {
          return $location.search().category;
        };

        var qPromise = silverStripeService.get('varPage', url);


        function qPromiseSuccess(response) {
          if (response.status === 200) {
            $scope.data = response.data[0];
            $rootScope.$emit('newPageLoaded', {'title': $scope.data.Title, 'description': $scope.data.MetaDescription });
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
    ]);


}());
