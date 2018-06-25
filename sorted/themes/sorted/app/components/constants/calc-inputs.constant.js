(function() {
  'use strict';

  angular.module('sorted')
    .constant('calcInputs', {
      mortgageTool: '/themes/sorted/json/calc-inputs/mortgage-tool.json',
      debtCalculator: '/themes/sorted/json/calc-inputs/debt-calculator.json',
      retirementPlanner: '/themes/sorted/json/calc-inputs/retirement-planner.json',
      netWorthCalculator: '/themes/sorted/json/calc-inputs/net-worth-calculator.json',
      kiwisaverFees: '/themes/sorted/json/calc-inputs/kiwisaver-fees.json',
      savingsCalculator: '/themes/sorted/json/calc-inputs/savings-calculator.json',
      moneyPersonality: '/themes/sorted/json/calc-inputs/money-personality.json',
      investmentPlanner: '/themes/sorted/json/calc-inputs/investment-planner.json',
      kiwisaverSavingsCalculator: '/themes/sorted/json/calc-inputs/kiwisaver-savings-calculator.json',
    });
}());
