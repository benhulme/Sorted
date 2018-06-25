(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .service('BudgetTemplateParser', BudgetTemplateParser);

  /** @ngInject */
  function BudgetTemplateParser($log,
                          toastr)
  {

    function parsePageData(obj)
    {
      var returnObj = {
        Header: {
          Title: obj['Header']['Title'],
          Content: obj['Header']['Content']
        },
        Questions: {
          List: []
        },
        MasterCategories : []
      }

      // Parse the questions
      for(var i = 0; i < obj['Questions']['List'].length; i++)
      {
        var question = obj['Questions']['List'][i];
        returnObj.Questions.List.push(parseQuestion(question));
      }

      // Parse the master categories
      for(var i = 0; i < obj['MasterCategories'].length; i++)
      {
        returnObj.MasterCategories.push(parseMasterCategory(obj['MasterCategories'][i]));
      }

      return returnObj;
    }

    function parseMasterCategory(obj)
    {
      var masterCategory = {
        ID : obj['ID'],
        Title : obj['Title'],
        Color : obj['Color'],
        // Cents : obj['Cents'],
        // Default : obj['Default'],
        // Expanded : obj['Expanded'],
        Categories : []
      }
      if(obj['Icon']) {
        masterCategory['Icon'] = {
          Filename : obj['Icon']['Filename']
        }
      }

      for(var i = 0; i < obj['Categories'].length; i++)
      {
        masterCategory.Categories.push(parseSubCategory(obj['Categories'][i]));
      }

      return masterCategory;
    }

    function parseSubCategory(obj) {
      var subCategory = {
        Default : obj['Default'],
        ID : obj['ID'],
        Title : obj['Title'],
      };
      if(obj['Icon']) {
        subCategory['Icon'] = {
          Filename : obj['Icon']['Filename']
        }
      }

      return subCategory;
    }

    function parseQuestion(obj)
    {
      var returnObj = {
        Question : obj['Title'],
        TemplateColor : obj['TemplateColor'],
        Color : obj['Color'],
        Buttons : []
      }

      // Some of the question have special button interaction
      // @Toggle      Boolean   Will turn off the other buttons when set to active
      if(obj['ButtonOptions']) {
        returnObj['ButtonOptions'] = {
          Toggle : obj['ButtonOptions']['Toggle'],
          ToggleSelectDefault : obj['ButtonOptions']['ToggleSelectDefault']
        }
      } else {
        returnObj['ButtonOptions'] = {
          Toggle : false
        }
      }

      for(var i = 0; i < obj['Buttons'].length; i++)
      {
        var button = obj['Buttons'][i];
        returnObj.Buttons.push(
          {
            CategoryId : button.CategoryId,
            Title : button.Title,
            Icon : button.Icon,
            Categories : button.Categories
          }
        );
      }

      return returnObj;
    }

    /*
    * Find the Default items within all the Sub Categories
    *
    * @param availableMasterCategories:      Array:  An array of formatted Master category objects

      @return Array
    * */
    function getDefaultSubCategories(availableMasterCategories)
    {
      var defaultSubCategories = [];

      for(var i = 0; i < availableMasterCategories.length; i++)
      {
        var availableMasterCategory = availableMasterCategories[i];
        for(var j = 0; j < availableMasterCategory.Categories.length; j++) {
          var availableCategory = availableMasterCategory.Categories[j];
          if(availableCategory['Default']) {
            defaultSubCategories.push(availableCategory['ID']);
          }
        }
      }

      return defaultSubCategories;
    }

    /*
    * Use a passed list of sub category Ids to format them into Master Categories with many Sub categories
    *
    * @param categoriesArray:                Array:  An Array of integers
    * @param availableMasterCategories:      Array:  An array of formatted Master category objects
    * @param defaultPeriod: Optional         Object: The formatted Period Object

      @return Object: Formatted budget template
    * */
    function associateCategoriesWithMasterCategories(categoriesArray, availableMasterCategories, defaultPeriod)
    {
      var tempSelectedCategories = categoriesArray;

      var masterCategoriesObj = {};
      // Create this users Master and Categories from the set category Ids
      for(var i = 0; i < tempSelectedCategories.length; i++)
      {
        // console.log(tempSelectedCategories[i]);
        for(var j = 0; j < availableMasterCategories.length; j++)
        {
          var availableMasterCategory = availableMasterCategories[j];
          // console.log(availableMasterCategories[j].Title);
          for(var k = 0; k < availableMasterCategory.Categories.length; k++)
          {
            var availableCategory = availableMasterCategory.Categories[k];
            // console.log(availableCategory.Title);
            if(availableCategory.ID == tempSelectedCategories[i]) {

              if(masterCategoriesObj[availableMasterCategory.ID] == undefined) {
                masterCategoriesObj[availableMasterCategory.ID] = {
                  ID : availableMasterCategory.ID,
                  Title : availableMasterCategory.Title,
                  Icon : availableMasterCategory.Icon.Filename,
                  Color : availableMasterCategory.Color,
                  PieValuePercent : 0,
                  ValueCents : 0,
                  ValueFormattedString : '$0.00',
                  DisplayOpen: false,
                  SubCategories : []
                }
              }

              var newSubCategory = {
                ID: availableCategory.ID,
                MasterCategoryID: availableMasterCategory.ID,
                Title : availableCategory.Title,
                Image: availableCategory.Icon.Filename,
                ValueCents : 0,
                ValueFormattedString : '0.00'
              };

              if(defaultPeriod != undefined) // Only set the period if defined
              {
                newSubCategory['Period'] = defaultPeriod;
              }

              masterCategoriesObj[availableMasterCategory.ID].SubCategories.push(newSubCategory);
            }
          }
        }

      }


      // Convert the Object to an Array
      var masterCategories = [];
      angular.forEach(masterCategoriesObj, function(value, key)
      {
        masterCategories.push(value);
      });

      console.log(masterCategories);

      return masterCategories;
    }

    var service = {
      parseQuestion : parseQuestion,
      parsePageData : parsePageData,

      getDefaultSubCategories : getDefaultSubCategories,
      associateCategoriesWithMasterCategories : associateCategoriesWithMasterCategories
    };

    return service;
  }
})();
