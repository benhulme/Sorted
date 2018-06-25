/*! debt.js */
var SortedCalculator_Debt = SortedCalculator.extend({
  init: function() {
    'use strict';
    this._super();
  },
  test_mode: false,
  check_vars: function(teArray, flag) {
    'use strict';
    var i;
    for (i = 0; i < teArray.length; i += 1) {
      if (teArray[i] === null || teArray[i] === undefined) {
        //console.log(flag + ') found null or undefined in key [' + i + ']', teArray);
        return false;
      }
    }
    return true;
  },
  cc_model: function(obj) {
    'use strict';
    try {
      //console.log("><><><><   Start CC MODEL   ><><><><");
      var model = {},
        results, b, span;
      obj = {
        amount_owed: (isNaN(parseFloat(obj.amount_owed, 10)) ? null : parseFloat(obj.amount_owed, 10)),
        interest_rate: (isNaN(parseFloat(obj.interest_rate, 10)) ? null : parseFloat(obj.interest_rate, 10)),
        repayment_amount: (isNaN(parseFloat(obj.repayment_amount, 10)) ? null : parseFloat(obj.repayment_amount, 10)),
        repayment_frequency: (isNaN(parseFloat(obj.repayment_frequency, 10)) ? null : parseFloat(obj.repayment_frequency, 10)),
        nudge_payment: (isNaN(parseFloat(obj.nudge_payment, 10)) ? null : parseFloat(obj.nudge_payment, 10))
      };
      console.debug = false;
      model.b8 = obj.amount_owed;
      model.d8 = (obj.interest_rate === null ? null : obj.interest_rate / 100);
      model.b12 = obj.repayment_amount;
      model.j24 = obj.repayment_frequency;
      model.l7 = model.j24;
      model.j22 = null;
      model.j23 = null;
      if (model.l7 !== 0) {
        if (model.d8 !== null && model.l7 !== null) {
          model.j22 = model.d8 / model.l7;
        }
        if (model.b8 !== null && model.l7 !== null) {
          model.j23 = (0.02 * model.b8 * 12) / model.l7;
        }
      }
      if (model.b12 === 0) {
        model.j24 = model.j23;
      } else {
        model.j24 = model.b12;
      }
      model.j25 = null;
      if (model.j22 !== null) {
        if (model.j22 > 0) {
          if (model.b8 !== null && model.j24 !== null && model.j22 !== null && model.l7 !== null) {
            if (model.j24 != 0 && model.l7 != 0 && Math.log(1 + model.j22) != 0 && (1 - (model.b8 / model.j24) * model.j22) > 0 && (1 + model.j22) > 0) {
              model.j25 = -((Math.log(1 - (model.b8 / model.j24) * model.j22)) / (Math.log(1 + model.j22))) / model.l7;
            }
          }
        } else {
          if (model.b8 !== null && model.j24 !== null && model.l7 !== null) {
            if (model.j24 != 0 && model.l7 != 0) {
              model.j25 = (model.b8 / model.j24) / model.l7;
            }
          }
        }
      }
      model.c23 = null;
      if (model.j24 !== null && model.l7 !== null && model.j25 !== null) {
        model.c23 = model.j24 * model.l7 * model.j25;
      }
      model.b26 = null;
      if (model.c23 !== null && model.b8 !== null) {
        model.b26 = model.c23 - model.b8;
      }
      model.c26 = null;
      if (model.j25 !== null) {
        model.c26 = this.roundUP(model.j25 * 12);
      }
      model.d26 = null;
      if (this.age !== null && model.j25 !== null) {
        b = Date.today();
        b.setHours(0, 0, 0);
        span = new TimeSpan(b - this.age);
        model.d26 = this.trunc((span.getDays() / 365.25) + model.j25);
      }
      model.warning = 0;
      if (model.j24 !== null && model.j23 !== null && model.j24 < model.j23) {
        model.warning = 1;
      }
      model.c29 = null;
      model.j27 = null;
      if (obj.nudge_payment !== null) {
        model.c29 = obj.nudge_payment;
        model.j27 = model.c29;
      } else {
        model.j27 = this.roundUP(1.2 * model.b12, -1);
      }
      model.j26 = null;
      if (this.check_vars([model.j22, model.b8, model.j27, model.j22, model.l7], 'model.j26')) {
        if (model.j22 > 0) {
          model.j26 = -((Math.log(1 - (model.b8 / model.j27) * model.j22)) / (Math.log(1 + model.j22))) / model.l7;
        } else {
          model.j26 = (model.b8 / model.j27) / model.l7;
        }
      }
      model.b32 = null;
      if (model.j27 !== null && model.j26 !== null && model.l7 !== null) {
        model.b32 = model.j27 * model.j26 * model.l7;
      }
      model.c32 = null;
      if (model.b32 !== null && model.b8 !== null) {
        model.c32 = model.b32 - model.b8;
      }
      model.d32 = null;
      if (model.j26 !== null) {
        model.d32 = this.roundUP(model.j26 * 12);
      }
      model.e32 = null;
      if (this.age !== null && model.cj26 !== null) {
        if (model.j25 !== null && this.month_born !== null && this.year_born !== null) {
          b = Date.today();
          b.setHours(0, 0, 0);
          span = new TimeSpan(b - this.age);
          model.e32 = this.trunc((span.getDays() / 365.25) + model.j26);
        }
      }
      model.d29 = null;
      if (model.c23 !== null && model.b32 !== null) {
        model.d29 = model.c23 - model.b32;
      }
      results = {
        result_total: model.c23,
        result_interest: model.b26,
        result_time_to_repay: model.c26,
        result_age_repaid: model.d26,
        result_warning: model.warning,
        result_nudge: {
          payment: model.c29,
          total: model.b32,
          interest: model.c32,
          months: model.d32,
          age: model.e32,
          savings: model.d29
        }
      };
      return results;
    } catch (err) {
      //console.log(err);
    }
  },
  hpcl_model: function(obj) {
    'use strict';
    try {
      //console.log("><><><><   Start HP/CL MODEL   ><><><><");
      var results, a, b, c, model = {},
        span;
      //console.log('raw input object');
      console.dir(obj);
      obj = {
        amount_borrowed: (isNaN(parseFloat(obj.amount_borrowed, 10)) ? 0 : parseFloat(obj.amount_borrowed, 10)),
        interest_rate: (isNaN(parseFloat(obj.interest_rate, 10)) ? null : parseFloat(obj.interest_rate, 10)),
        interest_free_period: (isNaN(parseInt(obj.interest_free_period, 10)) ? 0 : parseInt(obj.interest_free_period, 10)),
        startup_fees: (isNaN(parseFloat(obj.startup_fees, 10)) ? 0 : parseFloat(obj.startup_fees, 10)),
        other_fees: (isNaN(parseFloat(obj.other_fees, 10)) ? 0 : parseFloat(obj.other_fees, 10)),
        deferred_payment_months: (isNaN(parseInt(obj.deferred_payment_months, 10)) ? 0 : parseInt(obj.deferred_payment_months, 10)),
        repayment_frequency: (isNaN(parseFloat(obj.repayment_frequency, 10)) ? null : parseFloat(obj.repayment_frequency, 10)),
        total_term_months: (isNaN(parseInt(obj.total_term_months, 10)) ? null : parseInt(obj.total_term_months, 10)),
        nudge_payment: (isNaN(parseFloat(obj.nudge_payment, 10)) ? null : parseFloat(obj.nudge_payment, 10)),
        month_born: (isNaN(parseInt(obj.month_born, 10)) ? null : parseInt(obj.month_born, 10)),
        year_born: (isNaN(parseInt(obj.year_born, 10)) ? null : parseInt(obj.year_born, 10))
      };
      //console.log('cleaned object');
      //console.dir(obj);
      model.b8 = obj.amount_borrowed;
      model.e8 = (obj.interest_rate === null ? null : obj.interest_rate / 100);
      model.b12 = obj.interest_free_period;
      model.d12 = obj.startup_fees;
      model.e12 = obj.other_fees;
      model.b16 = obj.deferred_payment_months;
      model.d16 = obj.total_term_months;
      model.q7 = obj.total_term_months;
      model.e16 = obj.repayment_frequency;
      model.o7 = obj.repayment_frequency;
      model.k7 = 12;
      model.m7 = 12;
      model.b22 = obj.month_born;
      model.c22 = obj.year_born;
      model.k29 = null;
      if (model.b12 !== null && model.k7 !== null) {
        if (model.k7 != 0) {
          model.k29 = model.b12 / model.k7;
        }
      }
      model.m30 = null;
      if (model.b16 !== null && model.m7 !== null) {
        if (model.m7 != 0) {
          model.k30 = model.b16 / model.m7;
        }
      }
      model.k31 = (model.q7 === null ? null : model.q7 / 12);
      model.k33 = model.o7;
      model.k34 = (model.e8 === null || model.k33 === null ? null : model.e8 / model.k33);
      model.k36 = null;
      if (model.b8 !== null && model.d12 !== null && model.e12 !== null) {
        model.k36 = model.b8 + model.d12 + model.e12;
      }
      model.k38 = null;
      if (model.k29 !== null && model.k30 !== null) {
        model.k38 = Math.max(0, (model.k29 - model.k30));
      }
      model.k37 = null;
      if (model.k31 !== null && model.k30 !== null && model.k38 !== null) {
        model.k37 = (model.k31 - model.k30) - model.k38;
      }
      model.k39 = null;
      if (model.k29 !== null && model.k30 !== null) {
        model.k39 = Math.max(0, (model.k30 - model.k29));
      }
      a = null;
      if (this.check_vars([model.k34, model.k39, model.k33], 'hp model.c28 1')) {
        a = (((Math.pow((1 + model.k34), -(model.k39 * model.k33)))));
      }
      b = null;
      if (this.check_vars([model.k34, model.k37, model.k33], 'hp model.c28 2')) {
        if (model.k34 > 0) {
          b = ((1 - (Math.pow((1 + model.k34), -(model.k37 * model.k33)))) / model.k34);
        } else {
          b = model.k37 * model.k33;
        }
      }
      c = null;
      if (this.check_vars([a, b], 'hp model.c28 3')) {
        c = a * b;
      }
      model.c28 = null;
      if (this.check_vars([model.k36, model.k38, model.k33, c], 'hp model.c28 4')) {
        if (c + (model.k38 * model.k33) != 0) {
          model.c28 = model.k36 / (c + (model.k38 * model.k33));
        }
      }
      model.b31 = null;
      if (model.c28 !== null && model.k33 !== null && model.k31 !== null && model.k30 !== null) {
        model.b31 = model.c28 * model.k33 * (model.k31 - model.k30);
      }
      model.c31 = null;
      if (model.b31 !== null && model.k36 !== null) {
        model.c31 = model.b31 - model.k36;
      }
      model.d31 = null;
      if (model.k31 !== null) {
        model.d31 = this.roundUP(model.k31 * 12);
      }
      model.e31 = null;
      if (this.age !== null && model.k31 !== null) {
        b = Date.today();
        b.setHours(0, 0, 0);
        span = new TimeSpan(b - this.age).days;
        model.e31 = this.trunc(span / 365.25 + model.k31);
      }
      model.warning = 0;
      if (model.k29 > model.k31) {
        model.warning = 1;
      }
      model.c33 = null;
      if (obj.nudge_payment !== null) {
        model.c33 = obj.nudge_payment;
      }
      model.c36 = null;
      if (model.b36 !== null && model.k36 !== null) {
        model.c36 = model.b36 - model.k36;
      }
      model.k44 = null;
      if (model.k30 !== null && model.k34 !== null && model.k36 !== null && model.c33 !== null && model.k39 !== null && model.k33 !== null) {
        if (model.k34 > 0) {
          if ((1 - (model.k36 / model.c33) * model.k34 * (Math.pow((1 + model.k34), (model.k39 * model.k33)))) <= 0) {
            model.k44 = false;
          } else {
            model.k44 = model.k30 + (-(Math.log(1 - (model.k36 / model.c33) * model.k34 * (Math.pow((1 + model.k34), (model.k39 * model.k33))))) / (Math.log(1 + model.k34)) / model.k33);
          }
        } else {
          model.k44 = model.k30 + (model.k36 / (model.k33 * model.c33));
        }
      }
      model.k45 = null;
      if (model.k29 !== null && model.k34 !== null && model.k36 !== null && model.k38 !== null && model.k33 !== null && model.c33 !== null) {
        if (model.k34 > 0) {
          a = model.k36 - model.k38 * model.k33 * model.c33;
          b = -(Math.log(1 - ((a) / model.c33) * model.k34));
          model.k45 = model.k29 + b / Math.log(1 + model.k34) / model.k33;
        } else {
          model.k45 = model.k29 + ((model.k36 - model.k38 * model.k33 * model.c33) / (model.k33 * model.c33));
        }
      }
      model.k46 = null;
      if (model.k36 !== null && model.k33 !== null && model.c33 !== null && model.k30 !== null) {
        model.k46 = model.k36 / (model.k33 * model.c33) + model.k30;
      }
      model.k41 = null;
      if (model.c33 < model.c28) {
        model.k41 = null;
      } else {
        if (model.k29 !== null && model.k30 !== null && model.k44 !== null && model.k36 !== null && model.k33 !== null && model.k38 !== null && model.c33 !== null && model.k45 !== null && model.k46 !== null) {
          if (model.k29 <= model.k30) {
            model.k41 = model.k44;
          } else {
            if ((model.k36 - model.k38 * model.k33 * model.c33) > 0) {
              model.k41 = model.k45;
            } else {
              if ((model.k36 - model.k38 * model.k33 * model.c33) <= 0) {
                model.k41 = model.k46;
              } else {
                model.k41 = false;
              }
            }
          }
        }
      }
      model.b36 = null;
      if (model.c33 !== null && model.k33 !== null && model.k41 !== null && model.k30 !== null) {
        model.b36 = model.c33 * model.k33 * (model.k41 - model.k30);
      }
      model.c36 = null;
      if (model.b36 !== null && model.k36 !== null) {
        model.c36 = model.b36 - model.k36;
      }
      model.d36 = null;
      if (model.k41 !== null) {
        model.d36 = this.roundUP(model.k41 * 12);
      }
      model.e36 = null;
      if (this.age !== null && model.k41 !== null) {
        b = Date.today();
        b.setHours(0, 0, 0);
        span = new TimeSpan(b - this.age);
        model.e36 = this.trunc((span.getDays() / 365.25) + model.k41);
      }
      model.d33 = null;
      if (model.b31 !== null && model.b36 !== null) {
        model.d33 = model.b31 - model.b36;
      }
      results = {
        result_min_payment: model.c28,
        result_total: model.b31,
        result_interest: model.c31,
        result_time_to_repay: model.d31,
        result_age_repaid: model.e31,
        result_warning: model.warning,
        result_nudge: {
          payment: model.c33,
          total: model.b36,
          interest: model.c36,
          months: model.d36,
          age: model.e36,
          savings: model.d33
        }
      };
      return results;
    } catch (err) {
      //console.log(err);
    }
  },
  plol_model: function(obj) {
    'use strict';
    try {
      //console.log("><><><><   Start PL/OL MODEL   ><><><><");
      var model = {},
        results, b, span;
      obj = {
        amount_borrowed: (isNaN(parseFloat(obj.amount_borrowed, 10)) ? null : parseFloat(obj.amount_borrowed, 10)),
        interest_rate: (isNaN(parseFloat(obj.interest_rate, 10)) ? null : parseFloat(obj.interest_rate, 10)),
        total_term_months: (isNaN(parseInt(obj.total_term_months, 10)) ? null : parseInt(obj.total_term_months, 10)),
        repayment_frequency: (isNaN(parseFloat(obj.repayment_frequency, 10)) ? null : parseFloat(obj.repayment_frequency, 10)),
        month_born: (isNaN(parseInt(obj.month_born, 10)) ? null : parseInt(obj.month_born, 10)),
        year_born: (isNaN(parseInt(obj.year_born, 10)) ? null : parseInt(obj.year_born, 10)),
        nudge_payment: (isNaN(parseFloat(obj.nudge_payment, 10)) ? null : parseFloat(obj.nudge_payment, 10))
      };
      model.b8 = obj.amount_borrowed;
      model.d8 = (obj.interest_rate === null ? null : obj.interest_rate / 100);
      model.b14 = obj.total_term_months;
      model.c14 = obj.repayment_frequency;
      model.b22 = obj.month_born;
      model.c22 = obj.year_born;
      model.i7 = obj.month_born;
      model.k7 = obj.repayment_frequency;
      model.m7 = obj.total_term_months;
      model.k29 = null;
      if (model.l7 !== null) {
        model.k29 = model.m7 / 12;
      }
      model.k31 = model.k7;
      model.k32 = null;
      if (model.d8 !== null && model.k31 !== null) {
        model.k32 = model.d8 / model.k31;
      }
      model.k34 = model.b8;
      model.c28 = null;
      if (model.k32 !== null) {
        if (model.k32 > 0) {
          if (model.k34 !== null && model.k32 !== null && model.k29 !== null && model.k31 !== null) {
            if (model.k32 != 0 && ((1 - (Math.pow((1 + model.k32), -(model.k29 * model.k31)))) / model.k32) != 0) {
              model.c28 = model.k34 / ((1 - (Math.pow((1 + model.k32), -(model.k29 * model.k31)))) / model.k32);
            }
          }
        } else {
          if (model.k34 !== null && model.k31 !== null && model.k29 !== null) {
            if ((model.k31 * model.k29) != 0) {
              model.c28 = model.k34 / (model.k31 * model.k29);
            }
          }
        }
      }
      model.b31 = null;
      if (model.c28 !== null && model.k31 !== null && model.k29 !== null) {
        model.b31 = model.c28 * model.k31 * model.k29;
      }
      model.c31 = null;
      if (model.b31 !== null && model.k34 !== null) {
        model.c31 = model.b31 - model.k34;
      }
      model.d31 = null;
      if (model.k29 !== null) {
        model.d31 = this.roundUP(model.k29 * 12);
      }
      model.e31 = null;
      if (this.age !== null && model.k29 !== null) {
        b = Date.today();
        b.setHours(0, 0, 0);
        span = new TimeSpan(b - this.age).days;
        model.e31 = this.trunc(span / 365.25 + model.k29);
      }
      model.warning = 0;
      if (model.d8 < 0) {
        model.warning = 1;
      }
      model.c33 = null;
      if (obj.nudge_payment !== null) {
        model.c33 = obj.nudge_payment;
      }
      model.k36 = null;
      if (model.k32 !== null && model.k34 !== null && model.c33 !== null && model.k31 !== null) {
        if (model.k32 > 0) {
          model.k36 = -(Math.log(1 - (model.k34 / model.c33) * model.k32) / Math.log(1 + model.k32) / model.k31);
        } else {
          model.k36 = model.k34 / (model.k31 * model.c33);
        }
      }
      model.b36 = null;
      if (model.c33 !== null && model.k31 !== null && model.k36 !== null) {
        model.b36 = model.c33 * model.k31 * model.k36;
      }
      model.c36 = null;
      if (model.b36 !== null && model.k34 !== null) {
        model.c36 = model.b36 - model.k34;
      }
      model.d36 = null;
      if (model.k36 !== null) {
        model.d36 = this.roundUP(model.k36 * 12);
      }
      model.e36 = null;
      if (this.age !== null && model.k36 !== null) {
        b = Date.today();
        b.setHours(0, 0, 0);
        span = new TimeSpan(b - this.age);
        model.e36 = this.trunc((span.getDays() / 365.25) + model.k36);
      }
      model.d33 = null;
      if (model.b31 !== null && model.b36 !== null) {
        model.d33 = model.b31 - model.b36;
      }
      //console.log('model.b8: ' + model.b8);
      //console.log('model.d8: ' + model.d8);
      //console.log('model.b14: ' + model.b14);
      //console.log('model.c14: ' + model.c14);
      //console.log('model.b22: ' + model.b22);
      //console.log('model.c22: ' + model.c22);
      //console.log('model.c28: ' + model.c28);
      //console.log('model.b31: ' + model.b31);
      //console.log('model.c31: ' + model.c31);
      //console.log('model.d31: ' + model.d31);
      //console.log('model.e31: ' + model.e31);
      //console.log('model.c33: ' + model.c33);
      //console.log('model.b36: ' + model.b36);
      //console.log('model.c36: ' + model.c36);
      //console.log('model.d36: ' + model.d36);
      //console.log('model.e36: ' + model.e36);
      //console.log('model.d33: ' + model.d33);
      results = {
        result_min_payment: model.c28,
        result_total: model.b31,
        result_interest: model.c31,
        result_time: model.d31,
        result_age: model.e31,
        result_warning: model.warning,
        result_nudge: {
          payment: model.c33,
          total: model.b36,
          interest: model.c36,
          months: model.d36,
          age: model.e36,
          savings: model.d33
        }
      };
      return results;
    } catch (err) {
      //console.log(err);
    }
  },
  calculate: function(obj) {
    'use strict';
    this._super();
    console.debug = false;
    obj.year_born = (isNaN(parseInt(obj.year_born, 10)) ? null : parseInt(obj.year_born, 10));
    obj.month_born = (isNaN(parseInt(obj.month_born, 10)) ? null : parseInt(obj.month_born, 10));
    //console.log("><><><>< Calculating ><><><><");
    var self, this_calc;
    this.results = {};
    this.age = null;
    if (obj.month_born !== null && obj.year_born !== null) {
      this.age = Date.parse('15-' + obj.month_born + '-' + obj.year_born);
      this.age.setHours(0, 0, 0);
    }
    this.month_born = obj.month_born;
    this.year_born = obj.year_born;
    this.total = 0;
    self = this;
    $.each(obj, function(i, v) {
      switch (i) {
        case 'cc':
          self.results.cc = {};
          self.results.cc.total = 0;
          this_calc = self;
          $.each(v, function(ci, cv) {
            cv.month_born = self.month_born;
            cv.year_born = self.year_born;
            this_calc.results.cc[ci] = self.cc_model(cv);
            if (this_calc.results.cc[ci].result_warning) {
              self.add_error('repayment_impossible_' + ci);
            }
            delete this_calc.results.cc[ci].result_warning;
            self.results.cc.total += self.round((isNaN(parseFloat(this_calc.results.cc[ci].result_total, 10)) ? 0 : parseFloat(this_calc.results.cc[ci].result_total, 10)), 2);
            self.total += (isNaN(parseFloat(this_calc.results.cc[ci].result_total, 10)) ? 0 : parseFloat(this_calc.results.cc[ci].result_total, 10));
          });
          break;
        case 'hp':
          self.results.hp = {};
          self.results.hp.total = 0;
          this_calc = self;
          $.each(v, function(ci, cv) {
            cv.month_born = self.month_born;
            cv.year_born = self.year_born;
            this_calc.results.hp[ci] = self.hpcl_model(cv);
            self.results.hp.total += self.round((isNaN(parseFloat(this_calc.results.hp[ci].result_total, 10)) ? 0 : parseFloat(this_calc.results.hp[ci].result_total, 10)), 2);
            self.total += (isNaN(parseFloat(this_calc.results.hp[ci].result_total, 10)) ? 0 : parseFloat(this_calc.results.hp[ci].result_total, 10));
          });
          break;
        case 'cl':
          self.results.cl = {};
          self.results.cl.total = 0;
          this_calc = self;
          $.each(v, function(ci, cv) {
            cv.month_born = self.month_born;
            cv.year_born = self.year_born;
            this_calc.results.cl[ci] = self.hpcl_model(cv);
            self.results.cl.total += self.round((isNaN(parseFloat(this_calc.results.cl[ci].result_total, 10)) ? 0 : parseFloat(this_calc.results.cl[ci].result_total, 10)), 2);
            self.total += (isNaN(parseFloat(this_calc.results.cl[ci].result_total, 10)) ? 0 : parseFloat(this_calc.results.cl[ci].result_total, 10));
          });
          break;
        case 'pl':
          self.results.pl = {};
          self.results.pl.total = 0;
          this_calc = self;
          $.each(v, function(ci, cv) {
            cv.month_born = self.month_born;
            cv.year_born = self.year_born;
            this_calc.results.pl[ci] = self.plol_model(cv);
            self.results.pl.total += self.round((isNaN(parseFloat(this_calc.results.pl[ci].result_total, 10)) ? 0 : parseFloat(this_calc.results.pl[ci].result_total, 10)), 2);
            self.total += (isNaN(parseFloat(this_calc.results.pl[ci].result_total, 10)) ? 0 : parseFloat(this_calc.results.pl[ci].result_total, 10));
          });
          break;
        case 'ol':
          self.results.ol = {};
          self.results.ol.total = 0;
          this_calc = self;
          $.each(v, function(ci, cv) {
            cv.month_born = self.month_born;
            cv.year_born = self.year_born;
            this_calc.results.ol[ci] = self.plol_model(cv);
            self.results.ol.total += self.round((isNaN(parseFloat(this_calc.results.ol[ci].result_total, 10)) ? 0 : parseFloat(this_calc.results.ol[ci].result_total, 10)), 2);
            self.total += (isNaN(parseFloat(this_calc.results.ol[ci].result_total, 10)) ? 0 : parseFloat(this_calc.results.ol[ci].result_total, 10));
          });
          break;
        default:
          break;
      }
    });
    this.results.total = this.round(self.total, 2);
    console.dir(this.results);
    return this.results;
  }
});
var testmode = false;
var testObj = {
  month_born: 9,
  year_born: 1977,
  cc: {
    cc1: {
      amount_owed: 2000,
      interest_rate: 20,
      repayment_amount: 185.27,
      repayment_frequency: 12,
      nudge_payment: 230
    },
    cc2: {
      amount_owed: 3000,
      interest_rate: 20,
      repayment_amount: 20,
      repayment_frequency: 52,
      nudge_payment: 230
    },
    cc3: {
      amount_owed: 2000,
      interest_rate: 20,
      repayment_amount: 20,
      repayment_frequency: 12,
      nudge_payment: 230
    }
  },
  hp: {
    hp1: {
      amount_borrowed: 1000,
      interest_rate: 20.75,
      interest_free_period: 6,
      startup_fees: 85.00,
      other_fees: 50.00,
      deferred_payment_months: 3,
      total_term_months: 12,
      repayment_frequency: 26,
      nudge_payment: 80
    },
    hp2: {
      amount_borrowed: 1000,
      interest_rate: 20.75,
      interest_free_period: 8,
      startup_fees: 85.00,
      other_fees: 50.00,
      deferred_payment_months: 3,
      total_term_months: 12,
      repayment_frequency: 26,
      nudge_payment: 80
    }
  },
  cl: {
    cl1: {
      amount_borrowed: 1000,
      interest_rate: 20.75,
      interest_free_period: 0,
      startup_fees: 0,
      other_fees: 0,
      deferred_payment_months: 0,
      total_term_months: 12,
      repayment_frequency: 26,
      nudge_payment: 80
    }
  },
  pl: {
    pl1: {
      amount_borrowed: 1000,
      interest_rate: 0.2075,
      total_term_months: 12,
      repayment_frequency: 26,
      nudge_payment: 60
    },
    pl2: {
      amount_borrowed: 2000,
      interest_rate: 0.2075,
      total_term_months: 12,
      repayment_frequency: 26,
      nudge_payment: 80
    }
  },
  ol: {
    ol1: {
      amount_borrowed: 4563,
      interest_rate: 0.2075,
      total_term_months: 12,
      repayment_frequency: 26,
      nudge_payment: 80
    }
  }
};
if (testmode === true) {
  (function($) {
    'use strict';

    function testCalcLogic() {
      var test = new SortedCalculator_Debt();
      var results = test.calculate(testObj);
      //console.log(results);
    }

    testCalcLogic();

  }(jQuery));
}
