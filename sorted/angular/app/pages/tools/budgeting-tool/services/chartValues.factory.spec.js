/* global BigNumber */
(function () {
  'use strict';

  describe('Service: chartValues', function () {

    beforeEach(module('sorted'));

    var chartValues, periodAmount;

    var masterCategories = [ 
      { Cents: 1200 },
      { Cents: new BigNumber(0) },
      { Cents: new BigNumber(1200) },
      { Cents: new BigNumber(0) },
      { Cents: new BigNumber(1200) },
      { Cents: new BigNumber(0) },
      { Cents: new BigNumber(1200) },
      { Cents: new BigNumber(1200) }
    ];
    var period = { PerYear: 12 };

    beforeEach(function () {
      module(function($provide) {
        $provide.value('Budget', {
          budget: {
            // Inactive master categories have no budgeted amounts in them
            MasterCategories: masterCategories,
            Period: period
          }
        });
        $provide.value('totalValues', {
          getSubtotal: function () {
            return new BigNumber(6000);
          }
        });
      });

      inject(function (_chartValues_, _periodAmount_) {
        chartValues = _chartValues_;
        periodAmount = _periodAmount_;
      });
    });


    describe('when amounts are integers,', function () {

      // Note that index 0 should be a spacer if there's more than one series in chart
      it('should provide series with correct value', function() {
        var expected = 1;
        var actual = chartValues.update()[1].dollars;
        expect(expected).toEqual(actual);
      });

    });

    describe('when amounts are BigNumbers,', function () {

      it('should return an integer', function() {
        var expected = 1;
        var actual = chartValues.update()[1].dollars;
        expect(expected).toEqual(jasmine.any(Number));
        expect(expected).toEqual(actual);
      });

    });

    describe('when passed `n` master categories,', function () {

      it('should return a series of (2 x n)', function () {
        // Four master categories, so series of eight (made up of four colour blocks 
        // and four transparent spacers. Some of the test mc's are empty, so:
        var expected = _.filter(masterCategories, function (mc) {
          return mc.Cents.greaterThan(0);
        }).length * 2;
        var actual = chartValues.update().length;
        expect(expected).toEqual(actual);
      });

      it('should insert a spacer at odd indexes', function () {
        _.forEach(_.filter(chartValues.update(), function (v, i) {
          return !i % 2;
        }), function (series) {
          expect(series.color).toEqual('transparent');
        });
      });

      it('should use the `Title` property as series category', function () {
        _.forEach(_.filter(chartValues.update(), function (v, i) {
          return ! i % 2;
        }), function (series, i) {
          expect(series.category).toEqual(masterCategories[i].Title);
        });
      });

    });

    describe('when passed inactive master categories,', function () {

      it('should remove all inactive master categories', function () {
        var expected = _.sumBy(masterCategories, function (mc) {
          return mc.Cents.greaterThan(0) ? 1 : 0;
        });
        var actual = _.filter(chartValues.update(), function (series) {
          // Discard spacers
          return series.color !== 'transparent';
        }).length;
        expect(expected).toEqual(actual);
      });

    });
  });

})();
