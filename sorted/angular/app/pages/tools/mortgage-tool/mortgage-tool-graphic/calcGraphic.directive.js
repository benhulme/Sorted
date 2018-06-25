(function () {
  'use strict';
  angular.module('sorted')
    .directive('mortgageToolGraphic', ['siteConfig', function (siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/mortgage-tool/mortgage-tool-graphic/calc-graphic.html',
        restrict: 'EA',
        scope: {
          calculator: '=',
          model: '='
        },
        link: function (scope, elm) {

          scope.setHouseHeight = function () {

            var darkHeight = elm.find('.graphic-house-dark-img')[0].offsetWidth / 390 * 292;

            var height = darkHeight * ((100 - scope.interestPercent) / 100);

            elm.find('.graphic-house-light').css({
              height: height + 'px'
            });

            if (scope.interestPercent < 30) {
              elm.find('.graphic-interest').css({
                top: '-50px'
              });
              elm.find('.graphic-interest').removeClass('font-white').addClass('font-purple');
            } else {

              var top = scope.interestPercent * 0.40;

              elm.find('.graphic-interest').css({
                top: top + '%'
              });

              elm.find('.graphic-interest').removeClass('font-purple').addClass('font-white');
            }

          };

          scope.setHouseHeight();

        },
        controller: ['$scope', '$window',
          function ($scope, $window) {

            $scope.siteConfig = siteConfig;

            // Initially, assign the first model to the 'watched model'
            $scope.currentModel = $scope.model.collection.at(0);

            /**
             * A reference to the changed model is passed through
             */
            $scope.$on('output:update', function (event, modelIndex) {
              // assign currentModel
              $scope.currentModel = $scope.model.collection.at(modelIndex);

              if ($scope.currentModel.hasResult()) {

                if ($scope.currentModel.result.has('interest')) {
                  $scope.interest = $scope.currentModel.result.get('interest');
                  $scope.total = $scope.currentModel.result.get('total');
                  $scope.interestPercent = $scope.interest / $scope.total * 100;
                }

                if ($scope.currentModel.result.has('time')) {
                  $scope.years = $scope.currentModel.result.get('time');
                } else {
                  $scope.years = 25;
                }

                $scope.setHouseHeight();
              }

            });


            // Set a default value for all required variables....
            if (_.isUndefined($scope.interestPercent)) {
              $scope.interestPercent = 66;
            }

            if (_.isUndefined($scope.years = 25)) {
              $scope.years = 25;
            }

            // resize the house on window resize
            angular.element($window).on('resize', $scope.setHouseHeight);

          }
        ]
      };
    }
    ]);
}());
