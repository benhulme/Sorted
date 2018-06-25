/* global BigNumber */
(function () {
  'use strict';

  describe('Service: totalValues:', function () {

    beforeEach(module('sorted'));

    var totalValues;
    var budget = {
      Period: {
        PerYear: 12
      },
      MasterCategories: [
        { Cents: new BigNumber(10) },
        { Cents: new BigNumber(11) },
        { Cents: new BigNumber(25.1) },
        { Cents: new BigNumber(60000) },
        { Cents: new BigNumber(11.11111) }
      ],
      IncomeStreams: [
        { Cents: new BigNumber(0.12) },
        { Cents: new BigNumber(12345) },
        { Cents: new BigNumber(222) },
        { Cents: new BigNumber(3990) }
      ]
    };

    beforeEach(function () {
      module(function($provide) {
        $provide.value('Budget', {
          budget: budget
        });
      });

      inject(function (_totalValues_) {
        totalValues = _totalValues_;
      });
    });

    describe('getSubtotal:', function () {

      it('should correctly sum arbitrary master category totals', function () {
        var expected = new BigNumber(60057.21111);
        var actual = totalValues.getSubtotal();
        expect(expected.toNumber()).toEqual(actual.toNumber());
      });

    });

    describe('getIncomeTotal:', function () {

      it('should correctly sum arbitrary income streams', function () {
        var expected = new BigNumber(16557.12);
        var actual = totalValues.getIncomeTotal();
        expect(expected.toNumber()).toEqual(actual.toNumber());
      });

    });

    describe('getRemainingDisplay:', function () {

      it('should subtract subtotal from income', function () {
        var expected = 0;
        budget.MasterCategories = [ { Cents: 1 } ];
        budget.IncomeStreams = [ { Cents: 1 } ];
        var actual = totalValues.getRemainingDisplay();
        expect(expected).toEqual(actual);
      });

      it('should cope with no subtotal gracefully', function () {
        var expected = 1;
        budget.MasterCategories = [ { Cents: 0 } ];
        budget.IncomeStreams = [ { Cents: 1200 } ];
        var actual = totalValues.getRemainingDisplay();
        expect(expected).toEqual(actual);
      });

    });

  });

})();
