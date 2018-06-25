(function() {
  'use strict';
  angular.module('sorted')
    .directive('calcDonut',  ['siteConfig', '$window', function(siteConfig, $window) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/calc-donut/calc-donut.html',
        restrict: 'EA',
        scope: {
          calculator: '=',
          model: '=',
        },
        link: function(scope) {

          scope.siteConfig = siteConfig;

          scope.$watch('model', function() {

            if (scope.model) {
              scope.drawChart();
            }

          }, true);

          scope.drawChart = function() {

            var amountOwed = 100;
            var interest = 10;

            if (scope.model.ready && scope.model.result[scope.model.graphic.interest.model]) {

              amountOwed = scope.model.fields[scope.model.graphic.amountOwed.model].value;
              interest = parseFloat(scope.model.result[scope.model.graphic.interest.model]).toFixed(2);
            }

            scope.chartConfig = {
              transitions: false,
              legend: {
                visible: false,
              },
              chartArea: {
                background: '',
              },
              seriesDefaults: {
                type: 'donut',
                startAngle: 180,
              },
              series: [
                {
                  name: 'Result',
                  overlay: {
                    gradient: 'none',
                  },
                  padding: 20,
                  data: [
                    {
                      category: 'Amount you owe',
                      value: amountOwed,
                      color: scope.model.graphic.amountOwed.color,
                    },
                    {
                      category: "Interest you'll pay",
                      value: interest,
                      color: scope.model.graphic.interest.color,
                    },
                  ],
                  labels: {
                    visible: false,
                  },
                },
              ],
              legendItemClick: function(e) {
                e.preventDefault();
              },
              legendItemHover: function(e) {
                e.preventDefault();
              },
              tooltip: {
                visible: true,
                template: '#= category # (#= series.name #): $#= value #',
              },
            };

            angular.element('.donut-chart').kendoChart(scope.chartConfig);
          };

          angular.element($window).bind('resize', scope.drawChart);

        },
      };
    },
  ]);
}());
