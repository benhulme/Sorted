/* global BigNumber */
(function () {
  'use strict';

  angular.module('budgetingTool')
    .factory('MasterCategory', [
      'Budget', 
      'colourGenerator', 
      function (Budget, colourGenerator) {
        function create() {
          // Rather blunt ID generation, hopefully to be supplanted eventually by a database!
          var id = _.maxBy(Budget.budget.MasterCategories, 'ID').ID + 1;

          return {
            ID: id,
            Title: "",
            Icon: {
              Filename: ""
            },
            Color: colourGenerator.getNextColour(),
            Cents: new BigNumber(0),
            Default: false,
            Expanded: false,
            Categories: []
          };
        }

        return {
          create: create
        };
    }]);

})();

