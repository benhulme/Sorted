(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .controller('EditMasterCatModalController', EditMasterCatModalController);

  /** @ngInject */
  function EditMasterCatModalController(profileApi,
                                        siteConfig,
                                        SiteData,
                                        Api,
                                        $scope,
                                        $rootScope,
                                        categoryData,
                                        $uibModalInstance,
                                        BudgetCalculator,
                                        budgetingToolConfig) {

    var vm = this;


    vm.siteConfig = siteConfig;
    vm.TOOL_ASSETS = siteConfig.TOOL_ASSETS;
    // init the vars
    vm.categoryData = categoryData.categoryData;
    vm.categoryTitle = vm.categoryData.Title;
    vm.iconSrc = vm.TOOL_ASSETS + vm.categoryData.Icon;
    vm.catColor = vm.categoryData.Color;
    vm.catId = vm.categoryData.ID;
    vm.icon = vm.categoryData.Icon;

    console.log(categoryData);

    vm.onOk_clickHandler = function(ev)
    {
      ev.preventDefault();
      console.log('on click');
      console.log(ev);

      BudgetCalculator.current.updateMasterCategoryTitle( vm.categoryData.ID, vm.categoryTitle);

      $uibModalInstance.close();
    };

    vm.onDelete_clickHandler = function (ev) {
      ev.preventDefault();

      BudgetCalculator.current.deleteMasterCategotyByID(vm.categoryData.ID);
      
      BudgetCalculator.current.calculateValues();
      $rootScope.$broadcast('chartRefresh');

    };

    vm.onCancel_clickHandler = function(ev)
    {
      ev.preventDefault();

      $uibModalInstance.close();
    }

    activate();

    function activate() {
      console.log('EditMasterCatModalController : activate');


      console.log();
    }
  }
})();
