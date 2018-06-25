(function() {
  'use strict';
  angular.module('sorted')
    .directive('calcGraphicText',  ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/calc-graphic-text/calc-graphic-text.html',
        restrict: 'EA',
        scope: {
          model: '=',
        },
        controller: ['$scope',
          function($scope) {

            $scope.$watch('model.result', function() {
              if ($scope.model) {

                var total;
                var interest;

                switch ($scope.model.modelName) {

                  case 'debtCalculatorModel':
                    total = $scope.model.result.result_total;
                    interest = $scope.model.result.result_interest;
                    break;
                  case 'mortgageToolModel':
                    total = $scope.model.result.total;
                    interest = $scope.model.result.interest;
                    break;
                }

                var loan = total - interest;

                $scope.factor = (total / loan).toFixed(2);


                if (!isNaN($scope.factor)) {
                  $scope.showText = true;

                  $scope.wholeNumber = Math.floor($scope.factor);

                  $scope.numIcons = [];

                  for (var i = 0; i < $scope.wholeNumber; i++) {
                    $scope.numIcons.push(i);
                  }

                  $scope.fraction = Math.floor(($scope.factor - $scope.wholeNumber) * 10);


                  if ($scope.fraction > 0) {
                    $scope.fractionSrc = $scope.model.graphic.smallIcons[$scope.fraction];
                  }

                } else {
                  $scope.showText = false;
                }

                if($scope.factor < 1.20){
                  $scope.showText = false;
                }




              }
            });

          },
        ],
      };
    },
  ]);
}());
