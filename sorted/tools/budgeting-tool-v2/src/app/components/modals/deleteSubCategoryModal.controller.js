(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .controller('DeleteSubCategoryController', DeleteSubCategoryController);

  /** @ngInject */
  function DeleteSubCategoryController(profileApi,
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

    vm.subCategoryTitle = categoryData.categoryTitle;

    vm.onDelete_clickHandler = function(ev)
    {
      ev.preventDefault();
      
      

      var masterCategoryIndex = categoryData.masterCategoryIndex;
      var categoryIndex = categoryData.categoryIndex;

      BudgetCalculator.current.deleteSubCategoryByIndex(masterCategoryIndex,categoryIndex);

      $rootScope.$broadcast('chartRefresh');
      $uibModalStack.dismissAll('close');
    }

    vm.onCancel_clickHandler = function(ev)
    {
      ev.preventDefault();

      $uibModalInstance.close();
    }

    activate();

    function activate() {
      console.log('DeleteSubCategoryController : activate');
    }
  }
})();
