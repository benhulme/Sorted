(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .controller('EditBudgetModalController', EditBudgetModalController);

  /** @ngInject */
  function EditBudgetModalController(profileApi,
                                    siteConfig,
                                    SiteData,
                                    Api,
                                    $scope,
                                    $rootScope,
                                     $uibModalInstance,
                                     BudgetCalculator,
                                     budgetingToolConfig) {

    var vm = this;

    vm.startCalc = angular.copy(BudgetCalculator.current.instance);
    vm.budgetCalculator = BudgetCalculator.current.instance;
    vm.budgetPeriods = budgetingToolConfig.BUDGET_PERIODS;
    vm.TOOL_ASSETS = siteConfig.TOOL_ASSETS;
    vm.isLoggedIn;
    vm.userProfileData;

    vm.onRemoveIncome_clickHandler = function(ev, streamModel, index)
    {
      BudgetCalculator.current.deleteIncomeStream(index);

      BudgetCalculator.current.calculateValues();
      $rootScope.$broadcast('chartRefresh');
    }

    vm.onAddIncome_clickHandler = function(ev)
    {
      ev.preventDefault();

      // vm.stateAddStream = !vm.stateAddStream;

      var period = angular.copy(BudgetCalculator.current.instance.Income.Period);
      console.log(period);

      BudgetCalculator.current.addIncomeStream('', 0, period, true);
    }

    vm.onOk_clickHandler = function(ev)
    {
      ev.preventDefault();
      console.log('on click');
      console.log(ev);

      BudgetCalculator.current.calculateValues();
      $rootScope.$broadcast('chartRefresh');
      $uibModalInstance.close();
    }

    vm.onUpdateStream_blurHandler = function(ev, streamModel)
    {

      var tempVal = angular.copy(streamModel.CentsFormattedString);
      streamModel.Cents = BudgetCalculator.current.strDollarsToCents(tempVal);

      BudgetCalculator.current.calculateValues();
      $rootScope.$broadcast('chartRefresh');
    }

    vm.onSetBudgetPeriod_clickHandler = function(ev, period)
    {
      // subCategoryModel.Period = angular.copy(period);
      period = angular.copy(period);
      BudgetCalculator.current.updateBudgetPeriod(period);


    }

    vm.onCancel_clickHandler = function(ev)
    {
      ev.preventDefault();

      vm.budgetCalculator.Income.Title        = vm.startCalc.Income.Title;
      vm.budgetCalculator.Income.Period.Title = vm.startCalc.Income.Period.Title;
      vm.budgetCalculator.Income.Streams      = vm.startCalc.Income.Streams;

      BudgetCalculator.current.calculateValues();
      $rootScope.$broadcast('chartRefresh');

      $uibModalInstance.close();
    }

    $scope.$on('resetBudget', function(event, args) {      
      vm.budgetCalculator.Income.Title        = vm.startCalc.Income.Title;
      vm.budgetCalculator.Income.Period.Title = vm.startCalc.Income.Period.Title;
      vm.budgetCalculator.Income.Streams      = vm.startCalc.Income.Streams;

      BudgetCalculator.current.calculateValues();
      $rootScope.$broadcast('chartRefresh');

    });

    activate();

    function activate() {
      console.log('EditBudgetModalController : activate');

      vm.isLoggedIn = false;

      vm.userProfileData = {
        Profile : {
          // ImageSource : './' + profileApi.profile.Image.FileName
          ImageSource : vm.TOOL_ASSETS + 'assets/images/user-icon.svg'
        }
      }


      console.log(profileApi.getProfile());
      console.log('11111111111111111111111111111111111111111');

      if(profileApi.getProfile()) {
        vm.isLoggedIn = true;

        if(profileApi.getProfile().Image.ID != 0 ) {
          vm.userProfileData = {
            Profile : {
              ImageSource : './' + profileApi.getProfile().Image.Filename
            }
          }
        }
      }


    }
  }
})();
