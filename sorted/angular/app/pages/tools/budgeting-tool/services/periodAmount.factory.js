(function () {
  'use strict';

  angular.module('budgetingTool')
    .factory('periodAmount', [
      'Budget',
      function (Budget) {
        function convert (value, oldPeriod, newPeriod) {
          if (value.eq(0)) {
            return value;
          }
          return value.div(oldPeriod.PerYear).times(newPeriod.PerYear);
        }

        // If period is provided, display using its PerYear factor (otherwise, use Budget's)
        function displayDollars (value, period) {
          if (typeof value === 'undefined') {
            return value;
          }
          if (value.eq(0)) {
            return value.toNumber();
          }

          var perYear = period ? period.PerYear : Budget.budget.Period.PerYear;
          return value
            .div(100)
            .div(perYear)
            .round(2)
            .toNumber();
        }

        // For main display inline editable amounts, don't divide by period
        function displayCategoryDollars (value) {
          if (typeof value === 'undefined') {
            return value;
          }
          if (value.eq(0)) {
            return value.toNumber();
          }
          return value
            .div(100)
            .round(2)
            .toNumber();
        }

        return {
          convert: convert,
          displayCategoryDollars: displayCategoryDollars,
          displayDollars: displayDollars
        };
      }
    ]);

})();
