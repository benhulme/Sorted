(function() {
  'use strict';
  angular.module('sorted')
    .directive('calcInputKiwisaverFees',  ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH +
          'app/pages/tools/kiwisaver-fees/calc-input-kiwisaver-fees/calc-input-kiwisaver-fees.html',
        restrict: 'EA',
        scope: {
          model: '=',
          calculator: '='
        },
        controller: ['$scope', 'calcStaticValues',
          function($scope, calcStaticValues) {

            $scope.calcStaticValues = calcStaticValues;

            $scope.currentGroup = 'creditCard';
            $scope.currentIndex = 0;

            $scope.siteConfig = siteConfig;

            $scope.slider = {
              options: {
                floor: 1,
                ceil: 30000000,
                showSelectionBar: true,
              },
            };

          },
        ],
        link: function (scope, elm) {

          elm.on('change', 'select', function (event) {
            var
              changed  = $(event.currentTarget),
              selected = changed.find(':selected');

            if(changed.attr('name') === 'employment'){

              $(selected.data('toggle')).hide();
              $(selected.data('related')).show();
            }
          });
        }
      };
    },
  ]);
}());
