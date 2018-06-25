(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .controller('WelcomeController', WelcomeController);

  /** @ngInject */
  function WelcomeController($timeout,
                             $location,
                             siteConfig,
                             budgetingToolConfig,
                             BudgetCalculator,
                             SiteData,
                             $log,
                             $scope,
                             Api,
                             profileApi) {
    var vm = this;

    vm.siteConfig = siteConfig;
    vm.TOOL_ASSETS = siteConfig.TOOL_ASSETS;
    vm.Api = Api;
    vm.profileApi = profileApi;

    vm.breadcrumbs = [{
      path : '/tool',
      title : 'Tools'
    },{
      path : '/tool/budgeting-tool#/welcome',
      title : 'Budgeting Tool'
    },{
      path : '/tool/budgeting-tool#/welcome',
      title : 'Welcome'
    }];

    vm.data;
    vm.isLoggedIn = false;

    vm.budget = {
      Cents : $location.search()['salary'],
      Period : budgetingToolConfig.BUDGET_PERIODS[budgetingToolConfig.DEFAULT_BUDGET_PERIOD]
    };
    vm.initialPeriod = budgetingToolConfig.BUDGET_PERIODS[budgetingToolConfig.DEFAULT_BUDGET_PERIOD];

    vm.budgetPeriods = budgetingToolConfig.BUDGET_PERIODS;

    $scope.$on('$viewContentLoaded', function(){

      SiteData.get('welcome').then(function(response)
      {
        vm.data = response;
      });

      profileApi.isLoggedIn().then(function(response)
      {
        vm.isLoggedIn = response;

        //vm.Api.loadBudget();

      }, function(error)
      {
        vm.isLoggedIn = false;
      });

    });

    activate();




    function activate() {
      // console.log(Budget.static.simple());
    }

    vm.onSetPeriod_clickHandler = function(ev, period)
    {
      var tempPeriod = angular.copy(period);

      vm.budget.Period = tempPeriod;
    }

    vm.next = function () {

      vm.Api.setIsNewBudget(true);

      if(!$scope.budgetAmountForm['amount-to-budget'].$valid) {
        angular.element('#amount-to-budget').parent().addClass('input-invalid');
      } else {
        angular.element('#amount-to-budget').parent().removeClass('input-invalid');
      }

      if ($scope.budgetAmountForm.$valid) {

        var cents = angular.copy(vm.budget.Cents);
        cents = BudgetCalculator.current.strDollarsToCents(cents);

        var period = angular.copy(vm.budget.Period);

        BudgetCalculator.current.create('Your budget');
        BudgetCalculator.current.addIncomeStream('My income', cents, period, false);

        // var cents = angular.copy(
        //     Budget.math.convert(vm.budget.Cents, vm.initialPeriod, vm.budget.Period)
        //   );
        // console.log(cents);

        return $location.path('/budget-template');
      }

      // return;

      // if ($scope.budgetAmountForm.$valid) {
      //   var cents = angular.copy(
      //     periodAmount.convert($scope.budget.Cents, $scope.initialPeriod, $scope.budget.Period)
      //   );
      //   $scope.budget.IncomeStreams = [{
      //     Title: 'My income',
      //     Cents: cents,
      //     Removeable: false
      //   }];
      //   angular.copy($scope.budget, Budget.budget);
      //

      // }
    };
  }
})();
