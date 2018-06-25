(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .controller('BudgettemplateController', BudgettemplateController);

  /** @ngInject */
  function BudgettemplateController(profileApi,
                                    siteConfig,
                                    SiteData,
                                    Api,
                                    $scope,
                                    $location,
                                    BudgetTemplateParser,
                                    BudgetCalculator,
                                    BudgetView) {

    var vm = this;

    vm.siteConfig = siteConfig;
    vm.TOOL_ASSETS = siteConfig.TOOL_ASSETS;

    vm.breadcrumbs = [{
      path : '/tool',
      title : 'Tools'
    },{
      path : '/tool/budgeting-tool#/welcome',
      title : 'Budgeting Tool'
    },{
      path : '/tool/budgeting-tool#/budget-template',
      title : 'Budget Template'
    }];

    vm.data;
    vm.TOOL_ASSETS = siteConfig.TOOL_ASSETS;

    activate();

    function activate() {

    }

    /*
    * Skip click handler
    * Use only default category Ids

      @return nothing
    * */
    vm.onSkip_clickHandler = function(ev)
    {
      ev.preventDefault();

      vm.submitForm(true);
    }


    /*
    * Submit the options form
    * Loop through the questions array and find which categories the user has selected
    *
    * finally, navigate to the Budgeting Tool

      @return nothing
    * */
    vm.submitForm = function(useOnlyDefaults)
    {
      useOnlyDefaults = (useOnlyDefaults != undefined) ? useOnlyDefaults : false ;

      var tempSelectedCategories = [];
      var viewTypeIndex = 0;
      var preferredView;

      var availableMasterCategories = angular.copy(vm.data.MasterCategories);
      var defaultCategories = BudgetTemplateParser.getDefaultSubCategories(availableMasterCategories);

      var tempButtonsList = angular.copy(vm.data);

      if(useOnlyDefaults) {

        viewTypeIndex = 1;

      } else {
        // Iterate through the questions and find the options the user has selected
        for(var i = 0; i < tempButtonsList.Questions.List.length; i++)
        {
          var question = tempButtonsList.Questions.List[i];
          for(var j = 0; j < question.Buttons.length; j++)
          {
            var button = question.Buttons[j];
            if(button.isSelected) {
              // Add the categoryId's to the array
              tempSelectedCategories = tempSelectedCategories.concat(button.Categories);
            }

            // Get the view type
            if(i == tempButtonsList.Questions.List.length-1) {
              if(button.isSelected) {
                viewTypeIndex = j;
              }
            }
          }
        }
      }

      switch(parseInt(viewTypeIndex)) {
        case 0 :
          preferredView = BudgetView.GRID;
          break;

        case 1 :
          preferredView = BudgetView.LIST;
          break;
      }

      tempSelectedCategories = tempSelectedCategories.concat(defaultCategories);

      // Remove any duplicate categories
      var unique = tempSelectedCategories.filter(function(item, pos) {
        return tempSelectedCategories.indexOf(item) == pos;
      });

      var period = BudgetCalculator.current.instance.Income.Period;

      var masterCategories = BudgetTemplateParser.associateCategoriesWithMasterCategories(unique, availableMasterCategories, period);

      // // Temp set some data
      // var masterCategories = [
      //   {
      //     ID: 0,
      //     Title : 'Everyday expenses',
      //     Icon : '/themes/sorted/standalone/tools/budget-calculator/assets/images/everyday_expenses.svg',
      //     ValueCents : 10000,
      //     ValueFormattedString : '$100',
      //     DisplayOpen: true,
      //     SubCategories : [{
      //       ID: 0,
      //       MasterCategoryID: 0,
      //       Title : 'Groceries',
      //       Image: '/themes/sorted/standalone/tools/budget-calculator/assets/images/categories/groceries.jpg',
      //       ValueCents : 0,
      //       ValueFormattedString : '$0.00'
      //     },
      //       {
      //         ID: 1,
      //         MasterCategoryID: 0,
      //         Title : 'Groceries',
      //         Image: '/themes/sorted/standalone/tools/budget-calculator/assets/images/categories/groceries.jpg',
      //         ValueCents : 0,
      //         ValueFormattedString : '$0.00'
      //       },
      //       {
      //         ID: 2,
      //         MasterCategoryID: 0,
      //         Title : 'Groceries',
      //         Image: '/themes/sorted/standalone/tools/budget-calculator/assets/images/categories/groceries.jpg',
      //         ValueCents : 0,
      //         ValueFormattedString : '$0.00'
      //       },
      //       {
      //         ID: 3,
      //         MasterCategoryID: 0,
      //         Title : 'Groceries',
      //         Image: '/themes/sorted/standalone/tools/budget-calculator/assets/images/categories/groceries.jpg',
      //         ValueCents : 0,
      //         ValueFormattedString : '$0.00'
      //       },
      //       {
      //         ID: 4,
      //         MasterCategoryID: 0,
      //         Title : 'Groceries',
      //         Image: '/themes/sorted/standalone/tools/budget-calculator/assets/images/categories/groceries.jpg',
      //         ValueCents : 0,
      //         ValueFormattedString : '$0.00'
      //       }]
      //   }
      // ];

      BudgetCalculator.current.setBudgetView(preferredView);
      BudgetCalculator.current.addInitialCategories(masterCategories);
      BudgetCalculator.current.calculateValues();


      return $location.path('/');
    }

    /*
    * user has clicked a question Button item
    * Different interactions depending on Button options
    *
    * @param preset:      Object:  This clicked button model
    * @param index:       Int:     The index of where this preset is in the Question
    * @param question:    Object:  The preset's parent Question model

      @return nothing
    * */
    vm.onQuestion_clickHandler = function(ev, preset, index, question)
    {
      ev.preventDefault();

      if(question.ButtonOptions) {
        if(question.ButtonOptions.Toggle) {
          for(var i = 0; i < question.Buttons.length; i++)
          {
            if(i == index) {
              question.Buttons[i].isSelected = true;
            } else {
              question.Buttons[i].isSelected = false;
            }
          }
        } else {
          preset.isSelected = !preset.isSelected;
        }
      }
    }

    /*
    * Set some data defaults
    *

      @return Object with defaults set
    * */
    function setDataDefaults(data)
    {
      for(var i = 0; i < data.Questions.List.length; i++)
      {
        var question = data.Questions.List[i];
        if(question.ButtonOptions && question.ButtonOptions.Toggle) {
          question['Buttons'][question.ButtonOptions.ToggleSelectDefault].isSelected = true; // Set list view to true
        }
      }

      return data;
    }

    $scope.$on('$viewContentLoaded', function(){

      try {
        document.getElementsByClassName('ToolBudgetCalculatorPage')[0].scrollIntoView();
      } catch (e) {}


      // If there is no Budget instance yet, redirect to welcome
      if(BudgetCalculator.current.instance == undefined) {

        $location.path("/welcome");

        return;

      }

      SiteData.get('budget-template').then(function(response)
      {
        vm.data = setDataDefaults(response);
      });

      profileApi.isLoggedIn().then(function(response)
      {
        vm.isLoggedIn = response;
      }, function(error)
      {
        vm.isLoggedIn = false;
      });

    });
  }
})();
