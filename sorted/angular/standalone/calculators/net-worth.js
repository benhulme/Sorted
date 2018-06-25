/*! net-worth.js */
/* jshint ignore:start */
var SortedCalculator_Net_Worth;
(function($) {
  var log = false; // a flag to turn logging on or off.

  SortedCalculator_Net_Worth = SortedCalculator.extend({
    init: function() {
      if(log) console.log('SortedCalculator_Net_Worth.init');
      this._super();
    },
    deduction: function(key) {
      if (this.strstr(key, 'mortgages') || this.strstr(key, 'loan') || this.strstr(key, 'hp') || this.strstr(key, 'sl') || this.strstr(key, 'cc') || this.strstr(key, 'other_debt')) {
        return true;
      }
      return false;
    },
    calculate: function(obj, testMode) {
      if(log) console.log('** Calculate Net Worth **');
      if(log) console.dir(obj);
      if (testMode === true) {
        console.debug = true;
      }
      $.each(obj, function(i, v) {
        obj[i] = isNaN(parseInt(obj[i], 10)) ? 0 : parseInt(obj[i], 10);
      });
      var work = {
          positive: [],
          negative: []
        },
        work5 = {
          positive: [],
          negative: []
        },
        work10 = {
          positive: [],
          negative: []
        },
        results, key, work_total = 0,
        work5_total = 0,
        work10_total = 0,
        work_debt_total = 0,
        work5_debt_total = 0,
        work10_debt_total = 0;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (key.slice(-2) === '10') {
            if (this.deduction(key)) {
              work10.negative[key] = Number(isNaN(parseInt(obj[key], 10)) ? 0 : obj[key]);
            } else {
              work10.positive[key] = Number(isNaN(parseInt(obj[key], 10)) ? 0 : obj[key]);
            }
          } else if (key.slice(-1) === '5') {
            if (this.deduction(key)) {
              work5.negative[key] = Number(isNaN(parseInt(obj[key], 10)) ? 0 : obj[key]);
            } else {
              work5.positive[key] = Number(isNaN(parseInt(obj[key], 10)) ? 0 : obj[key]);
            }
          } else {
            if (this.deduction(key)) {
              work.negative[key] = Number(isNaN(parseInt(obj[key], 10)) ? 0 : obj[key]);
            } else {
              work.positive[key] = Number(isNaN(parseInt(obj[key], 10)) ? 0 : obj[key]);
            }
          }
        }
      }
      for (key in work.positive) {
        if (work.positive.hasOwnProperty(key)) {
          work_total = work_total + (isNaN(work.positive[key]) ? 0 : work.positive[key]);
        }
      }
      for (key in work5.positive) {
        if (work5.positive.hasOwnProperty(key)) {
          work5_total = work5_total + (isNaN(work5.positive[key]) ? 0 : work5.positive[key]);
        }
      }
      for (key in work10.positive) {
        if (work10.positive.hasOwnProperty(key)) {
          work10_total = work10_total + (isNaN(work10.positive[key]) ? 0 : work10.positive[key]);
        }
      }
      for (key in work.negative) {
        if (work.negative.hasOwnProperty(key)) {
          work_debt_total = work_debt_total + (isNaN(work.negative[key]) ? 0 : work.negative[key]);
        }
      }
      for (key in work5.negative) {
        if (work5.negative.hasOwnProperty(key)) {
          work5_debt_total = work5_debt_total + (isNaN(work5.negative[key]) ? 0 : work5.negative[key]);
        }
      }
      for (key in work10.negative) {
        if (work10.negative.hasOwnProperty(key)) {
          work10_debt_total = work10_debt_total + (isNaN(work10.negative[key]) ? 0 : work10.negative[key]);
        }
      }
      obj.total = work_total - work_debt_total;
      obj.total5 = work5_total - work5_debt_total;
      obj.total10 = work10_total - work10_debt_total;
      results = {
        'sum_total': work_total,
        'sum_total5': work5_total,
        'sum_total10': work10_total,
        'debt_total': work_debt_total,
        'debt_total5': work5_debt_total,
        'debt_total10': work10_debt_total,
        'total': obj.total,
        'total5': obj.total5,
        'total10': obj.total10
      };
      if(log) console.dir(results);
      return results;
    }
  });
  /*var testmode = false;
  var testObj = {
    business: "",
    business5: "68",
    business10: "",
    cc: "3233",
    cc5: "",
    cc10: "",
    home: "",
    home5: "",
    home10: "",
    hp: "",
    hp5: "",
    hp10: "",
    loan: "2",
    loan5: "",
    loan10: "",
    mortgages: "",
    mortgages5: "3",
    mortgages10: "",
    other: "",
    other5: "",
    other10: "",
    other_debt: "12",
    other_debt5: "",
    other_debt10: "",
    properties: "",
    properties5: "",
    properties10: "e",
    savings: "",
    savings5: "",
    savings10: "",
    shares: "",
    shares5: "r",
    shares10: "",
    sl: "",
    sl5: "",
    sl10: "",
    super_annuation: "",
    super_annuation5: "",
    super_annuation10: "",
    trust: "",
    trust5: "",
    trust10: "",
    vehicles: "",
    vehicles5: "",
    vehicles10: ""
  };
  if (testmode === true) {
    $(document).ready(function() {
      $('html').append("<h1>TESTMODE</h1>").append("<input id='calculate-test' type='button' value='test calc' />");
    });

    function testCalcLogic() {
      var test = new SortedCalculator_Net_Worth(),
        results = test.calculate(testObj, true);
      if(log) console.log('><><><><> INPUT <><><><><');
      if(log) console.dir(testObj);
      if(log) console.log('><><><><> OUTPUT <><><><><');
      if(log) console.dir(results);
    }
    $('#calculate-test').live("click", function() {
      testCalcLogic();
    });
  }*/
}(jQuery));
/* jshint ignore:end */
