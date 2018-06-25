(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .controller('MultiBudgetModalController', MultiBudgetModalController);

  /** @ngInject */
  function MultiBudgetModalController(profileApi,
                                    siteConfig,
                                    SiteData,
                                    Api,
                                    $scope,
                                    $uibModalInstance,
                                    BudgetCalculator) {
    var vm = this;
    vm.Api = Api;

    vm.editDate = vm.Api.getLastEditDate();

    vm.onCancel_clickHandler = function(ev)
    {
      if(ev) {
        ev.preventDefault();
      }
      $uibModalInstance.close();
    };

    vm.onOverWrite_clickHandler = function (ev) {

      if(ev) {
        ev.preventDefault();
      }

      var parseObj = BudgetCalculator.current.parseForUpload();
      Api.saveBudget(parseObj, true);

      $uibModalInstance.close();
    }


    activate();

    function activate() {
      console.log('MultiBudgetModalController : activate');

    }
  }
})();
