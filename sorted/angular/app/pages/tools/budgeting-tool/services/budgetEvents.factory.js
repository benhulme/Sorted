(function () {
  'use strict';

  angular.module('budgetingTool')
    .factory('budgetEvents', [
      '$timeout',
      '$window',
      'Budget',
      'budgetHandler',
      'budgetingToolConfig',
      'budgetModal',
      'Profile',
      function ($timeout, $window, Budget, budgetHandler, budgetingToolConfig, budgetModal, Profile) {
        function changeLocationWarning (e, nextUrl, unbindLocationWarning) {
          if (Budget.isDirty()) {
            budgetModal.locationChangeWarningModal(nextUrl, unbindLocationWarning);
            e.preventDefault();
          }
        }

        function warnClose () {
          if (Budget.isDirty()) {
            return budgetingToolConfig.BROWSER_CLOSE_WARNING;
          }
        }

        angular.element($window).on('beforeunload', warnClose);
        angular.element($window).on('hidden.bs.modal', budgetHandler.save);
        angular.element($window).on('hidden.bs.modal', Profile.updateFromSession);

        var _reminder = $timeout(function () {
          Profile.isLoggedIn()
            .catch(budgetModal.loginReminderModal);
        }, budgetingToolConfig.LOGIN_REMINDER_TIMEOUT);

        function onDestroy (unbindLocationWarning) {
          angular.element($window).off('beforeunload', warnClose);
          angular.element($window).on('hidden.bs.modal', budgetHandler.save);
          angular.element($window).off('hidden.bs.modal', Profile.updateFromSession);
          unbindLocationWarning();
          if (_reminder) {
            $timeout.cancel(_reminder);
          }
        }

        return {
          changeLocationWarning: changeLocationWarning,
          onDestroy: onDestroy,
          warnClose: warnClose
        };
    }
  ]);

})();
