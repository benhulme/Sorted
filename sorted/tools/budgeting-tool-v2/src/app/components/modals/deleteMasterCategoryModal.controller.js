(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .controller('DeleteMasterCategoryController', DeleteMasterCategoryController);

  /** @ngInject */
  function DeleteMasterCategoryController(profileApi,
                                    siteConfig,
                                    SiteData,
                                    Api,
                                    $scope,
                                    $rootScope,
                                    $uibModalInstance,
                                    $uibModalStack,
                                    categoryData,
                                    BudgetCalculator) {

    var vm = this;

    vm.categoryData = categoryData.categoryData;

    vm.onDelete_clickHandler = function(ev)
    {
      ev.preventDefault();
      
      BudgetCalculator.current.deleteMasterCategotyByID(vm.categoryData.ID);
      BudgetCalculator.current.calculateValues();
      $rootScope.$broadcast('chartRefresh');
      $uibModalStack.dismissAll('close');
      $uibModalInstance.close();
    };

    vm.onCancel_clickHandler = function(ev)
    {
      ev.preventDefault();

      $uibModalInstance.close();
    };


    activate();

    function activate() {
      console.log('DeleteMasterCategoryController : activate');
    }
  }
})();
