(function () {
  'use strict';

  angular.module('budgetingTool')
    .controller('safariModalCtrl', [
      '$scope',
      '$uibModalInstance',
      function ($scope, $uibModalInstance) {      

        $scope.cancelSafariReminder = function () {
          $uibModalInstance.dismiss('cancel');
        };
      }
    ]);

})();
