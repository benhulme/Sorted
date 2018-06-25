(function () {
  'use strict';

  angular.module('budgetingTool')
    .controller('OverwriteConfirmModalCtrl', [
      '$scope',
      '$uibModalInstance',
      'existingBudget',
      'siteConfig',
      function ($scope, $uibModalInstance, existingBudget, siteConfig) {
        $scope.siteConfig = siteConfig;
        existingBudget.ParsedDate = Date.parse(existingBudget.Created);
        $scope.existingBudget = existingBudget;

        $scope.overwriteConfirmYes = function () {
          $uibModalInstance.close(true);
        };

        $scope.overwriteConfirmNo = function () {
          $uibModalInstance.close(false);
        };

        $scope.cancelOverwriteConfirm = function () {
          $uibModalInstance.dismiss('cancel');
        };
      }
    ]);

})();
