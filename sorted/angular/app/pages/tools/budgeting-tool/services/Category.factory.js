/* global BigNumber */
(function () {
  'use strict';

  angular.module('budgetingTool')
    .factory('Category', ['Budget', 'siteConfig', function (Budget, siteConfig) {
      function create () {
        // Rather blunt ID generation, hopefully to be supplanted eventually by a database!
        var id = _.maxBy(
          _.flatMap(Budget.budget.MasterCategories, 'Categories'), 
          'ID'
        ).ID + 1;

        return {
          ID: id,
          Title: "",
          Icon: {
            Filename: ""
          },
          Cents: new BigNumber(0),
          Default: false,
          Period: angular.copy(Budget.budget.Period)
        };
      }

      function getIconPath (icon) {
        return icon.IsCustom ? icon.Filename : siteConfig.APP_PATH + icon.Filename;
      }

      return {
        create: create,
        getIconPath: getIconPath
      };
    }
  ]);

})();

