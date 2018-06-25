(function () {
  'use strict';

  angular.module('budgetingTool')
    .controller('LocationChangeWarningModalCtrl', [
      '$scope',
      '$uibModalInstance',
      function ($scope, $uibModalInstance) {
        $scope.locationChangeContinue = function () {
          $uibModalInstance.close(true);
        };

        $scope.locationChangeCancel = function () {
          $uibModalInstance.close(false);
        };
      }
    ]);

})();
