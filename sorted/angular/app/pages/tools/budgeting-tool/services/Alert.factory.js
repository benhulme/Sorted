(function () {
  'use strict';

  angular.module('budgetingTool')
    .factory('Alert', [
      'budgetingToolConfig',
      function (budgetingToolConfig) {
        var ALERTS = {
          BUDGET_REPLACED: { type: 'warning', message: 'Your old budget was replaced with your latest budget.', timeout: budgetingToolConfig.ALERT_TIMEOUT },
          BUDGET_RETAINED: { type: 'warning', message: 'We kept your old budget and discarded the new one.', timeout: budgetingToolConfig.ALERT_TIMEOUT },
          NEED_ACCOUNT: { type: 'info', message: 'Budget save failed. You need a free account to save a budget!', timeout: budgetingToolConfig.ALERT_TIMEOUT },
          SAVE_SUCCEEDED: { type: 'success', message: 'Budget saved successfully.', timeout: budgetingToolConfig.ALERT_TIMEOUT },
          SAVE_FAILED: { type: 'danger', message: 'Budget save failed! Please try again in a moment.', timeout: budgetingToolConfig.ALERT_TIMEOUT }
        };

        var _alert = {};
        
        function close (alert) {
          angular.copy({}, alert);
        }

        function needAccount () {
          angular.copy(ALERTS.NEED_ACCOUNT, _alert);
        }

        function replaced () {
          angular.copy(ALERTS.BUDGET_REPLACED, _alert);
        }

        function retained () {
          angular.copy(ALERTS.BUDGET_RETAINED, _alert);
        }

        function saved () {
          angular.copy(ALERTS.SAVE_SUCCEEDED, _alert);
        }

        function saveFailed () {
          angular.copy(ALERTS.SAVE_FAILED, _alert);
        }

        return {
          alert: _alert,
          close: close,
          needAccount: needAccount,
          replaced: replaced,
          retained: retained,
          saved: saved,
          saveFailed: saveFailed
        };
      }
    ]);

})();
