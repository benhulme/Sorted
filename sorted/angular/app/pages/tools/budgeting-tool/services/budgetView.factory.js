(function () {
  'use strict';

  angular.module('budgetingTool')
    .factory('budgetView', [
      'Budget',
      'budgetingToolConfig',
      'siteConfig',
      function (Budget, budgetingToolConfig, siteConfig) {
        // Just a string containing a shortform view description e.g. 'list', 'grid'
        var _view = budgetingToolConfig.DEFAULT_BUDGET_VIEW;


        function get () {
          _view = Budget.budget.View || _view;
          return _view;
        }

        function getTemplate () {
          var viewTemplatePrefix = siteConfig.APP_PATH +
            budgetingToolConfig.BUDGETING_TOOL_PREFIX +
            budgetingToolConfig.BUDGETING_TOOL_PATH;

          var url = budgetingToolConfig.VIEW_TEMPLATES[ get() ].url;
          return viewTemplatePrefix + '/' + url;
        }

        function set (view) {

          if (view !== _view) {
            _view = view;
            if (view !== Budget.budget.View) {
              Budget.budget.View = view;
              Budget.setDirty();
           }
          }
        }

        return {
          get: get,
          getTemplate: getTemplate,
          set: set
        };
      }
    ]);

})();
