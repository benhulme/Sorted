(function() {
  'use strict';
  angular.module('sorted')
    .directive('calcStacked',  ['siteConfig', '$window', '$filter', function(siteConfig, $window, $filter) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/calc-stacked/calc-stacked.html',
        restrict: 'EA',
        scope: {
          models: '=',
          result: '=',
        },
        link: function(scope) {

          var defaultSeries = [
            {
              gap: 0.25,
              name: 'NZ Superannuation',
              data: [220, null, null],
            }, {
              gap: 0.25,
              name: 'KiwiSaver',
              data: [150, null, null],
            }, {
              gap: 0.25,
              name: 'Other lump sum',
              data: [97, null, null],
            }, {
              gap: 0.25,
              name: 'Other income',
              data: [90, null, null],
            }, {
              gap: 0.25,
              name: 'Desired retirement income',
              data: [null, 800, null],
            }, {
              gap: 0.25,
              name: 'Extra savings',
              data: [null, null, 243],
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

          scope.$watch('models', function() {

            if (scope.models && scope.models.howClose) {

              scope.chartConfig.series[0].color = scope.models.howClose.graphic.super.color;
              scope.chartConfig.series[1].color = scope.models.howClose.graphic.kiwiSaver.color;
              scope.chartConfig.series[2].color = scope.models.howClose.graphic.otherLump.color;
              scope.chartConfig.series[3].color = scope.models.howClose.graphic.otherIncome.color;
              scope.chartConfig.series[4].color = scope.models.howClose.graphic.liveOn.color;
              scope.chartConfig.series[5].color = scope.models.howClose.graphic.deficitLump.color;

              scope.drawChart(false);

            }

          });

          scope.$watch('result', function() {

            if (scope.result) {
              scope.drawChart(true);
            } else {
              scope.drawChart(false);
            }

          }, true);

          scope.drawChart = function(hasResult) {

            if (hasResult) {
              var periodInt = parseInt(scope.models.howMuch.fields.lifestyleFreq.value);
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

              var category1Val = scope.result.income_nz_superannuation + scope.result.income_kiwisaver_lump_sum +
                scope.result.income_other_lump_sums + scope.result.income_other_income_sources;

              var category1 = 'You will have\n' + $filter('currency')(category1Val, '$', 0) + ' per ' + period;
              var category2 = 'You will need\n' + $filter('currency')(scope.result.desired_retirement_income, '$', 0) + ' per ' + period;
              var category3 = 'You\'ll need to save\n' + $filter('currency')(scope.result.deficit_lump_amount, '$', 0) + ' per ' + period;


              if (scope.result.deficit_lump_amount !== 0) {
                scope.chartConfig.categoryAxis.categories = [category1, category2, category3];
                scope.chartConfig.series[0].data = [scope.result.income_nz_superannuation, null, null];
                scope.chartConfig.series[1].data = [scope.result.income_kiwisaver_lump_sum, null, null];
                scope.chartConfig.series[2].data = [scope.result.income_other_lump_sums, null, null];
                scope.chartConfig.series[3].data = [scope.result.income_other_income_sources, null, null];
                scope.chartConfig.series[4].data = [null, scope.result.desired_retirement_income, null];
                scope.chartConfig.series[5].data = [null, null, scope.result.deficit_lump_amount];
              } else {
                scope.chartConfig.categoryAxis.categories = [category1, category2];
                scope.chartConfig.series[0].data = [scope.result.income_nz_superannuation, null];
                scope.chartConfig.series[1].data = [scope.result.income_kiwisaver_lump_sum, null];
                scope.chartConfig.series[2].data = [scope.result.income_other_lump_sums, null];
                scope.chartConfig.series[3].data = [scope.result.income_other_income_sources, null];
                scope.chartConfig.series[4].data = [null, scope.result.desired_retirement_income];
                scope.chartConfig.series[5].data = [null, null];
              }

            } else {
              scope.chartConfig.categoryAxis.categories = defaultCategories;
              scope.chartConfig.series = defaultSeries;
            }

            angular.element('.calc-stacked-chart').kendoChart(scope.chartConfig);
          };

          angular.element($window).bind('resize', scope.drawChart);
        }
      };
    },
  ]);
}());
