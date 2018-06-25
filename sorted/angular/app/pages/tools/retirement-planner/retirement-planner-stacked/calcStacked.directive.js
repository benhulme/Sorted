(function() {
  'use strict';
  angular.module('sorted')
    .directive('calcStackedRetirement',  ['siteConfig', '$window', '$filter', function(siteConfig, $window, $filter) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/retirement-planner/retirement-planner-stacked/calc-stacked.html',
        restrict: 'EA',
        scope: {
          model: '=',
          calculator: '=',
        },
        link: function(scope) {

          var defaultSeries = [
            {
              gap: 0.25,
              name: 'NZ Super',
              data: [220, null, null],
              color: '#ffd700',
              overlay: {
                gradient: 'none',
              },
            }, {
              gap: 0.25,
              name: 'KiwiSaver',
              data: [150, null, null],
              color: '#ffe140',
              overlay: {
                gradient: 'none',
              },
            }, {
              gap: 0.25,
              name: 'Other Savings',
              data: [97, null, null],
              color: '#ffed8c',
              overlay: {
                gradient: 'none',
              },
            }, {
              gap: 0.25,
              name: 'Other Income',
              data: [90, null, null],
              color: '#fff5bf',
              overlay: {
                gradient: 'none',
              },
            }, {
              gap: 0.25,
              name: 'Desired retirement income',
              data: [null, 800, null],
              color: '#cadc3c',
              overlay: {
                gradient: 'none',
              },
            }, {
              gap: 0.25,
              name: 'Extra savings',
              data: [null, null, 243],
              color: '#ce0058',
              overlay: {
                gradient: 'none',
              },
            },
          ];

          var defaultCategories = [
            'You will have\n$557 per week',
            'You will need\n$800 per week',
            'You\'ll need to save\n$243 per week'
          ];

          scope.chartConfig = {
            transitions: false,
            legend: {
              visible: false,
            },
            seriesDefaults: {
              type: 'column',
              stack: true,
            },
            series: defaultSeries,
            valueAxis: {
              labels: {
                visible: true,
              },
              line: {
                visible: false,
              },
              minorGridLines: {
                visible: false,
              },
              title: {
                text: 'Amount ($)',
              },
            },
            categoryAxis: {
              categories: defaultCategories,
              majorGridLines: {
                visible: false,
              },
            },
            tooltip: {
              visible: true,
              template: '#= series.name #: $#= value #',
            },
          };

          scope.$watch('model.result.$attributes', function() {

            if (scope.model.$attributes && scope.model.result.$attributes && scope.model.hasResult()) {
              scope.drawChart(true);
            } else {
              scope.drawChart(false);
            }

          }, true);

          scope.$watch(function() {
            return scope.model.hasResult();
          }, function(val) {

            if (val) {
              scope.drawChart(true);
            } else {
              scope.drawChart(false);
            }
          }, true);

          scope.drawChart = function(hasResult) {

            if (hasResult) {
              var periodInt = parseInt(scope.model.$attributes.lifestyle_freq);
              var period;

              switch (periodInt) {
                case 1:
                  period = 'year';
                  break;
                case 12:
                  period = 'month';
                  break;
                case 26:
                  period = 'fortnight';
                  break;
                case 52:
                  period = 'week';
                  break;
              }

              var category1Val = scope.model.result.$attributes.income_nz_superannuation + scope.model.result.$attributes.income_kiwisaver_lump_sum +
                scope.model.result.$attributes.income_other_lump_sums + scope.model.result.$attributes.income_other_income_sources;

              var category1 = 'You will have\n' + $filter('currency')(category1Val, '$', 0) + ' per ' + period;
              var category2 = 'You will need\n' + $filter('currency')(scope.model.result.$attributes.desired_retirement_income, '$', 0) + ' per ' + period;
              var category3 = 'You\'ll need to save\n' + $filter('currency')(scope.model.result.$attributes.deficit_lump_amount, '$', 0) + ' per ' + period;

              if (scope.model.result.$attributes.deficit_lump_amount !== 0 && category1Val < scope.model.result.$attributes.desired_retirement_income) {
                scope.chartConfig.categoryAxis.categories = [category1, category2, category3];
                scope.chartConfig.series[0].data = [scope.model.result.$attributes.income_nz_superannuation, null, null];
                scope.chartConfig.series[1].data = [scope.model.result.$attributes.income_kiwisaver_lump_sum, null, null];
                scope.chartConfig.series[2].data = [scope.model.result.$attributes.income_other_lump_sums, null, null];
                scope.chartConfig.series[3].data = [scope.model.result.$attributes.income_other_income_sources, null, null];
                scope.chartConfig.series[4].data = [null, scope.model.result.$attributes.desired_retirement_income, null];
                scope.chartConfig.series[5].data = [null, null, scope.model.result.$attributes.deficit_lump_amount];
              } else {
                scope.chartConfig.categoryAxis.categories = [category1, category2];
                scope.chartConfig.series[0].data = [scope.model.result.$attributes.income_nz_superannuation, null];
                scope.chartConfig.series[1].data = [scope.model.result.$attributes.income_kiwisaver_lump_sum, null];
                scope.chartConfig.series[2].data = [scope.model.result.$attributes.income_other_lump_sums, null];
                scope.chartConfig.series[3].data = [scope.model.result.$attributes.income_other_income_sources, null];
                scope.chartConfig.series[4].data = [null, scope.model.result.$attributes.desired_retirement_income];
                scope.chartConfig.series[5].data = [null, null];
              }

            } else {
              scope.chartConfig.categoryAxis.categories = defaultCategories;
              scope.chartConfig.series = defaultSeries;
            }

            angular.element('.calc-stacked-chart').kendoChart(scope.chartConfig);
          };

          angular.element($window).bind('resize', scope.drawChart);

        },
      };
    },
  ]);
}());
