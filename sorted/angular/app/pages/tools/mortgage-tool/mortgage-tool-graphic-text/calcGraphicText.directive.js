(function () {
  'use strict';
  angular.module('sorted')
    .directive('mortgageToolGraphicText', ['siteConfig', function (siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/mortgage-tool/mortgage-tool-graphic-text/calc-graphic-text.html',
        restrict: 'EA',
        scope: {
          model: '=',
          calculator: '='
        },
        controller: ['$scope',
          function ($scope) {

            // Initially, assign the first model to the 'watched model'
            $scope.currentModel = $scope.model.collection.at(0);

            $scope.$on('output:update', function (event, modelIndex) {

              // assign currentModel
              $scope.currentModel = $scope.model.collection.at(modelIndex);

              function recalcFraction(){
                // View logic below
                var
                  total = $scope.currentModel.result.get('total'),
                  interest = $scope.currentModel.result.get('interest'),
                  loan = total - interest;

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
                    $scope.fractionSrc = $scope.calculator.graphic.smallIcons[$scope.fraction];
                  }

                } else {
                  $scope.showText = false;
                }

                if($scope.factor < 1.20){
                  $scope.showText = false;
                }
              }

              $scope.currentModel.result.on('change', function () {
                recalcFraction();
              });

              // run it initially
              recalcFraction();

            });

          }
        ]
      };
    }
    ]);
}());
