(function() {
  'use strict';
  angular.module('sorted')
    .directive('calcGraphic',  ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/calc-graphic/calc-graphic.html',
        restrict: 'EA',
        scope: {
          calculator: '=',
          model: '=',
        },
        link: function(scope, elm) {

          scope.setHouseHeight = function() {

            var darkHeight = elm.find('.graphic-house-dark-img')[0].offsetWidth / 390 * 292;

            var height = darkHeight * ((100 - scope.interestPercent) / 100);

            elm.find('.graphic-house-light').css({
              height: height + 'px',
            });

            if (scope.interestPercent < 30) {
              elm.find('.graphic-interest').css({
                top: '-50px',
              });
              elm.find('.graphic-interest').removeClass('font-white').addClass('font-purple');
            } else {

              var top = scope.interestPercent * 0.40;

              elm.find('.graphic-interest').css({
                top: top + '%',
              });

              elm.find('.graphic-interest').removeClass('font-purple').addClass('font-white');
            }

          };

        },
        controller: ['$scope', '$window',
          function($scope, $window) {

            $scope.siteConfig = siteConfig;

            $scope.$watch('model', function() {

              if ($scope.model) {

                if ($scope.model.result.interest) {
                  $scope.interest = $scope.model.result.interest;
                  $scope.total = $scope.model.result.total;
                  $scope.interestPercent = $scope.interest / $scope.total * 100;
                }

                if (!$scope.model.ready) {
                  $scope.interestPercent = 66;
                }

                if ($scope.model.result.time) {
                  $scope.years = $scope.model.result.time;
                } else {
                  $scope.years = 25;
                }

                $scope.setHouseHeight();

              }

            }, true);

            $scope.windowResize = function() {
              $scope.setHouseHeight();
            };

            angular.element($window).on('resize', $scope.windowResize);

          },
        ],
      };
    },
  ]);
}());
