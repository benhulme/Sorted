/* global BigNumber */
(function () {
  'use strict';

  // DISPLAY values in dollars per budget period,
  // but STORE values in cents per day.
  // Also validate based on rules in categoryValidator.
  angular.module('budgetingTool')
    .directive('displayDollars', ['categoryValidator', function (categoryValidator) {
      return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
          'perYear': '='
        },
        link: function (scope, element, attrs, ngModel) {
          var perYear = scope.perYear || 1;


          ngModel.$parsers.push(function (value) {
            // NOTE: BigNumber will fail with more than 15 significant digits, so preventing 
            // invalid input from making it into the model saves us ugly errors on conversion.
            if (!categoryValidator.cents(value)) {
              return undefined;
            }

            return new BigNumber(value).times(100).times(perYear);
          });

          ngModel.$formatters.push(function (value) {
            if (value) { 
              // Display placeholder if the model value has already been set to 0
              if (value.equals(0)) {
                return attrs.Placeholder;
              }
              return value.div(100).div(perYear).toNumber();
            }
            return attrs.Placeholder;
          });
        }
      };
    }]);

})();
