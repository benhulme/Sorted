(function () {
  'use strict';

  angular.module('budgetingTool')
    .controller('LogoutWarningModalCtrl', [
      '$scope',
      '$uibModalInstance',
      function ($scope, $uibModalInstance) {
        $scope.logoutContinue = function () {
          $uibModalInstance.close(true);
        };

        $scope.logoutCancel = function () {
          $uibModalInstance.close(false);
        };
      }
    ]);

})();
