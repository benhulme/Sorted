(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .factory('BudgetCalculator', BudgetCalculator);

  /** @ngInject */
  function BudgetCalculator($log, $http, $location, colourGenerator) {

    var factory = {
      current : new Budget(colourGenerator)
    }

    return factory;
  }
})();
