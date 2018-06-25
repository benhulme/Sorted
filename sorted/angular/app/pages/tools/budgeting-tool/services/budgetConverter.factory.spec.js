/* global BigNumber */
(function () {
  'use strict';

  describe('Service: budgetConverter:', function () {

    beforeEach(module('sorted'));

    var budgetConverter;
    var budget;

    beforeEach(function () {
      budget = window.__fixtures__['app/pages/tools/budgeting-tool/test-json/testBudget'];

      inject(function (_budgetConverter_) {
        budgetConverter = _budgetConverter_;
      });
    });

    function convert (cents) {
      return new BigNumber(cents).times(budget.Period.PerYear);
    }

    describe('process:', function () {

      it('should convert Cents to BigNumber', function () {
        var expected = convert(budget.Cents);
        var actual = budgetConverter.process(budget);
        expect(expected).toEqual(actual.IncomeStreams[0].Cents);
      });

      it('should convert all stream amounts to BigNumber', function () {
        var expected;
        var actual = budgetConverter.process(budget);
        _.forEach(budget.IncomeStreams, function (stream, i) {
          expected = convert(stream.Cents);
          expect(expected).toEqual(actual.IncomeStreams[i].Cents);
        });
      });

      it('should convert all master category amounts to BigNumber', function () {
        var expected;
        var actual = budgetConverter.process(budget);
        _.forEach(budget.MasterCategories, function (mc, i) {
          expected = convert(mc.Cents);
          expect(expected).toEqual(actual.MasterCategories[i].Cents);
        });
      });

      it('should convert all category amounts to BigNumber', function () {
        var expected;
        var actual = budgetConverter.process(budget);
        _.forEach(budget.MasterCategories, function (mc, i) {
          _.forEach(mc.Categories, function (cat, j) {
            expected = convert(cat.Cents);
            expect(expected).toEqual(actual.MasterCategories[i].Categories[j].Cents);
          });
        });
      });

      it('should add a `Period` property to every category', function () {
        var expected = true;
        var actual = budgetConverter.process(budget);
        _.forEach(actual.MasterCategories, function (mc) {
          _.forEach(mc.Categories, function (cat) {
            expect(expected).toEqual(cat.hasOwnProperty('Period'));
          });
        });
      });

    });

  });

})();
