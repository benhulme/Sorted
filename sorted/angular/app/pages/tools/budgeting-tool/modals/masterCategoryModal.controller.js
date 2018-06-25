(function () {
  'use strict';

  angular.module('budgetingTool')
    .controller('MasterCategoryModalCtrl', [
      '$scope',
      '$uibModalInstance',
      'Budget',
      'budgetModal',
      'siteConfig',
      'masterCategoryModel',
      function ($scope, $uibModalInstance, Budget, budgetModal, siteConfig, masterCategoryModel) {
        $scope.siteConfig = siteConfig;
        $scope.masterCategory = masterCategoryModel;

        $scope.removeMasterCategory = function (id) {
          budgetModal.areYouSureModal()
            .then(function (confirm) {
              if (confirm) {
                Budget.deleteMasterCategory(id);
                $uibModalInstance.dismiss('cancel');
              }
            });
        };

        $scope.saveMasterCategory = function () {
          $uibModalInstance.close(masterCategoryModel);
        };

        $scope.cancelMasterCategory = function () {
          $uibModalInstance.dismiss('cancel');
        };
      }
    ]);

})();
