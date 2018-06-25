/* global BigNumber */
(function () {
  'use strict';

  angular.module('budgetingTool')
    .factory('chartValues', [
      'Budget',
      'budgetingToolConfig',
      'colourGenerator',
      'periodAmount',
      'totalValues',
      function (Budget, budgetingToolConfig, colourGenerator, periodAmount, totalValues) {
        // At least one master category needs a total for the chart to display.
        // Otherwise, display a default chart where all master categories have equal value
        function getDefaultAmount () {
          var totalsExist = _.some(Budget.budget.MasterCategories, function (masterCategory) {
            return masterCategory.Cents.toNumber();
          });
          if (!totalsExist && Budget.budget.MasterCategories !== undefined) {
            return 1 / Budget.budget.MasterCategories.length;
          }
          return 0;
        }

        function countActiveCategories () {
          return _.filter(Budget.budget.MasterCategories, function (masterCategory) {
            // Master categories can come from JSON as an integer, not a BigNumber
            if (typeof masterCategory.Cents === 'number') {
              masterCategory.Cents = new BigNumber(masterCategory.Cents);
            }
            return masterCategory.Cents.greaterThan(0);
          }).length;
        }

        function update () {
          var subtotal = periodAmount.displayDollars(totalValues.getSubtotal());
          var spacer = (subtotal || 1) * budgetingToolConfig.BREAKDOWN_CHART_SPACER;
          var activeCategories = countActiveCategories();
          var defaultAmount = getDefaultAmount();

          // The chart looks pretty bad with only one or two values, 
          // because the spacers get too large and uneven
          if (activeCategories < 5) {
            spacer /= 2;
          }

          var workingSet = Budget.budget.MasterCategories;
          if (activeCategories) {
            workingSet = _.filter(Budget.budget.MasterCategories, function (mc) {
              return mc.Cents.greaterThan(0);
            });
          }

          return _.flatMap(workingSet, function (masterCategory) {
            var colour = masterCategory.Color;

            // Fade out initial colours
            if (!subtotal) {
              colour = colourGenerator.getStartColour(masterCategory.Color);
            }

            var series = [];
            if (activeCategories !== 1) {
              series.push({
                dollars: spacer,
                color: 'transparent'
              });
            }
            var dollars = periodAmount.displayDollars(masterCategory.Cents);
            series.push({
              category: masterCategory.Title,
              dollars: dollars || defaultAmount,
              color: colour
            });
            return series;
          });
        }

        return {
          update: update
        };
      }
    ]);

})();
