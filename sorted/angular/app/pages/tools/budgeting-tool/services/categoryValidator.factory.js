(function () {
  'use strict';

  angular.module('budgetingTool')
    .factory('categoryValidator', ['budgetingToolConfig', function (budgetingToolConfig) {
      function countDecimals (n) {
        if (Math.floor(n) === n) {
          return 0;
        }
        return n.toString().split(".")[1].length || 0; 
      }

      function cents (n) {
        if (n === undefined || n === null) {
          return false;
        }
        if (n < 0) {
          return false;
        }
        if (n > (Number.MAX_SAFE_INTEGER || budgetingToolConfig.IE_MAX_SAFE_INTEGER)) {
          return false;
        }
        // Note that this is for input validation: shouldn't be applying it to every value
        // in the tool, since amounts will frequently have more significant digits.
        if (countDecimals(n) > 2) {
          return false;
        }
        return true;
      }

      function title (s) {
        if (s === undefined) {
          return false;
        }
        if (s.length === 0) {
          return false;
        }
        if (s.length > budgetingToolConfig.MAX_CATEGORY_TITLE_FIELD) {
          return false;
        }
        return true;
      }

      return {
        cents: cents,
        title: title
      };
    }
  ]);

})();
