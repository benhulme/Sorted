(function () {
  'use strict';

  // Sets the view model, and makes some decisions about routing
  // based on what data is available.
  angular.module('budgetingTool')
    .factory('budgetingToolResolver', [
      '$location', 
      '$q', 
      'Budget',
      'budgetingToolConfig', 
      'Profile',
      function ($location, $q, Budget, budgetingToolConfig, Profile) {
        return function () {
          return $q.all([Budget.get(), Profile.get(true)])
            .then(function (values) {
              // User has no stored (or cached) budget
              if (_.isEmpty(values[0]) || !values[0].hasOwnProperty('MasterCategories')) {
                $location.path(budgetingToolConfig.BUDGETING_TOOL_PATH + '/welcome');
                return $q.reject('No stored budget yet.');
              }

              if (_.isEmpty(values[1])) {
                // User is not logged in but has a cached budget
                values[0].Title = budgetingToolConfig.DEFAULT_BUDGET_TITLE;
                values[0].BreakdownExpanded = true;
              } else if (!values[0].Title) {
                // User is logged in but has a cached budget with no title
                values[0].Title = values[1].FirstName + "'s budget";
                values[0].BreakdownExpanded = true;
              }

              return true;
            });
        };
      }
    ]);

})();
