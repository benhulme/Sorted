/* global BigNumber */
(function () {
  'use strict';

  angular.module('budgetingTool')
    .factory('budgetConverter', function () {
      // Prior versions of Budgeting Tool used a slightly different format. They had only
      // one Period property, and periods did not apply to individual categories. Further,
      // there was an overarching `budget.Cents` value that has been replaced by summing
      // IncomeStreams. This service detects old budgets and converts them to the new format 
      // where required.

      // New budgets (those with values saved as string) should have their values 
      // converted to BigNumber for use in calculations.
      function stringToBigNumber(budget) {
        _.forEach(budget.IncomeStreams, function (stream) {
          stream.Cents = new BigNumber(stream.Cents);
        });
        _.forEach(budget.MasterCategories, function (mc) {
          mc.Cents = new BigNumber(mc.Cents);
          _.forEach(mc.Categories, function (cat) {
            cat.Cents = new BigNumber(cat.Cents);
          });
        });
      }

      // Each value is multiplied by the PerYear factor stored in the period,
      // effectively storing "cents per year".
      function centsPerYear(cents, factor) {
        var bn = new BigNumber(cents.toFixed(15));
        return bn.times(factor);
      }

      function oldToNew(budget) {
        _.forEach(budget.IncomeStreams, function (stream) {
          stream.Cents = centsPerYear(stream.Cents, budget.Period.PerYear);
        });
        _.forEach(budget.MasterCategories, function (mc) {
          mc.Cents = centsPerYear(mc.Cents, budget.Period.PerYear);
          _.forEach(mc.Categories, function (cat) {
            cat.Cents = centsPerYear(cat.Cents, budget.Period.PerYear);

            // Add a period to each category in each master category
            _.assign(cat, { Period: _.clone(budget.Period) });
          });
        });
      }

      function process (budget) {
        var converted = angular.copy(budget);

        switch (typeof budget.IncomeStreams[0].Cents) {
          case 'string':
            stringToBigNumber(converted);
            break;

          // The defining characteristic of an old budget is the use of an integer as `Cents`
          case 'number':
            oldToNew(converted);
            break;
        }

        // Remove values that are converted on the fly in the new system.
        delete converted.Cents;
        delete converted.Subtotal;
        return converted;
      }

      return {
        process: process
      };
    });

})();
