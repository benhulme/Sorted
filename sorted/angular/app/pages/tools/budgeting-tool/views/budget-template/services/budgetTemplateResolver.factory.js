(function() {
  'use strict';

  angular.module('budgetingTool')
  .factory('budgetTemplateResolver', [
    '$http', 
    '$location',
    '$log',
    '$q',
    '$resource',
    'Budget',
    'budgetingToolConfig',
    'siteConfig',
    function ($http, $location, $log, $q, $resource, Budget, budgetingToolConfig, siteConfig) {
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
        var masterCategories = $resource(siteConfig.APP_PATH + '/json/budget-master-categories.json').get().$promise;

        return $q.all([toolPage, masterCategories, Budget.get()])
          .then(function (values) {
            if (_.isEmpty(values[2])) {
              $location.path(budgetingToolConfig.BUDGETING_TOOL_PATH + '/welcome');
              return $q.reject('User needs to visit welcome page first.');
            }
            if (values[2].hasOwnProperty('MasterCategories')) {
              $location.path(budgetingToolConfig.BUDGETING_TOOL_PATH);
              return $q.reject('User already has a budget');
            }

            // Prefer CMS background image, if set. Also use an icon if available.
            var data = values[1];
            if (values[0]) {
              data.BackgroundImage = values[0].BackgroundImage ? 
                values[0].BackgroundImage : data.BackgroundImage;
              data.ForegroundImage = values[0].ForegroundImage ?
                values[0].ForegroundImage : null;
            }
            // Values above are already stored in Budget service, don't need to return

            return {
              data: data
            };
          });
      };
    }
  ]);

})();
