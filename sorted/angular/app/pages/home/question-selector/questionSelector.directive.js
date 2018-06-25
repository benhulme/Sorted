(function(){
  'use strict';
  angular.module('sorted')
    .directive('questionSelector', ['$location', 'siteConfig', function($location, siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/home/question-selector/question-selector.html',
        restrict: 'E',
        link: function() {

        },
        controller: ['$scope', 'silverStripeService',
          function($scope, silverStripeService) {

            //init
            $scope.touched = false;
            $scope.selectedQuestion = undefined;

            var qPromise = silverStripeService.get('questionSelector');

            function qPromiseSuccess(response) {
              if (response.status === 200) {
                $scope.questions = response.data;
              } else {
                console.error('unexpected response status', response);
              }
            }

            function qPromiseFail(response) {
              console.error('failure', response);
            }

            qPromise.then(qPromiseSuccess, qPromiseFail);

          },
        ],
      };
    }]);
}());
