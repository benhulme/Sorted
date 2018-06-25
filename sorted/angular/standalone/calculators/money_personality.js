/*! money_personality.js */
var SortedCalculator_MoneyPersonalityProfiler = SortedCalculator.extend({
  init: function() {
    'use strict';
    console.log('SortedCalculator_MoneyPersonalityProfiler.init');
    this._super();
  },
  calculate: function(inputObj, testMode) {
    'use strict';
    console.debug = false;
    if (testMode === true) {
      console.debug = true;
    }
    var i, obj = {},
      required = 25;
    console.log('|--  Reticulating Splines --|');
    for (i in inputObj) {
      if (inputObj.hasOwnProperty(i)) {
        if (inputObj[i] === '_none') {
          obj[i.replace('field_mpp_', '').replace('[und]', '')] = '';
        } else if (inputObj[i] === '1') {
          obj[i.replace('field_mpp_', '').replace('[und]', '')] = '1';
        } else {
          obj[i.replace('field_mpp_', '').replace('[und]', '')] = '10';
        }
      }
    }
    var required_fields = ['advice', 'adviser', 'battles', 'bills', 'discuss', 'drawn_to', 'financial_pages', 'friends', 'future', 'generally', 'gone', 'investing', 'investing_in', 'like', 'money_matters', 'past', 'people', 'people_see_you', 'purchasing', 'spend', 'spend_cash', 'spending_plan', 'thought', 'wallet', 'you'];
    for (i = 0; i < required_fields.length; i++) {
      if (obj[required_fields[i]] === '') {
        return null;
      }
    }
    if ((Number(obj.spend) + Number(obj.discuss) + Number(obj.generally) + Number(obj.spend_cash) + Number(obj.advice)) < 25) {
      obj.oin = "O";
    } else {
      obj.oin = "In";
    }
    if ((Number(obj.investing_in) + Number(obj.drawn_to) + Number(obj.investing) + Number(obj.people_see_you) + Number(obj.adviser)) < 25) {
      obj.imr = "Im";
    } else {
      obj.imr = "R";
    }
    if ((Number(obj.people) + Number(obj.friends) + Number(obj.you) + Number(obj.thought) + Number(obj.past)) < 25) {
      obj.sl = "S";
    } else {
      obj.sl = "L";
    }
    if ((Number(obj.spending_plan) + Number(obj.like) + Number(obj.money_matters) + Number(obj.bills) + Number(obj.purchasing)) < 25) {
      obj.df = "D";
    } else {
      obj.df = "F";
    }
    obj.result = obj.oin + obj.imr + obj.sl + obj.df;
    console.dir(obj);
    console.log(obj.result);
    return obj.result;
  }
});
var testmode = false;
var testObj = {
  advice: "2",
  adviser: "1",
  battles: "1",
  bills: "2",
  discuss: "1",
  drawn_to: "2",
  financial_pages: "2",
  friends: "1",
  future: "2",
  generally: "2",
  gone: "1",
  investing: "1",
  investing_in: "1",
  like: "2",
  money_matters: "1",
  past: "2",
  people: "2",
  people_see_you: "2",
  purchasing: "1",
  spend: "2",
  spend_cash: "1",
  spending_plan: "2",
  thought: "1",
  wallet: "2",
  you: "2"
};
if (testmode === true) {
  (function($) {
    'use strict';
    $(document).ready(function() {
      $('html').append("<h1>TESTMODE</h1>").append("<input id='calculate-test' type='button' value='test calc' />");
    });

    function testCalcLogic() {
      var test = new SortedCalculator_InvestmentRecommender(),
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
