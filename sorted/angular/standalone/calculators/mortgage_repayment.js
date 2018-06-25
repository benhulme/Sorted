/*! mortgage_repayment.js */
var SortedCalculator_Mortgage_Repayment = SortedCalculator.extend({
  init: function() {
    'use strict';
    this._super();
  },
  calculate: function(obj, testMode) {
    'use strict';
    console.debug = false;
    if (testMode === true) {
      console.debug = true;
    }
    var results = {};
    results.mortgage1 = this.real_calc(obj, 1);
    results.mortgage2 = this.real_calc(obj, 2);
    results.mortgage3 = this.real_calc(obj, 3);
    return results;
  },
  real_calc: function(obj, calc) {
    'use strict';
    var work = {},
      results = {},
      span;
    work.d8 = Number(obj['interest' + calc] / 100);
    work.k29 = Number(obj['term' + calc]);
    work.k31 = Number(obj['freq' + calc]);
    work.k32 = ((work.d8 * 100) / work.k31) / 100;
    work.k34 = Number(obj['loan' + calc]);
    if (work.k32 > 0) {
      work.c23 = work.k34 / ((1 - Math.pow(1 + work.k32, -(work.k31 * work.k29))) / work.k32);
    } else {
      work.c23 = work.k34 / (work.k31 * work.k29);
    }
    work.b26 = work.c23 * work.k31 * work.k29;
    work.c26 = work.b26 - work.k34;
    work.d26 = work.k29;

    //work.d26 = this.roundUP(work.k29);
    //console.log(obj);
    work.b20 = obj['month_born1'];
    work.c20 = obj['year_born1'];
    work.e26 = null;
    work.e45 = null;
    span = null;
    if (Date.parse('15/' + work.b20 + '/' + work.c20) !== null) {
      span = new TimeSpan(Date.today() - Date.parse('15/' + work.b20 + '/' + work.c20));
      work.e26 = this.trunc(span.getDays() / 365.25 + work.k29);
      work.e45 = this.round(work.e26 - 0.1 * work.k29);
    }
    work.c30 = (1.1 * work.c23);
    work.c30 = ((work.c30 / 10).toFixed(0) * 10);
    if (work.k32 > 0) {
      work.k36 = -Math.log(1 - (work.k34 / work.c30) * work.k32) / Math.log(1 + work.k32) / work.k31;
    } else {
      work.k36 = work.k34 / (work.k31 * work.c30);
    }
    work.b33 = work.c30 * work.k31 * work.k36;
    work.c33 = work.b33 - work.k34;
    work.d33 = this.roundUP(work.k36, 0);
    work.e33 = null;
    if (span !== null) {
      work.e33 = this.trunc(span.getDays() / 365.25 + work.k36);
    }
    work.e30 = work.b26 - work.b33;
    work.d39 = this.roundUP(0.9 * work.k29, 0);
    work.k37 = work.d39;
    if (work.k32 > 0) {
      work.c36 = work.k34 / ((1 - Math.pow(1 + work.k32, -(work.k31 * work.k37))) / work.k32);
    } else {
      work.c36 = work.k34 / (work.k31 * work.k37);
    }
    work.b39 = work.c36 * work.k37 * work.k31;
    work.c39 = work.b39 - work.k34;
    work.e39 = null;
    if (span !== null) {
      work.e39 = this.trunc(span.getDays() / 365.25 + work.d39);
    }
    work.e36 = work.b26 - work.b39;
    work.k38 = null;
    work.c42 = null;
    work.b45 = null;
    work.c45 = null;
    work.d45 = null;
    work.e42 = null;
    if (span !== null) {
      work.k38 = (span.getDays(-1) / 365.25);
      if (work.k32 > 0) {
        work.c42 = work.k34 / ((1 - Math.pow(1 + work.k32, -(work.k31 * work.k38))) / work.k32);
      } else {
        work.c42 = work.k34 / (work.k31 * work.k38);
      }
      work.b45 = work.c42 * work.k31 * work.k38;
      work.c45 = work.b45 - work.k34;
      work.d45 = this.roundUP(work.k38, 0);
      work.e42 = work.b26 - work.b45;
    }
    /*
    console.log('><<<>>><<<>>><<<>>>Workings<<<>>><<<>>><<<>>><');
    console.log('B26-' + calc + ' = ' + work.b26);
    console.log('C23-' + calc + ' = ' + work.c23);
    console.log('C26-' + calc + ' = ' + work.c26);
    console.log('D8-' + calc + ' = ' + work.d8);
    console.log('D26-' + calc + ' = ' + work.d26);
    console.log('E26-' + calc + ' = ' + work.e26);
    console.log('K29-' + calc + ' = ' + work.k29);
    console.log('K31-' + calc + ' = ' + work.k31);
    console.log('K32-' + calc + ' = ' + work.k32);
    console.log('K34-' + calc + ' = ' + work.k34);
    console.log('><<<>>><<<>>><<<>>>Repayments Change<<<>>><<<>>><<<>>><');
    console.log('C30-' + calc + ' = ' + work.c30);
    console.log('K36-' + calc + ' = ' + work.k36);
    console.log('B33-' + calc + ' = ' + work.b33);
    console.log('C33-' + calc + ' = ' + work.c33);
    console.log('D33-' + calc + ' = ' + work.d33);
    console.log('E33-' + calc + ' = ' + work.e33);
    console.log('E30-' + calc + ' = ' + work.e30);
    console.log('><<<>>><<<>>><<<>>>Term Change<<<>>><<<>>><<<>>><');
    console.log('C36-' + calc + ' = ' + work.c36);
    console.log('K37-' + calc + ' = ' + work.k37);
    console.log('B39-' + calc + ' = ' + work.b39);
    console.log('C39-' + calc + ' = ' + work.c39);
    console.log('D39-' + calc + ' = ' + work.d39);
    console.log('E39-' + calc + ' = ' + work.e39);
    console.log('E36-' + calc + ' = ' + work.e36);
    console.log('><<<>>><<<>>><<<>>>Age Paid By Change<<<>>><<<>>><<<>>><');
    console.log('C42-' + calc + ' = ' + work.c42);
    console.log('K38-' + calc + ' = ' + work.k38);
    console.log('B45-' + calc + ' = ' + work.b45);
    console.log('C45-' + calc + ' = ' + work.c45);
    console.log('D45-' + calc + ' = ' + work.d45);
    console.log('E45-' + calc + ' = ' + work.e45);
    console.log('E42-' + calc + ' = ' + work.e42);
    console.log('><<<>>><<<>>><<<>>>Results<<<>>><<<>>><<<>>><');
    */
    results = {
      min_repayment: this.round(work.c23, 2).toFixed(2),
      total: this.round(work.b26, 2).toFixed(2),
      interest: this.round(work.c26, 2).toFixed(2),
      time: work.d26,
      age: work.e26
    };
    console.debug = false;
    return results;
  }
});
var testmode = false;
var testObj = {
  loan1: 300000,
  type1: 1,
  interest1: 7.5,
  freq1: 12,
  term1: 20,
  loan2: 480000,
  type2: 2,
  interest2: 5.8,
  freq2: 12,
  term2: 30,
  loan3: 200000,
  type3: 2,
  interest3: 6,
  freq3: 26,
  term3: 10,
  month_born: 6,
  year_born: 1977
};
if (testmode === true) {
  (function($) {
    'use strict';
    $(document).ready(function() {
      $('.html').append("<h1>TESTMODE</h1>").append("<input id='calculate' type='button' value='test calc' />");
    });

    function testCalcLogic() {
      var test = new SortedCalculator_Mortgage_Repayment(),
        results = test.calculate(testObj, true);
      console.debug = true;
      console.log('><><><><> INPUT <><><><><');
      console.dir(testObj);
      console.log('><><><><> OUTPUT <><><><><');
      console.dir(results);
    }
    $('#calculate').live("click", function() {
      testCalcLogic();
    });
  }(jQuery));
}
