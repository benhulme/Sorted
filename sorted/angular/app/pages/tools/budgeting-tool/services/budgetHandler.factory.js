(function () {
  'use strict';

  angular.module('budgetingTool')
    .factory('budgetHandler', [
      '$q',
      'Alert',
      'Budget',
      'budgetModal',
      'Profile',
      function ($q, Alert, Budget, budgetModal, Profile) {
        function save () {
          // It's possible user arrived here by clicking cancel on the login form,
          // so we need to check the session storage:
          Profile.isLoggedIn()
            .then(Budget.save)
            .then(function () {
              if (Budget.saveInProgress()) {
                Budget.endSaveAttempt();
                Alert.saved();
              }
            })
            .catch(function (saveResponse) {
              // Existing calculator, check before overwriting
              if (saveResponse && saveResponse.calculator) {
                return budgetModal.overwriteConfirmModal(saveResponse.calculator);
              }

              // Waiting for user to login
              if (Profile.loginModalTriggered()) {
                return;
              }

              if (saveResponse && !saveResponse.loggedIn) {
                return Alert.needAccount();
              }

              return Alert.saveFailed();
            });
        }

        return {
          save: save
        };
      }
    ]);

})();
