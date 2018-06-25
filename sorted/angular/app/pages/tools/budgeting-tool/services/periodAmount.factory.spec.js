/* global BigNumber */
(function () {
  'use strict';

  describe('Service: periodAmount:', function () {

    beforeEach(module('sorted'));

    var periodAmount;

    beforeEach(function () {
      module(function($provide) {
        $provide.value('Budget', {
          budget: {
            Period: { PerYear: 12 }
          }
        });
      });

      inject(function (_periodAmount_) {
        periodAmount = _periodAmount_;
      });
    });


    describe('convert:', function () {

      // This is not the complete set of back and forth conversions, because the calculation is the same regardless.
      // Below provided as proof of concept...
      it('should return 0 if 0, regardless of period', function () {
        var oldPeriod = { PerYear: 9 };
        var newPeriod = { PerYear: 4 };
        var expected = new BigNumber(0);
        var actual = periodAmount.convert(expected, oldPeriod, newPeriod);
        expect(expected).toEqual(actual);
      });

      it('should convert per month to per year', function () {
        var oldPeriod = { PerYear: 12 };
        var newPeriod = { PerYear: 1 };
        var expected = new BigNumber(1);
        var actual = periodAmount.convert(new BigNumber(12), oldPeriod, newPeriod);
        expect(expected).toEqual(actual);
      });

      it('should convert per four weeks to per year', function () {
        var oldPeriod = { PerYear: 13 };
        var newPeriod = { PerYear: 1 };
        var expected = new BigNumber(1);
        var actual = periodAmount.convert(new BigNumber(13), oldPeriod, newPeriod);
        expect(expected).toEqual(actual);
      });

      it('should convert per fortnight to per year', function () {
        var oldPeriod = { PerYear: 26 };
        var newPeriod = { PerYear: 1 };
        var expected = new BigNumber(1);
        var actual = periodAmount.convert(new BigNumber(26), oldPeriod, newPeriod);
        expect(expected).toEqual(actual);
      });

      it('should convert per week to per year', function () {
        var oldPeriod = { PerYear: 52 };
        var newPeriod = { PerYear: 1 };
        var expected = new BigNumber(1);
        var actual = periodAmount.convert(new BigNumber(52), oldPeriod, newPeriod);
        expect(expected).toEqual(actual);
      });

      it('should convert per week to per fortnight', function () {
        var oldPeriod = { PerYear: 52 };
        var newPeriod = { PerYear: 26 };
        var expected = new BigNumber(26);
        var actual = periodAmount.convert(new BigNumber(52), oldPeriod, newPeriod);
        expect(expected).toEqual(actual);
      });

      // Remember, each number is a _yearly_ amount
      it('should convert per month to per week', function () {
        var oldPeriod = { PerYear: 12 };
        var newPeriod = { PerYear: 52 };
        var expected = new BigNumber(43.33);
        var actual = periodAmount.convert(new BigNumber(10), oldPeriod, newPeriod).round(2);
        expect(expected).toEqual(actual);
      });

      it('should convert per month to per four weeks', function () {
        var oldPeriod = { PerYear: 12 };
        var newPeriod = { PerYear: 13 };
        var expected = new BigNumber(10.83);
        var actual = periodAmount.convert(new BigNumber(10), oldPeriod, newPeriod).round(2);
        expect(expected).toEqual(actual);
      });

      it('should convert per month to per fortnight', function () {
        var oldPeriod = { PerYear: 12 };
        var newPeriod = { PerYear: 26 };
        var expected = new BigNumber(21.67);
        var actual = periodAmount.convert(new BigNumber(10), oldPeriod, newPeriod).round(2);
        expect(expected).toEqual(actual);
      });

    });

    describe('displayDollars:', function () {

      it('should return an integer when passed a BigNumber', function () {
        var expected = 'number';
        var actual = typeof periodAmount.displayDollars(new BigNumber(1));
        expect(expected).toEqual(actual);
      });

      it('should return undefined when passed undefined', function () {
        var expected = 'undefined';
        var actual = typeof periodAmount.displayDollars(undefined);
        expect(expected).toEqual(actual);
      });

      // Needs to avoid 0 / n === 1 issues
      it('should return 0 when passed 0', function () {
        var expected = 0;
        var actual = periodAmount.displayDollars(new BigNumber(0));
        expect(expected).toEqual(actual);
      });

      it('should use Budget.budget.Period by default', function () {
        var expected = 1;
        var actual = periodAmount.displayDollars(new BigNumber(1200));
        expect(expected).toEqual(actual);
      });

      it('should accept abitrary periods passed in second argument', function () {
        var expected = 12;
        var actual = periodAmount.displayDollars(
          new BigNumber(1200),
          { PerYear: 1 }
        );
        expect(expected).toEqual(actual);
      });

    });
  });

})();
