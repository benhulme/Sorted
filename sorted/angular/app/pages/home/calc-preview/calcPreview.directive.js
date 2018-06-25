(function(){
  'use strict';
  angular.module('sorted')
    .directive('calcPreview', ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/home/calc-preview/calc-preview.html',
        restrict: 'E',
        link: function() {
        },
        controller: ['$scope', 'silverStripeService', '$rootScope', 'formForwardService', 'calcPreviewModel',
          function($scope, silverStripeService, $rootScope, formForwardService, calcPreviewModel) {

            $scope.calcPreModel = calcPreviewModel.fields;

            var qPromise = silverStripeService.get('calcPreview');

            function qPromiseSuccess(response) {
              if (response.status === 200) {
                $scope.calcPreview = response.data[0];
              } else {
                console.error('unexpected response status', response);
              }
            }

            function qPromiseFail(response) {
              console.error('failure', response);
            }

            qPromise.then(qPromiseSuccess, qPromiseFail);

            $scope.submitForm = function(event, args) {
              if (args.formName === 'calcPreviewForm') {
                var preparedData = calcPreviewModel.prepare($scope.calcPreModel);
                formForwardService.forward('calcPreviewPost', preparedData);
              }
            };

            $rootScope.$on('cmForm.submit', $scope.submitForm);

          },
        ],
      };
    }]);

}());
