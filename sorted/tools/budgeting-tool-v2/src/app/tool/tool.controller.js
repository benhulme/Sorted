(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .controller('ToolController', ToolController);

  /** @ngInject */
  function ToolController(profileApi,
                                    BudgetCalculator,
                                    siteConfig,
                                    SiteData,
                                    Api,
                                    $scope,
                                    $rootScope,
                                    $window,
                                    $location,
                                    BudgetView,
                                    $timeout,
                                    $uibModal,
                                    budgetingToolConfig) {

    var vm = this;

    vm.siteConfig = siteConfig;
    vm.TOOL_ASSETS = siteConfig.TOOL_ASSETS;
    vm.Api = Api;
    vm.profileApi = profileApi;
    vm.salary;

    vm.breadcrumbs = [{
      path : '/tool',
      title : 'Tool'
    },{
      path : '/tool/budgeting-tool#/',
      title : 'Budgeting Tool'
    }];

    vm.budgetPeriods = budgetingToolConfig.BUDGET_PERIODS;
    vm.chartOptions = budgetingToolConfig.BREAKDOWN_CHART_OPTIONS;

    vm.data;
    vm.imagePath = vm.TOOL_ASSETS + 'assets/images/user-icon.svg';
    vm.currentBudget;

    vm.viewState;
    vm.breakdownCollapse = false;
    vm.isLoggedIn = false;
    


    vm.isReady = false;

    vm.showMobileBudget = false;


    $rootScope.$watch('userLogged', function () {
      console.log('watch triggered');
      if($rootScope.userLogged){
        console.log('user now logged in');
        $rootScope.userLogged = false;
        var localNewBudget = false;

        console.log('init budget test', BudgetCalculator.current.instance);
        
        if(BudgetCalculator.current.instance !== undefined){
          if(vm.Api.getIsNewBudget()){
           localNewBudget = true;
          }
        }else{
          console.log('old budget maybe?');
        }
        
        // see if the user is logged in
        profileApi.isLoggedIn().then(function(response)
        {
          vm.isLoggedIn = response;

          // try and load any existing budgets
          vm.Api.loadBudget().then(function (resp) {
            if(vm.Api.getBudgetData()) {
              // if the budget hasnt been p
              if(BudgetCalculator.current.instance) {
                console.log('We already have a budget set');
                
                if(localNewBudget){
                  vm.Api.setIsNewBudget(true);
                  //trigger the overwrite modal
                  var parseObj = BudgetCalculator.current.parseForUpload();
                  vm.Api.saveBudget(parseObj);
                }
              } else {
                console.log('Loading Budget');
                BudgetCalculator.current.instance = vm.Api.getBudgetData();
                $location.path("/");
              }
            }else{
              // Only auto save new budgets
              vm.Api.setIsNewBudget(true);
              console.log('now save');
              var parseObj = BudgetCalculator.current.parseForUpload();
              vm.Api.saveBudget(parseObj);
            }
          });          

        });



      }
    });

    $scope.$on('chartRefresh', function(event, args) {      
      updateChartData();
    });

    $rootScope.$watch('chartRefresh', function(newValue) {
      console.log('chart refresh', newValue);
      if (!newValue) return;      
      updateChartData();
      vm.chartRefresh = false;
      console.log('ran and set to', vm.chartRefresh);
    });


    vm.onToggleMobileBudget_clickHandler = function (ev) {

      debugger

      if(ev) {
        ev.preventDefault()
      }

      vm.showMobileBudget = !vm.showMobileBudget;

    }

    vm.onSetPeriod_clickHandler = function(ev, period, subCategoryModel)
    {
      ev.preventDefault();
      subCategoryModel.Period = angular.copy(period);

      BudgetCalculator.current.calculateValues();
      updateChartData();
    }

    // Popovers
    vm.newMasterCategory = {
      Title : '',
      PopoverOpen : false,
      SubCategories : undefined
    }

    vm.onMasterCategoryCancel_clickHandler = function(ev)
    {
      vm.newMasterCategory.PopoverOpen = false;
      vm.newMasterCategory.Title = '';
    }

    vm.onMasterCategoryInput_keyUpHandler = function(ev)
    {
      if (ev.defaultPrevented) {
        return; // Should do nothing if the default action has been cancelled
      }
      var key;
      var handled = false;
      if (ev.key !== undefined) {
        // Handle the event with KeyboardEvent.key and set handled true.
        key = ev.which;
      } else if (ev.keyIdentifier !== undefined) {
        // Handle the event with KeyboardEvent.keyIdentifier and set handled true.
        key = ev.keyIdentifier;
      } else if (ev.keyCode !== undefined) {
        // Handle the event with KeyboardEvent.keyCode and set handled true.
        key = ev.keyCode;
      }

      if (handled) {
        // Suppress "double action" if event handled
        ev.preventDefault();
      }

      // If hitting the Enter key, save the new Master Category
      if (key == 13) {

        var obj = angular.copy(vm.newMasterCategory);
        BudgetCalculator.current.addNewMasterCategory(obj.Title);

        vm.newMasterCategory.Title = '';
        vm.newMasterCategory.PopoverOpen = false;
      }
    }

    vm.onMaterCategoryEdit_clickHandler = function(ev) {
      ev.preventDefault();
      console.log('onMaterCategoryEdit_clickHandler');
    }

    vm.onMasterCategorySave_clickHandler = function(ev)
    {
      ev.preventDefault();

      vm.newMasterCategory.PopoverOpen = false;

      var obj = angular.copy(vm.newMasterCategory);
      BudgetCalculator.current.addNewMasterCategory(obj.Title);

      vm.newMasterCategory.Title = '';
    }

    vm.onViewToggle_clickHandler = function(ev, viewTo)
    {
      ev.preventDefault();

      if(viewTo != vm.viewState)
      {
        vm.viewState = viewTo;
        BudgetCalculator.current.setBudgetView(viewTo);
      }
    }

    vm.onMasterCategory_clickHandler = function(ev, masterCategoryObj)
    {
      ev.preventDefault();

      masterCategoryObj.DisplayOpen = !masterCategoryObj.DisplayOpen;
    }

    vm.onBreakdownToggle_clickHandler = function (ev) {
      ev.preventDefault();

      vm.breakdownCollapse = !vm.breakdownCollapse;
    }

    /*
    * Sub Categories within a Master Category
    * */
    vm.onSubCategoryTitle_focusInHandler = function(ev, subCategoryObj)
    {
      ev.preventDefault();

      subCategoryObj.stateEdit = true;
    }

    vm.onSubCategoryTitle_focusOutHandler = function(ev, subCategoryObj)
    {
      ev.preventDefault();

      console.log(ev);

      subCategoryObj.stateEdit = false;
    }

    vm.onSubCategoryValue_focusInHandler = function(ev, subCategoryObj)
    {
      ev.preventDefault();

      subCategoryObj.stateEdit = true;

      // console.log(subCategoryObj.ValueFormattedString);
      // console.log(parseFloat(subCategoryObj.ValueFormattedString));

      var tempVal = angular.copy(subCategoryObj.ValueFormattedString);
      var convertToFloat = parseFloat(tempVal);
      var isItNaN = isNaN(convertToFloat);

      if((convertToFloat == 0) || isItNaN) {
        subCategoryObj.ValueFormattedString = '';
      }
    }

    vm.onSubCategoryValue_focusOutHandler = function(ev, subCategoryObj)
    {
      ev.preventDefault();

      subCategoryObj.stateEdit = false;

      var tempVal = angular.copy(subCategoryObj.ValueFormattedString);
      var convertToFloat = parseFloat(tempVal);

      // If the value string is empty then set to 0
      if(isNaN(convertToFloat)) {
        subCategoryObj.ValueFormattedString = '0.00';
      }

      tempVal = angular.copy(subCategoryObj.ValueFormattedString);
      var cents = BudgetCalculator.current.strDollarsToCents(tempVal);
      subCategoryObj.ValueCents = cents;

      BudgetCalculator.current.calculateValues();
      console.log('bam!');
      updateChartData();
    }

    vm.onSubCategoryTitle_keyUpHandler = function(ev)
    {

      if(ev.keyCode == 13) // On Enter key
      {
        ev.preventDefault();

        angular.element(ev.currentTarget).blur(); // Force focus out

        return;
      }
    }

    // Save this budget
    vm.onSave_clickHandler = function(ev)
    {
      ev.preventDefault();
      var parseObj = BudgetCalculator.current.parseForUpload();

      Api.saveBudget(parseObj);
      Api.loadBudget();

    }




    function updateChartData()
    {


      var chartData = [];

      var temp = angular.copy(BudgetCalculator.current.getCategories());

      // Quickly check if this is the first time and set defaults
      var isZeroed = true;
      for(var i = 0; i < temp.length; i++)
      {
        if((temp[i].ValueCents > 0) && isZeroed) {
          isZeroed = false;
        }
      }

      if(!isZeroed) {
        for(var i = 0; i < temp.length; i++)
        {
          chartData.push({
            category : temp[i].Title,
            dollars : temp[i].ValueCents / 100,
            color : temp[i].Color
          });
        }
      } else {
        for(var i = 0; i < temp.length; i++)
        {
          var color = tinycolor(temp[i].Color);
          color.setAlpha(0.5);
          // color.lighten(35);

          chartData.push({
            category : temp[i].Title,
            dollars : 0.25,
            color : color.toRgbString()
          });
        }
      }

      vm.chartOptions.dataSource = new kendo.data.DataSource({
        data: chartData
      });
    }

    activate();

    function activate() {

    }

    vm.showSaveWaring = function () {
      console.log('check');

      profileApi.isLoggedIn().then(function(response) {
        vm.isLoggedIn = response;

        if (!vm.isLoggedIn) {
          debugger
          var modalInstance = $uibModal.open({
            templateUrl: 'app/components/modals/timeoutModal.html',
            controller: 'EditBudgetModalController',
            controllerAs: '$ctrl',
            size: 'md'
          });
        }

      });

    }


    $scope.onExit = function(e) {

      if(BudgetCalculator.current.changeSinceSave) {
        return 'You\'re working on a budget that hasn\'t been saved.'
      }

    };



    $scope.$on('$viewContentLoaded', function(){

      try {
        document.getElementsByClassName('ToolBudgetCalculatorPage')[0].scrollIntoView();
      } catch (e) {}


      // see if the user is logged in
      profileApi.isLoggedIn().then(function(response)
      {
        vm.isLoggedIn = response;

        // se the users profile image
        if(profileApi.getProfile()) {
          // set the image of the logged in user //TODO: this needs to handle users with no images
          console.log('set user image', profileApi.getProfile().Image.Filename);
          if(profileApi.getProfile().Image.ID != 0 ) {
            vm.imagePath = './' + profileApi.getProfile().Image.Filename;
          }
        }

        // try and load any existing budgets
        vm.Api.loadBudget().then(function (resp) {

          if(vm.Api.getBudgetData()) {
            // if the budget hasnt been p
            if(BudgetCalculator.current.instance) {
              console.log('We already have a budget set');
            } else {
              BudgetCalculator.current.instance = vm.Api.getBudgetData();
            }
            vm.startApp();
          }

          vm.startApp();

        }, function (err) {

          // if is no budget then we start the ap anyway
          vm.startApp();
        })



      }, function(error)
      {

        vm.startApp();
        vm.isLoggedIn = false;

      });

      // if we have a budget then we can just short cut and get into this
      if( BudgetCalculator.current.instance) {
        vm.startApp()
      }



    });


    vm.startApp = function () {


     // If there is no Budget instance yet, redirect to welcome
     if(BudgetCalculator.current.instance == undefined) {
       $location.path("/welcome");
       return;
     }
     
      if(!Api.hasAccessedTool) {
        if(profileApi.getProfile()) {
          
        } else {
          $timeout(vm.showSaveWaring, 300000);
        }
        $window.onbeforeunload = $scope.onExit;
      }

      Api.hasAccessedTool = true;


      SiteData.get('budgeting-tool').then(function(response)
      {
        // vm.data = setDataDefaults(response);
        vm.data = response;

      });

      vm.currentBudget = BudgetCalculator.current.instance;
      vm.budgetData = {
        MasterCategories : BudgetCalculator.current.getCategories()
      }
      var preferredView = BudgetCalculator.current.getBudgetView();
      vm.viewState = preferredView;

      BudgetCalculator.current.calculateValues();


      vm.isReady = true;

      $timeout(updateChartData, 1);

    }
  }
})();
