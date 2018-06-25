(function () {
  'use strict';

  angular.module('budgetingTool')
    .controller('LoginReminderModalCtrl', [
      '$scope',
      '$uibModalInstance',
      function ($scope, $uibModalInstance) {
        $scope.reminderModalLogin = function () {
          $uibModalInstance.dismiss('cancel');
          angular.element('#login-modal').modal('show');
        };

        $scope.reminderModalSignup = function () {
          $uibModalInstance.dismiss('cancel');
          angular.element('#signup-modal').modal('show');
        };

        $scope.cancelLoginReminder = function () {
          $uibModalInstance.dismiss('cancel');
        };
      }
    ]);

})();
