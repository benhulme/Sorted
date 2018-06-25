/* global BigNumber */
(function() {
  'use strict';

  angular.module('budgetingTool')
  .factory('welcomeResolver', [
    '$http',
    '$location',
    '$log',
    '$q',
    'Budget',
    'budgetingToolConfig',
    'Profile',
    'siteConfig',
    function ($http, $location, $log, $q, Budget, budgetingToolConfig, Profile,  siteConfig) {
      return function () {
        var toolPage = $http({
            method: 'GET',
            url: siteConfig.API_PREFIX + '/page/get/budgeting-tool'
          })
            .then(function (response) {
              return response.data[0];
            }, function (error) {
              $log.error(error);
              return null;
            });

        return $q.all([toolPage, Profile.get(true), Budget.get()])
          .then(function (values) {
            if (!_.isEmpty(values[2]) && values[2].hasOwnProperty('MasterCategories')) {
              $location.path(budgetingToolConfig.BUDGETING_TOOL_PATH);
              return $q.reject('User already has a budget');
            }

            var salary = null;
            if ($location.search().hasOwnProperty('salary')) {
              salary = parseInt($location.search().salary, 10) * 100;
             if (salary > 0 && salary < (Number.MAX_SAFE_INTEGER || budgetingToolConfig.IE_MAX_SAFE_INTEGER)) {
                salary = new BigNumber(salary)
                  .times(budgetingToolConfig.BUDGET_PERIODS[budgetingToolConfig.DEFAULT_BUDGET_PERIOD].PerYear);
              }
            }

            return {
              toolPage: values[0],
              isLoggedIn: !!values[1].ID,
              salary: salary
            };
          });
      };
    }
  ]);

})();
