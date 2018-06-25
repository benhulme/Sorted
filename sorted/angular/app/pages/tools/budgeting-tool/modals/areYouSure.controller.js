(function () {
  'use strict';

  angular.module('budgetingTool')
    .controller('AreYouSureModalCtrl', [
      '$scope',
      '$uibModalInstance',
      function ($scope, $uibModalInstance) {
        $scope.cancelAreYouSure = function () {
          $uibModalInstance.close(false);
        };

        $scope.confirmAreYouSure = function () {
          $uibModalInstance.close(true);
        };
      }
    ]);

})();
