(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .controller('TimeoutModalController', TimeoutModalController);

  /** @ngInject */
  function TimeoutModalController(profileApi,
                                    siteConfig,
                                    SiteData,
                                    Api,
                                    $scope,
                                    $uibModalInstance,
                                    categoryData,
                                    BudgetCalculator) {
    var vm = this;

    vm.categoryData = categoryData.categoryData;

    vm.onCancel_clickHandler = function(ev)
    {
      if(ev) {
        ev.preventDefault();
      }
      $uibModalInstance.close();
    };


    activate();

    function activate() {
      console.log('TimeoutModalController : activate');
    }
  }
})();
