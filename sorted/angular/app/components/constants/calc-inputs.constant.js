(function() {
  'use strict';

  angular.module('sorted')
    .constant('calcInputs', {
      mortgageTool: '/json/calc-inputs/mortgage-tool.json',
      debtCalculator: '/json/calc-inputs/debt-calculator.json',
      retirementPlanner: '/json/calc-inputs/retirement-planner.json',
      netWorthCalculator: '/json/calc-inputs/net-worth-calculator.json',
      savingsCalculator: '/json/calc-inputs/savings-calculator.json',
      kiwisaverFees: '/json/calc-inputs/kiwisaver-fees.json',
      moneyPersonality: '/json/calc-inputs/money-personality.json',
      kiwisaverSavingsCalculator: '/json/calc-inputs/kiwisaver-savings-calculator.json',
      investmentPlanner: '/json/calc-inputs/investment-planner.json',
    });
}());
