/* global BigNumber */
(function () {
  'use strict';

  angular.module('budgetingTool')
    .factory('masterCategoryCompiler', [
      'Budget',
      function (Budget) {
        // Builds data from questions in budget-template view
        function compile (categories, masterCategories) {
          return _(masterCategories)
            .map(function (val) {
              var masterCategory = _.cloneDeep(val);
              masterCategory.Categories = _.intersectionBy(categories, val.Categories, 'ID');

              // Mutate each category to have the same period as the main budget by default
              // Initialise value to BigNumber
              _.forEach(masterCategory.Categories, function (cat) {
                cat.Cents = new BigNumber(0);
                _.assign(cat, { Period: _.clone(Budget.budget.Period) });
              });
              return masterCategory;
            })
            // Only include master categories that have categories
            .filter(function (mc) {
              return mc.Categories.length > 0;
            })
            .value();
        }

        return {
          compile: compile
        };
      }
    ]);

})();
