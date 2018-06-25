/*! mortgage_manager.js */
var SortedCalculator_Mortgage_Manager = SortedCalculator.extend({
  init: function() {
    'use strict';
    this._super();
  },
  calculate: function(obj, testMode) {
    'use strict';
    this._super();
    console.debug = false;
    if (testMode === true) {
      console.debug = true;
    }
    obj = {
      freq1: (isNaN(parseInt(obj.freq1, 10)) ? null : parseInt(obj.freq1, 10)),
      freq2: (isNaN(parseInt(obj.freq2, 10)) ? null : parseInt(obj.freq2, 10)),
      freq3: (isNaN(parseInt(obj.freq3, 10)) ? null : parseInt(obj.freq3, 10)),
      interest1: (isNaN(parseFloat(obj.interest1, 10)) ? null : parseFloat(obj.interest1, 10)),
      interest2: (isNaN(parseFloat(obj.interest2, 10)) ? null : parseFloat(obj.interest2, 10)),
      interest3: (isNaN(parseFloat(obj.interest3, 10)) ? null : parseFloat(obj.interest3, 10)),
      loan1: (isNaN(parseInt(obj.loan1, 10)) ? null : parseInt(obj.loan1, 10)),
      loan2: (isNaN(parseInt(obj.loan2, 10)) ? null : parseInt(obj.loan2, 10)),
      loan3: (isNaN(parseInt(obj.loan3, 10)) ? null : parseInt(obj.loan3, 10)),
      lump_sum1: (isNaN(parseInt(obj.lump_sum1, 10)) ? null : parseInt(obj.lump_sum1, 10)),
      lump_sum2: (isNaN(parseInt(obj.lump_sum2, 10)) ? null : parseInt(obj.lump_sum2, 10)),
      lump_sum3: (isNaN(parseInt(obj.lump_sum3, 10)) ? null : parseInt(obj.lump_sum3, 10)),
      repayments1: (isNaN(parseInt(obj.repayments1, 10)) ? null : parseInt(obj.repayments1, 10)),
      repayments2: (isNaN(parseInt(obj.repayments2, 10)) ? null : parseInt(obj.repayments2, 10)),
      repayments3: (isNaN(parseInt(obj.repayments3, 10)) ? null : parseInt(obj.repayments3, 10)),
      type1: (isNaN(parseInt(obj.type1, 10)) ? null : parseInt(obj.type1, 10)),
      type2: (isNaN(parseInt(obj.type2, 10)) ? null : parseInt(obj.type2, 10)),
      type3: (isNaN(parseInt(obj.type3, 10)) ? null : parseInt(obj.type3, 10)),
      month_born1: (isNaN(parseInt(obj.month_born1, 10)) ? null : parseInt(obj.month_born1, 10)),
      year_born1: (isNaN(parseInt(obj.year_born1, 10)) ? null : parseInt(obj.year_born1, 10)),
      month_born2: (isNaN(parseInt(obj.month_born2, 10)) ? null : parseInt(obj.month_born2, 10)),
      year_born2: (isNaN(parseInt(obj.year_born2, 10)) ? null : parseInt(obj.year_born2, 10)),
      month_born3: (isNaN(parseInt(obj.month_born3, 10)) ? null : parseInt(obj.month_born3, 10)),
      year_born3: (isNaN(parseInt(obj.year_born3, 10)) ? null : parseInt(obj.year_born3, 10))
    };

    var results = {};
    results.mortgage1 = this.real_calc(obj, 1);
    results.mortgage2 = this.real_calc(obj, 2);
    results.mortgage3 = this.real_calc(obj, 3);
    if (results.mortgage1.warning) {
      this.add_error('repayment_impossible_1');
    }
    if (results.mortgage2.warning) {
      this.add_error('repayment_impossible_2');
    }
    if (results.mortgage3.warning) {
      this.add_error('repayment_impossible_3');
    }
    delete results.mortgage1.warning;
    delete results.mortgage2.warning;
    delete results.mortgage3.warning;
    return results;
  },
  real_calc: function(obj, calc) {
    'use strict';
    var work = {},
      results = {},
      span;
    work.b8 = Number(obj['loan' + calc]);
    work.d8 = Number(obj['interest' + calc] / 100);
    work.b12 = Number(obj['repayments' + calc]);
    work.d12 = Number(obj['lump_sum' + calc]);
    work.l7 = Number(obj['freq' + calc]);
    work.j22 = work.d8 / work.l7;
    work.j24 = work.b8;
    work.j25 = work.b8 - work.d12;
    if (work.j22 > 0) {
      work.j28 = -Math.log(1 - (work.j25 / work.b12) * work.j22) / Math.log((1 + work.j22)) / work.l7;
    } else {
      work.j28 = (work.j25 / work.b12) / work.l7;
    }

    //work.c25 = this.roundUP(work.j28);
    work.c25 = work.j28;
    work.i7 = obj['month_born' + calc];
    work.c18 = obj['year_born' + calc];
    //work.i7 = obj['month_born'];
    //work.c18 = obj['year_born'];

    work.d25 = null;
    if (work.i7 !== null && work.c18 !== null) {
      span = new TimeSpan(Date.today() - Date.parse('15/' + work.i7 + '/' + work.c18));
      work.d25 = this.trunc(span.getDays() / 365.25 + work.j28);

    }
    work.c22 = work.b12 * work.l7 * work.j28 + work.d12;
    work.b25 = work.c22 - work.j24;
    if ((work.b12 / work.b8) <= work.j22) {
      work.warning = 1;
    } else {
      work.warning = 0;
    }
    /*
    console.log('><<<>>><<<>>><<<>>>Workings<<<>>><<<>>><<<>>><');
    console.log('B8-' + calc + ' = ' + work.b8);
    console.log('B12-' + calc + ' = ' + work.b12);
    console.log('B25-' + calc + ' = ' + work.b25);
    console.log('C25-' + calc + ' = ' + work.c25);
    console.log('C22-' + calc + ' = ' + work.c22);
    console.log('D8-' + calc + ' = ' + work.d8);
    console.log('D12-' + calc + ' = ' + work.d12);
    console.log('D25-' + calc + ' = ' + work.d25);
    console.log('J22-' + calc + ' = ' + work.j22);
    console.log('J25-' + calc + ' = ' + work.j25);
    console.log('J28-' + calc + ' = ' + work.j28);
    console.log('L7-' + calc + ' = ' + work.l7);
    console.log('><<<>>><<<>>><<<>>>Results<<<>>><<<>>><<<>>><');
    */
    results.total = this.round(work.c22, 0);
    results.interest = this.round(work.b25, 0);
    results.time = work.c25;
    results.age = work.d25;
    results.warning = work.warning;
    if (console.debug === true) {
      if (results.warning === 1) {
        $('#warning' + calc).html("<h3 style='color:#f00'>you will see carousel before the end of this mortgage!</h3>");
      } else {
        $('#warning' + calc).html("");
      }
      $('#total' + calc).html(results.total);
      $('#interest' + calc).html(results.interest);
      $('#repaytime' + calc).html(results.time);
      $('#agerepaid' + calc).html(results.age);
    }
    return results;
  }
});
var testmode = false;
var testObj = {
  loan1: 300000,
  type1: 1,
  interest1: 7.5,
  repayments1: 2000,
  freq1: 12,
  lump_sum1: 10000,
  loan2: 200000,
  type2: 1,
  interest2: 6.5,
  repayments2: 1000,
  freq2: 12,
  lump_sum2: 20000,
  loan3: 100000,
  type3: 2,
  interest3: 3.5,
  repayments3: 400,
  freq3: 12,
  lump_sum3: 0,
  month_born: 9,
  year_born: 1977
};
if (testmode === true) {
  (function($) {
    'use strict';
    $(document).ready(function() {
      $('html').append("<h1>TESTMODE</h1>").append("<input id='calculate-test' type='button' value='test calc' />");
    });

    function testCalcLogic() {
      var test = new SortedCalculator_Mortgage_Manager(),
        results = test.calculate(testObj, true);
      console.log('><><><><> INPUT <><><><><');
      console.dir(testObj);
      console.log('><><><><> OUTPUT <><><><><');
      console.dir(results);
    }
    $('#calculate-test').live("click", function() {
      testCalcLogic();
    });
  }(jQuery));
}
