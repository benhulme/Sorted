(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .service('PagedataParser', PagedataParser);

  /** @ngInject */
  function PagedataParser($log,
                          toastr,
                          BudgetTemplateParser)
  {


    function fromDatabase(obj)
    {
      var returnObj = {
        welcome : {
          Header : {
            Title : obj['welcome']['Header']['Title']
          },

        },
        'budget-template' : BudgetTemplateParser.parsePageData(obj['budget-template']),
        'budgeting-tool' : {

        }
      }

      return returnObj;
    }

    var service = {
      fromDatabase : fromDatabase
    };

    return service;
  }
})();
