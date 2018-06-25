/*! kiwisaver.js */
console.debug = false;
var SortedCalculator_KiwiSaver = SortedCalculator.extend({
  init: function () {
    'use strict';
    if(debug) console.log('SortedCalculator_KiwiSaver.init');
    this._super();
  }, debug_mode: false, check_vars: function (teArray, flag) {
    'use strict';
    var i;
    for (i = 0; i < teArray.length; i += 1) {
      if (teArray[i] === null || teArray[i] === undefined) {
        if(debug) console.log(flag + ') found null or undefined in key [' + i + ']', teArray);
        return false;
      }
    }
    return true;
  }, epic: function (period) {
    'use strict';
    var epicObj = {}, over18, t, rate2, x, num_periods, current_employee_total, i, a, e, f, part_a, part_b;
    epicObj.a_year = null;
    if (this.work.e11 !== null) {
      epicObj.a_year = this.roundUP(period / this.work.e11);
    }
    epicObj.b_period = Number(period);
    over18 = null;
    if (this.work.dob !== null) {
      var age_ms, age_days, age_years;
      var age_ms = new Date().getTime() - this.work.dob.getTime();
      age_days = age_ms / 1000 / 60 / 60 / 24;
      epicObj.period_age = (age_days + (365.25 / this.work.e37 * (epicObj.b_period - 1))) / 365.25;
      if (epicObj.period_age < 18) {
        over18 = false;
      } else {
        over18 = true;
      }
      epicObj.over18 = over18;
    }
    epicObj.c_year2 = null;
    if (epicObj.b_period !== null && this.work.e31 !== null && this.work.e11 !== null && this.work.e11 !== 0 && over18 !== null) {
      if (over18) {
        epicObj.c_year2 = Math.max(0, (this.roundUP((epicObj.b_period - this.work.e31) / this.work.e11)));
      } else {
        epicObj.c_year2 = 'under 18';
      }
    }
    epicObj.d_salary = null;
    if (this.work.e11 !== null && this.work.e8 !== null && epicObj.a_year !== null && this.work.e11 !== null && this.work.e11 !== 0) {
      epicObj.d_salary = this.work.e10 * (Math.pow((1 + this.work.e8), (epicObj.a_year - 1))) / this.work.e37;
    }
    epicObj.e_starting_value = this.work.kiwisaver_start_value;
    if (epicObj.b_period > 1) {
      if (this.check_vars([this.table[(epicObj.b_period - 1)].m_end_value], 'm_end_value not defined yet :77')) {
        epicObj.e_starting_value = this.table[(epicObj.b_period - 1)].m_end_value;
      }
    }
    epicObj.f_add_interest = null;
    if (epicObj.e_starting_value !== null && this.work.e7 !== null && this.work.e11 !== null && this.work.e11 !== 0) {
      epicObj.f_add_interest = epicObj.e_starting_value * Math.pow((1 + this.work.e7), (1 / this.work.e11));
    }
    epicObj.g_govt_kick_start = 0;
    epicObj.h_employee = null;
    if (this.work.e39 === 2) {
      if (period >= this.work.e21) {
        a = Math.max(0.03, this.work.e12);
      } else {
        a = this.work.e12;
      }
      epicObj.h_employee = epicObj.d_salary * a;
    } else {
      if (this.work.e17 !== null && this.work.e15 !== null && this.work.e16 !== null && this.work.e11 !== null && this.work.e11 !== 0 && this.work.e6 !== null && epicObj.a_year !== null) {
        t = 0;
        if (this.work.e17 === 'yes') {
          t = 1;
        }
        epicObj.h_employee = this.work.e15 * (this.work.e16 / this.work.e37) * (Math.pow((1 + this.work.e6), (t * (epicObj.a_year - 1))));
      }
    }
    rate2 = 0;
    if (this.work.e14 === 0) {
      if (period === 1) {
        rate2 = this.work.e13;
      }
    } else {
      e = this.work.e13 * (Math.max(1, (this.work.e14 / this.work.e37)));
      if ((period % (Math.max(1, this.trunc(this.work.e37 / this.work.e14)))) === 0) {
        f = 1;
      } else {
        f = 0;
      }
      rate2 = e * f;
    }
    if (epicObj.h_employee !== null && rate2 !== null) {
      epicObj.h_employee = epicObj.h_employee + rate2;
    }
    epicObj.i_employer_notax = null;
    if (epicObj.c_year2 === "under 18" || Number(this.work.e39) === 1 || Number(this.work.e39) === 3) {
      epicObj.i_employer_notax = 0;
    } else {
      if (epicObj.b_period !== null && this.work.e20 !== null && epicObj.d_salary !== null && this.work.e19 !== null) {
        epicObj.i_employer_notax = 0;
        if (epicObj.b_period < this.work.e20) {
          epicObj.i_employer_notax = epicObj.d_salary * this.work.e19;
        }
      }
    }
    x = null;
    epicObj.j_employer_tax = null;
    if (epicObj.c_year2 === "under 18" || Number(this.work.e39) === 1 || Number(this.work.e39) === 3) {
      epicObj.j_employer_tax = 0;
    } else {
      if (epicObj.b_period !== null && this.work.e20 !== null) {
        x = 0;
        if (epicObj.b_period < this.work.e20) {
          if (this.work.f19 !== null && this.work.e19 !== null) {
            x = Math.max(0, (this.work.f19 - this.work.e19));
          }
        } else {
          if (this.work.f19 !== null && this.work.e21 !== null) {
            if (epicObj.b_period >= this.work.e21) {
              x = Math.max(0.03, this.work.f19) * (1 - this.work.f41);
            } else {
              x = this.work.f19 * (1 - this.work.e41);
            }
          }
        }
        if (x !== null && epicObj.d_salary !== null && this.work.e41 !== null) {
          epicObj.j_employer_tax = epicObj.d_salary * x;
        }
      }
    }
    epicObj.k_tax_credit = 0;
    var prev_tax_credit_period = 1;
    epicObj.last_tax_credit_period = 1;
    if (period === 1) {
      epicObj.last_tax_credit_period = 1;
    } else {
      prev_tax_credit_period = epicObj.last_tax_credit_period;
      if (this.table[period - 1].c_year2 < epicObj.c_year2) {
        epicObj.last_tax_credit_period = period;
      } else {
        if (this.check_vars([this.table[period - 1].last_tax_credit_period], 'epicObj.last_tax_credit_period')) {
          epicObj.last_tax_credit_period = this.table[period - 1].last_tax_credit_period;
        }
      }
    }
    if (epicObj.last_tax_credit_period !== 1) {
      num_periods = (period + 1) - epicObj.last_tax_credit_period;
    } else {
      num_periods = period;
    }
    part_a = {};
    part_a.total = 0;
    if (period === this.work.j5) {
      if (this.check_vars([num_periods, this.work.e37, this.work.e33], 'part_a.a1')) {
        part_a.a1 = this.work.e33;
      }
      current_employee_total = 0;
      for (i = period - num_periods; i < period; i += 1) {
        if (i > 0) {
          if (this.check_vars([this.table[i].h_employee], 'tax credit current_employee_total')) {
            current_employee_total = current_employee_total + this.table[i].h_employee;
          }
        }
      }
      if (epicObj.last_tax_credit_period === 1) {
        current_employee_total = current_employee_total + epicObj.h_employee;
      }
      part_a.a2 = current_employee_total / 2;
      part_a.total = Math.min(part_a.a1, part_a.a2);
    }
    part_b = {};
    part_b.total = 0;
    if (period > 1) {
      if (this.table[(period - 1)].last_tax_credit_period !== null) {
        num_periods = period - this.table[(period - 1)].last_tax_credit_period;
      } else {
        num_periods = period;
      }
      part_b.b1 = Math.min(1, (num_periods / this.work.e37));
      if (this.table[(period - 1)].c_year2 < epicObj.c_year2) {
        current_employee_total = 0;
        for (i = (this.table[(period - 1)].last_tax_credit_period - 1); i < (period - 1); i += 1) {
          if (this.table[i + 1].over18) {
            current_employee_total = current_employee_total + this.table[i + 1].h_employee;
          }
        }
        part_b.b2 = current_employee_total / 2;
        part_b.total = Math.min(this.work.e33, part_b.b2);
      }
    } else {
      part_b.b2 = 0;
    }
    epicObj.k_tax_credit = part_a.total + part_b.total;
    epicObj.k_tax_credit_b2 = part_b.b2;
    epicObj.l_total = null;
    if (epicObj.g_govt_kick_start !== null && epicObj.h_employee !== null && epicObj.i_employer_notax !== null && epicObj.j_employer_tax !== null && epicObj.k_tax_credit !== null) {
      epicObj.l_total = Number(epicObj.g_govt_kick_start) + Number(epicObj.h_employee) + Number(epicObj.i_employer_notax) + Number(epicObj.j_employer_tax) + Number(epicObj.k_tax_credit);
    }
    epicObj.m_end_value = null;
    if (this.check_vars([epicObj.l_total, epicObj.f_add_interest], 'epicObj.m_end_value: ~255')) {
      epicObj.m_end_value = epicObj.l_total + epicObj.f_add_interest;
    }
    epicObj.o_todays_dollars = null;
    if (this.check_vars([epicObj.m_end_value, this.work.f6], 'epicObj.o_todays_dollars:~262') && Math.pow((1 + this.work.f6), period) !== 0) {
      epicObj.o_todays_dollars = epicObj.m_end_value / Math.pow((1 + this.work.f6), period);
    }
    epicObj.p_interest = null;
    if (epicObj.f_add_interest !== null && epicObj.e_starting_value !== null) {
      epicObj.p_interest = epicObj.f_add_interest - epicObj.e_starting_value;
    }
    return epicObj;
  }, work: {}, table: {}, calculate: function (obj, testMode) {
    'use strict';
    try {
      this._super();
      console.debug = this.debug_mode;
      var span = '', ks_month = '', et = '', table = {}, i, sum0, sum1, sum2, v1, v2, v3, v4, a, b, results = {}, today = new Date();
      if(debug) console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX " + today.toString('HH:mm:ss'));
      if(debug) console.log('______________Incoming Input Object______________________');
      if(debug) console.dir(obj);
      this.table = {};
      obj = {
        contrib_freq: (isNaN(parseInt(obj.contrib_freq, 10)) ? null : parseInt(obj.contrib_freq, 10)),
        salary: (isNaN(parseInt(obj.salary, 10)) ? null : parseInt(obj.salary, 10)),
        life_expectancy: (isNaN(parseInt(obj.life_expectancy, 10)) ? null : parseInt(obj.life_expectancy, 10)),
        kiwisaver_contribs: (isNaN(parseInt(obj.kiwisaver_contribs, 10)) ? null : parseInt(obj.kiwisaver_contribs, 10)),
        lump_sum_contrib: (isNaN(parseInt(obj.lump_sum_contrib, 10)) ? 0 : parseInt(obj.lump_sum_contrib, 10)),
        lump_sum_freq: (isNaN(parseInt(obj.lump_sum_freq, 10)) ? null : parseInt(obj.lump_sum_freq, 10)),
        kiwisaver_contribs_self: (isNaN(parseInt(obj.kiwisaver_contribs_self, 10)) ? null : parseInt(obj.kiwisaver_contribs_self, 10)),
        employer_contrib: (isNaN(parseFloat(obj.employer_contrib, 10)) ? null : parseFloat(obj.employer_contrib, 10)),
        kiwisaver_value: (isNaN(parseFloat(obj.kiwisaver_value, 10)) ? 0 : parseFloat(obj.kiwisaver_value, 10)),
        has_kiwisaver: (parseInt(obj.has_kiwisaver, 10) === 1 ? true : false),
        joined_month: (isNaN(parseInt(obj.joined_month, 10)) ? null : parseInt(obj.joined_month, 10)),
        joined_year: (isNaN(parseInt(obj.joined_year, 10)) ? null : parseInt(obj.joined_year, 10)),
        month_born: (isNaN(parseInt(obj.monthborn, 10)) ? null : parseInt(obj.monthborn, 10)),
        year_born: (isNaN(parseInt(obj.year_born, 10)) ? null : parseInt(obj.year_born, 10)),
        employment_status: (isNaN(parseInt(obj.employment_status, 10)) ? null : parseInt(obj.employment_status, 10)),
        iar: (parseInt(obj.iar, 10) === 1 ? true : false),
        result_income_freq: (isNaN(parseInt(obj.result_income_freq, 10)) ? null : parseInt(obj.result_income_freq, 10))
      };
      if (obj.has_kiwisaver !== null && obj.kiwisaver_value !== null) {
        if (obj.has_kiwisaver === false) {
          obj.kiwisaver_value = 0;
        }
      }
      if(debug) console.log('______________Cleaned Input Object______________________');
      if(debug) console.dir(obj);
      this.work.life_expectancy = null;
      if (obj.life_expectancy !== null) {
        this.work.life_expectancy = obj.life_expectancy;
      }
      this.work.dob = null;
      if (obj.month_born !== null && obj.year_born !== null) {
        this.work.dob = Date.parse(obj.year_born + '-' + obj.month_born + '-01');
      }
      this.work.kiwisaver_start_value = 0;
      if (obj.kiwisaver_value !== null) {
        this.work.kiwisaver_start_value = obj.kiwisaver_value;
      }
      this.work.e5 = Date.today().toString('dd-MM-yyyy');
      this.work.e6 = constants.inflation_rate;
      this.work.f6 = null;
      if (obj.contrib_freq !== 0 && obj.contrib_freq !== null) {
        this.work.f6 = (Math.pow((1 + this.work.e6), (1 / obj.contrib_freq)) - 1);
      }
      if (obj.salary <= 14000) {
        this.work.e7 = (Number(constants.pir_lookup.over0k.net_return) + Number(constants.inflation_rate));
      } else if (obj.salary > 14000 && obj.salary <= 48000) {
        this.work.e7 = (Number(constants.pir_lookup.over14k.net_return) + Number(constants.inflation_rate));
      } else {
        this.work.e7 = (Number(constants.pir_lookup.over48k.net_return) + Number(constants.inflation_rate));
      }
      this.work.e7 = this.round(this.work.e7, 3);
      this.work.e8 = constants.salary_inflation_pa;
      this.work.e9 = constants.retire_age;
      this.work.e10 = null;
      if (obj.salary !== null) {
        this.work.e10 = obj.salary;
      }
      this.work.e11 = null;
      if (obj.contrib_freq !== null) {
        this.work.e11 = obj.contrib_freq;
      }
      this.work.e12 = 0;
      if (obj.kiwisaver_contribs !== null) {
        this.work.e12 = (obj.kiwisaver_contribs / 100);
      }
      this.work.e13 = obj.lump_sum_contrib;
      this.work.e14 = obj.lump_sum_freq;
      this.work.e15 = null;
      if (obj.kiwisaver_contribs_self !== null) {
        /*
        if (testMode !== true) {
          if (obj.kiwisaver_contribs_self !== null && obj.contrib_freq !== null && obj.contrib_freq !== 0) {
            this.work.e15 = obj.kiwisaver_contribs_self / obj.contrib_freq;
          }
        } else {
          this.work.e15 = obj.kiwisaver_contribs_self;
        }
        */
        this.work.e15 = obj.kiwisaver_contribs_self;
      }
      this.work.e16 = obj.contrib_freq;
      this.work.e17 = constants.inflation_adjusted_contrib_for_self_employed;
      this.work.e19 = constants.employer_contribution_rate;
      if (obj.employer_contrib === null || obj.employer_contrib === 1) {
        obj.employer_contrib = 0.02;
      }
      this.work.f19 = obj.employer_contrib / 100;
      a = Date.parse(constants.employer_tax_break_ends);
      b = Date.today();
      a.setHours(0, 0, 0);
      b.setHours(0, 0, 0);
      span = new TimeSpan(a - b);
      this.work.e20 = null;
      if (this.work.e11 !== null) {
        this.work.e20 = (span.getDays() / 365.25) * this.work.e11;
      }
      this.work.f21 = Date.parse(constants.kiwisaver_3percent_contributions_start);
      this.work.e37 = this.work.e11;
      b = Date.today();
      span = new TimeSpan(this.work.f21 - b);
      this.work.e21 = null;
      if (obj.employer_contrib === 0) {
        this.work.e21 = 999999;
      } else {
        this.work.e21 = (span.getDays() / 365.25) * this.work.e37;
      }
      this.work.e23 = obj.has_kiwisaver;
      this.work.e24 = this.work.e5;
      if (this.work.e23) {
        if (obj.joined_year !== null && obj.joined_year < 100) {
          obj.joined_year = 2000 + obj.joined_year;
        }
        this.work.e24 = '01-' + ('0' + obj.joined_month).slice(-2) + '-' + obj.joined_year;
      }
      this.work.e26 = null;
      if (Date.parse(this.work.e24) !== null) {
        this.work.e26 = Date.parse(this.work.e24).add(3).months().toString('dd-MM-yyyy');
      }
      this.work.e27 = null;
      if (this.work.e11 !== null && this.work.e26 !== null) {
        a = Date.parse(this.work.e26).add(1).days();
        b = Date.today();
        a.setHours(0, 0, 0);
        b.setHours(0, 0, 0);
        span = new TimeSpan(a - b);
        this.work.e27 = Math.max(0, this.roundUP((span.getDays() / 365.25) * this.work.e37));
      }
      this.work.e28 = constants.govt_kiwisaver_kick_start_amount;
      this.work.e30 = null;
      if (Date.parse(this.work.e24) !== null) {
        ks_month = Date.parse(this.work.e24).toString('MM');
        this.work.e30 = '30-06-' + Date.parse(this.work.e24).toString('yyyy');
        if (ks_month >= '06') {
          this.work.e30 = Date.parse(this.work.e30).addYears(1).toString('dd-MM-yyyy');
        }
      }
      this.work.e31 = null;
      if (this.work.e11 !== null && Date.parse(this.work.e30) !== null) {
        a = Date.parse(this.work.e30);
        span = new TimeSpan(b - a);
        this.work.e31 = this.roundUP(-((span.getDays() / 365.25) * this.work.e11));
      }
      this.work.e33 = constants.govt_kiwisaver_tax_credit_full / 2;
      this.work.e34 = null;
      if (obj.month_born !== null && obj.year_born !== null) {
        this.work.e34 = this.date_of_retirement('01-' + obj.month_born + '-' + obj.year_born);
      }
      this.a = null;
      this.b = null;
      this.a = Date.parse(this.work.e24);
      this.b = Date.parse(this.work.e34);
      if (this.a !== null && this.b !== null && this.b - this.a <= 0) {
        this.add_error('retire_before_start');
      }
      this.work.e39 = obj.employment_status;
      this.work.e35 = null;
      if (this.check_vars([this.work.e11, Date.parse(this.work.e34)], 'this.work.e35: ~546') && !this.has_error('retire_before_start')) {
        this.a = Date.parse(this.work.e34);
        this.b = Date.today();
        this.n = Date.parse(this.work.e5);
        this.m = Date.parse(this.work.e24);
        this.span = new TimeSpan(this.a - this.m);
        this.span2 = new TimeSpan(this.a - this.b);
        this.span24 = new TimeSpan(this.n - this.m);
        if (this.work.e23) {
          this.work.e35 = this.trunc((Math.max(5, (this.span.getDays()) / 365.25) - (this.span24.getDays() / 365.25)) * this.work.e37);
        } else {
          this.work.e35 = this.trunc((Math.max(5, (this.span2.getDays()) / 365.25)) * this.work.e37);
        }
      }
      if (this.work.e35 < 0) {
        return false;
      }
      this.work.e41 = null;
      if (this.work.e10 !== null && this.work.f19 !== null) {
        et = (this.work.e10 * (1 + this.work.f19));
        if (et > 84000) {
          this.work.e41 = 0.33;
        } else if (et > 57600) {
          this.work.e41 = 0.3;
        } else if (et > 16800) {
          this.work.e41 = 0.175;
        } else {
          this.work.e41 = 0.105;
        }
      }
      this.work.f41 = null;
      if (this.check_vars([this.work.e10, this.work.f19], 'this.work.f41: ~589')) {
        if ((this.work.e10 * (1 + (Math.max(0.03, this.work.f19)))) > 84000) {
          this.work.f41 = 0.33;
        } else if ((this.work.e10 * (1 + (Math.max(0.03, this.work.f19)))) > 57600) {
          this.work.f41 = 0.30;
        } else if ((this.work.e10 * (1 + (Math.max(0.03, this.work.f19)))) > 16800) {
          this.work.f41 = 0.175;
        } else {
          this.work.f41 = 0.105;
        }
      }
      this.work.i7 = null;
      if (this.work.e11 !== null && Date.parse(this.work.e24) !== null) {
        a = Date.parse(this.work.e24).addYears(3);
        b = Date.today();
        a.setHours(0, 0, 0);
        b.setHours(0, 0, 0);
        span = new TimeSpan(a - b);
        this.work.i7 = this.trunc((span.getDays() / 365.25) * this.work.e37);
      }
      this.work.i8 = null;
      if (this.work.e24 !== null && Date.parse(this.work.e24) !== null) {
        a = Date.parse(this.work.e24).addMonths(60);
        b = Date.today();
        a.setHours(0, 0, 0);
        b.setHours(0, 0, 0);
        span = new TimeSpan(a - b);
        this.work.i8 = this.trunc((span.getDays() / 365.25) * this.work.e37);
      }
      obj.work = this.work;
      obj.table = this.table;
      obj.results = {};
      if (this.check_vars([this.work.e35], 'js: ~604')) {
        this.work.j5 = this.work.e35;
      }
      if (this.work.dob !== null && this.work.e35 !== null) {
        table = {};
        if(debug) console.log('----------- Loop Below, beware! loops ' + this.work.e35 + ' times---------');
        for (i = 1; i <= this.work.e35; i += 1) {
          this.table[i] = this.epic(i);
        }
      }
      this.work.j7 = null;
      if (Date.parse(this.work.e24) !== null && obj.table[1] !== undefined) {
        a = Date.parse(this.work.e24).add(3).years();
        b = Date.today();
        a.setHours(0, 0, 0);
        b.setHours(0, 0, 0);
        span = new TimeSpan(a - b);
        if ((span.getDays() / 365.25) < 0) {
          this.work.j7 = false;
        } else {
          if (this.check_vars([this.work.e11], 'j7:650')) {
            if (this.check_vars([obj.table[this.work.i7 + 1].m_end_value], 'm_end_value:~648')) {
              sum0 = obj.table[this.work.i7].m_end_value;
              sum1 = 0;
              for (i = 1; i <= this.work.i7; i += 1) {
                if (this.check_vars([obj.table[i], obj.table[i].g_govt_kick_start], 'this.work.j7 sum 1')) {
                  sum1 = sum1 + Number(obj.table[i].g_govt_kick_start);
                }
              }
              sum2 = 0;
              a = Date.parse(this.work.e24).add(3).months();
              b = Date.today();
              a.setHours(0, 0, 0);
              b.setHours(0, 0, 0);
              span = new TimeSpan(a - b).days;
              if (span < 0) {
                this.work.j7 = sum0 - sum1 - sum2 - this.work.e28;
              } else {
                this.work.j7 = sum0 - sum1 - sum2;
              }
            }
          }
        }
      }
      this.work.j8 = null;
      if (Date.parse(this.work.e24) !== null && Date.parse(this.work.e24) !== undefined) {
        a = Date.parse(this.work.e24).add(5).years();
        b = Date.today();
        a.setHours(0, 0, 0);
        b.setHours(0, 0, 0);
        span = new TimeSpan(a - b).days;
        if ((span / 365.25) < 0) {
          this.work.j8 = false;
        } else {
          if (this.work.e11 !== null) {
            if (this.check_vars([obj.table[this.work.i8]], 'this.work.j8:695')) {
              this.work.j8 = obj.table[this.work.i8].m_end_value;
              sum0 = obj.table[this.work.i8].m_end_value;
              sum1 = 0;
              for (i = 1; i <= this.work.i8; i += 1) {
                sum1 += obj.table[i].g_govt_kick_start;
              }
              sum2 = 0;
              a = Date.parse(this.work.e26);
              b = Date.today();
              a.setHours(0, 0, 0);
              b.setHours(0, 0, 0);
              span = new TimeSpan(a - b).days;
              if (span < 0) {
                this.work.j8 = sum0 - sum1 - sum2 - this.work.e28;
              } else {
                this.work.j8 = sum0 - sum1 - sum2;
              }
            }
          }
        }
      }
      this.work.j10 = null;
      if (obj.table[this.work.e35] !== null && obj.table[this.work.e35] !== undefined) {
        this.work.j10 = obj.table[this.work.e35].o_todays_dollars;
      }
      this.work.j11 = null;
      if (this.check_vars([obj.table[this.work.e35].m_end_value], 'j11:731')) {
        this.work.j11 = obj.table[this.work.e35].m_end_value;
      }
      this.work.j13 = null;
      if (this.check_vars([this.work.e7, this.work.e6, this.work.life_expectancy, this.work.e9, obj.result_income_freq], 'j13')) {
        v1 = (1 + (this.work.e7 - this.work.e6));
        v2 = (this.work.life_expectancy - this.work.e9);
        v3 = 1 - (Math.pow(v1, -v2));
        v4 = Math.pow((1 + (this.work.e7 - this.work.e6)), (1 / obj.result_income_freq)) - 1;
        if (v4 !== 0) {
          this.work.j13 = v3 / v4;
        }
      }
      this.work.j16 = null;
      if (this.work.j10 !== null && this.work.j13 !== null && this.work.j13 !== 0) {
        this.work.j16 = this.work.j10 / this.work.j13;
      }
      this.work.j17 = null;
      if (this.work.j11 !== null && this.work.j13 !== null && this.work.j13 !== 0) {
        this.work.j17 = this.work.j11 / this.work.j13;
      }
      if(debug) console.dir(obj.table);
      results = {};
      if (obj.iar === false) {
        this.work.retirement_lump_sum = this.work.j11;
        this.work.retirement_income = this.work.j17;
      } else {
        this.work.retirement_lump_sum = this.work.j10;
        this.work.retirement_income = this.work.j16;
      }
      this.work.retirement_lump_sum = (this.work.retirement_lump_sum === null ? null : this.round(this.work.retirement_lump_sum, 0));
      this.work.retirement_income = (this.work.retirement_income === null ? null : this.round(this.work.retirement_income, 0));
      this.work.years_3 = (this.work.j7 === null ? null : this.round(this.work.j7, 0));
      this.work.years_5 = (this.work.j8 === null ? null : this.round(this.work.j8, 0));
      results.retirement_lump_sum = this.work.retirement_lump_sum;
      results.retirement_income = this.work.retirement_income;
      results.super_age = this.work.e9;
      results.life_expectancy = obj.life_expectancy;
      results.years_3 = this.work.years_3;
      results.years_5 = this.work.years_5;
      this.results = obj.results;
      this.debug();
      if(debug) console.log('______________Returned Output Object______________________');
      if(debug) console.dir(this.results);
      return results;
    } catch (err) {
      if(debug) console.log("//\/\\//\/\\//\/\\ CAUGHT ERROR in Calculate: " + err);
      if(debug) console.dir(err);
    }
  }, debug: function () {
    'use strict';
    if(debug) console.log('Working data: ');
    if(debug) console.log(this.work);
  }
});
var testObj1 = {
  year_born: "1980",
  monthborn: "10",
  gender: "2",
  life_expectancy: "83",
  employment_status: "2",
  salary: "50000",
  has_kiwisaver: 1,
  joined_year: "2010",
  joined_month: "3",
  kiwisaver_contribs_self: "",
  contrib_freq: "12",
  lump_sum_contrib: "1000",
  lump_sum_freq: "0",
  kiwisaver_contribs: "4",
  employer_contrib: "3",
  kiwisaver_value: "10000",
  iar: 1,
  result_income_freq: 1,
  expected: {
    life_expectancy: 83,
    retirement_income: 19570,
    retirement_lump_sum: 266894,
    super_age: 65,
    years_3: 12232,
    years_5: 20720
  }
};
var testObj2 = {
  year_born: 1980,
  monthborn: 10,
  gender: 2,
  life_expectancy: 83,
  employment_status: 1,
  salary: 50000,
  has_kiwisaver: 1,
  joined_year: 2007,
  joined_month: 3,
  kiwisaver_contribs_self: 500,
  contrib_freq: 12,
  lump_sum_contrib: 1000,
  lump_sum_freq: 0,
  kiwisaver_value: 10000,
  kiwisaver_contribs: 4,
  employer_contrib: 3,
  iar: 0,
  result_income_freq: 1,
  expected: {
    life_expectancy: 83,
    retirement_income: 52857,
    retirement_lump_sum: 720859,
    super_age: 65,
    years_3: 14991,
    years_5: 29629
  }
};
var testObj3 = {
  monthborn: "12",
  year_born: "1950",
  life_expectancy: "82",
  employment_status: "1",
  salary: "20000",
  has_kiwisaver: "0",
  joined_month: "12",
  joined_year: "1998",
  kiwisaver_contribs_self: "10",
  contrib_freq: "52",
  lump_sum_contrib: "0",
  lump_sum_freq: "0",
  kiwisaver_contribs: "3",
  employer_contrib: "2",
  kiwisaver_value: "0",
  iar: "1",
  result_income_freq: 1,
  expected: {
    life_expectancy: 82,
    retirement_income: 426,
    retirement_lump_sum: 5353,
    super_age: 65,
    years_3: 1917,
    years_5: 3535
  }
};
var testObj4 = {
  year_born: "1958",
  monthborn: "1",
  life_expectancy: "85",
  employment_status: "1",
  salary: "40000",
  has_kiwisaver: "0",
  joined_year: "",
  joined_month: "_none",
  kiwisaver_contribs_self: "0",
  contrib_freq: "1",
  lump_sum_contrib: "0",
  kiwisaver_value: "0",
  kiwisaver_contribs: "_none",
  employer_contrib: "_none",
  iar: "",
  lump_sum_freq: "0",
  result_income_freq: 1,
  expected: {
    life_expectancy: 85,
    retirement_income: 110,
    retirement_lump_sum: 1546,
    super_age: 65,
    years_3: 115,
    years_5: 146
  }
};
var testObj5 = {
  monthborn: "2",
  year_born: "1968",
  life_expectancy: "85",
  employment_status: "2",
  salary: "80000",
  has_kiwisaver: "1",
  joined_month: "6",
  joined_year: "2000",
  kiwisaver_contribs_self: "50",
  contrib_freq: "52",
  lump_sum_contrib: "100",
  lump_sum_freq: "26",
  kiwisaver_contribs: "3",
  employer_contrib: "3",
  kiwisaver_value: "4000",
  iar: "1",
  result_income_freq: 1,
  expected: {
    life_expectancy: 85,
    retirement_income: 13821,
    retirement_lump_sum: 203740,
    super_age: 65,
    years_3: false,
    years_5: false
  }
};
var testObj6 = {
  year_born: "1968",
  monthborn: "2",
  life_expectancy: "85",
  employment_status: "1",
  salary: "80000",
  has_kiwisaver: "1",
  joined_year: "2000",
  joined_month: "6",
  kiwisaver_contribs_self: "50",
  contrib_freq: "52",
  lump_sum_contrib: "100",
  lump_sum_freq: "0",
  kiwisaver_value: "4000",
  kiwisaver_contribs: "3",
  employer_contrib: "3",
  iar: "1",
  result_income_freq: 1,
  expected: {
    life_expectancy: 85,
    retirement_income: 6060,
    retirement_lump_sum: 89335,
    super_age: 65,
    years_3: false,
    years_5: false
  }
};
var testObj7 = {
  monthborn: "2",
  year_born: "1968",
  life_expectancy: "85",
  employment_status: "1",
  salary: "80000",
  has_kiwisaver: "1",
  joined_year: "2000",
  joined_month: "6",
  kiwisaver_contribs_self: "50",
  contrib_freq: "52",
  lump_sum_contrib: "100",
  lump_sum_freq: "52",
  kiwisaver_value: "4000",
  kiwisaver_contribs: "3",
  employer_contrib: "3",
  iar: "1",
  result_income_freq: 1,
  expected: {
    life_expectancy: 85,
    retirement_income: 14150,
    retirement_lump_sum: 208588,
    super_age: 65,
    years_3: false,
    years_5: false
  }
};
var testObj8 = {
  year_born: "1968",
  monthborn: "2",
  life_expectancy: "85",
  employment_status: "2",
  salary: "80000",
  has_kiwisaver: "1",
  joined_month: "6",
  joined_year: "2000",
  kiwisaver_contribs_self: "50",
  contrib_freq: "52",
  lump_sum_contrib: "100",
  lump_sum_freq: "0",
  kiwisaver_value: "4000",
  kiwisaver_contribs: "3",
  employer_contrib: "3",
  iar: "1",
  result_income_freq: 1,
  expected: {
    life_expectancy: 85,
    retirement_income: 9787,
    retirement_lump_sum: 144266,
    super_age: 65,
    years_3: false,
    years_5: false
  }
};
var testObj9 = {
  year_born: "1969",
  monthborn: "2",
  life_expectancy: "85",
  employment_status: "2",
  salary: "16153",
  has_kiwisaver: "0",
  joined_year: "",
  joined_month: "_none",
  kiwisaver_contribs_self: "0",
  contrib_freq: "52",
  lump_sum_contrib: "208",
  lump_sum_freq: "0",
  kiwisaver_value: "0",
  kiwisaver_contribs: "2",
  employer_contrib: "2",
  iar: "1",
  result_income_freq: 1,
  expected: {
    life_expectancy: 85,
    retirement_income: 3031,
    retirement_lump_sum: 42687,
    super_age: 65,
    years_3: 3277,
    years_5: 6061
  }
};
var testObj10 = {
  monthborn: "10",
  year_born: "1980",
  life_expectancy: "82",
  employment_status: "2",
  salary: "50000",
  has_kiwisaver: "0",
  joined_year: "",
  joined_month: "_none",
  kiwisaver_contribs_self: "0",
  contrib_freq: "52",
  lump_sum_contrib: "20",
  lump_sum_freq: "52",
  kiwisaver_value: "0",
  kiwisaver_contribs: "8",
  employer_contrib: "4",
  iar: "1",
  result_income_freq: 1,
  expected: {
    life_expectancy: 82,
    retirement_income: 34208,
    retirement_lump_sum: 446780,
    super_age: 65,
    years_3: 22326,
    years_5: 40522
  }
};
var testObj11 = {
  year_born: "1990",
  monthborn: "7",
  life_expectancy: "79",
  employment_status: "2",
  salary: "50000",
  has_kiwisaver: "0",
  joined_year: "",
  joined_month: "_none",
  kiwisaver_contribs_self: "99999",
  contrib_freq: "12",
  lump_sum_contrib: "10",
  lump_sum_freq: "52",
  kiwisaver_value: "0",
  kiwisaver_contribs: "3",
  employer_contrib: "0",
  iar: "1",
  result_income_freq: 1,
  expected: {
    life_expectancy: 79,
    retirement_income: 20550,
    retirement_lump_sum: 230563,
    super_age: 65,
    years_3: 6693,
    years_5: 12309
  }
};
var testObj12 = {
  year_born: "1944",
  monthborn: "4",
  life_expectancy: "85",
  employment_status: "2",
  salary: "25000",
  has_kiwisaver: "1",
  joined_year: "2007",
  joined_month: "11",
  kiwisaver_contribs_self: "0",
  contrib_freq: "26",
  lump_sum_contrib: "0",
  lump_sum_freq: "0",
  kiwisaver_value: "12000",
  kiwisaver_contribs: "4",
  employer_contrib: "2",
  iar: "1",
  result_income_freq: 1,
  expected: {
    life_expectancy: undefined,
    retirement_income: undefined,
    retirement_lump_sum: undefined,
    super_age: undefined,
    years_3: undefined,
    years_5: undefined
  }
};
var testObj13 = {
  year_born: "1946",
  monthborn: "4",
  life_expectancy: "85",
  employment_status: "2",
  salary: "25000",
  has_kiwisaver: "1",
  joined_year: "2007",
  joined_month: "11",
  kiwisaver_contribs_self: "0",
  contrib_freq: "26",
  lump_sum_contrib: "0",
  lump_sum_freq: "0",
  kiwisaver_value: "12000",
  kiwisaver_contribs: "4",
  employer_contrib: "2",
  iar: "1",
  result_income_freq: 1,
  expected: {
    life_expectancy: undefined,
    retirement_income: undefined,
    retirement_lump_sum: undefined,
    super_age: undefined,
    years_3: undefined,
    years_5: undefined
  }
};
var testObj14 = {
  year_born: "1952",
  monthborn: "4",
  life_expectancy: "85",
  employment_status: "2",
  salary: "25000",
  has_kiwisaver: "1",
  joined_year: "2007",
  joined_month: "11",
  kiwisaver_contribs_self: "0",
  contrib_freq: "26",
  lump_sum_contrib: "0",
  lump_sum_freq: "0",
  kiwisaver_value: "12000",
  kiwisaver_contribs: "4",
  employer_contrib: "2",
  iar: "1",
  result_income_freq: 1,
  expected: {
    life_expectancy: 85,
    retirement_income: 1639,
    retirement_lump_sum: 23089,
    super_age: 65,
    years_3: false,
    years_5: false
  }
};
var testmode = false, i;
if (testmode === true) {
  (function ($) {
    'use strict';
    $(document).ready(function () {
      $('html').append("<h1>TESTMODE</h1>").append("<input id='calculate-test' type='button' value='test calc' />");
    });
    function testCalcLogic() {
      var test = new SortedCalculator_KiwiSaver(), results = {}, candidate, i, str, mode;
      mode = 'all';
      if (mode === 'one') {
        candidate = testObj1;
        results = test.calculate(candidate, true);
        console.debug = true;
        if(debug) console.log('><><><><> INPUT <><><><><');
        if(debug) console.dir(candidate);
        if(debug) console.log('><><><><> OUTPUT <><><><><');
        if(debug) console.dir(results);
        console.debug = false;
      } else {
        for (i = 1; i <= 14; i += 1) {
          candidate = window['testObj' + i];
          results[i] = test.calculate(candidate, true);
          str = "<div style='padding: 40px; background: #eee; color:#333; font-family: verdana;'><a name='testresults" + i + "'></a><h2>Test Case " + i + "</h2>";
          if (results[i].life_expectancy === candidate.expected.life_expectancy) {
            str += "<p>Life Expectancy: <span style='color:green'>PASS</span> " + candidate.expected.life_expectancy + "</p>";
          } else {
            str += "<p>Life Expectancy: <span style='color:red'>FAIL</span> " + results[i].life_expectancy + ' != ' + candidate.expected.life_expectancy + "</p>";
          }
          if (results[i].retirement_lump_sum === candidate.expected.retirement_lump_sum) {
            str += "<p>Retirement Lump Sum: <span style='color:green'>PASS</span> " + candidate.expected.retirement_lump_sum + "</p>";
          } else {
            str += "<p>Retirement Lump Sum: <span style='color:red'>FAIL</span> " + results[i].retirement_lump_sum + ' != ' + candidate.expected.retirement_lump_sum + "</p>";
          }
          if (results[i].retirement_income === candidate.expected.retirement_income) {
            str += "<p>Retirement Income: <span style='color:green'>PASS</span> " + candidate.expected.retirement_income + "</p>";
          } else {
            str += "<p>Retirement Income: <span style='color:red'>FAIL</span> " + results[i].retirement_income + ' != ' + candidate.expected.retirement_income + "</p>";
          }
          str += "</div>";
          $('html').append(str);
          console.debug = true;
          if(debug) console.log('><><><><> INPUT ' + i + ' <><><><><');
          if(debug) console.dir(candidate);
          if(debug) console.log('><><><><> OUTPUT ' + i + ' <><><><><');
          if(debug) console.dir(results);
          console.debug = false;
        }
        window.location = window.location + "#testresults" + (i - 1);
      }
    }

    $('#calculate-test').live("click", function () {
      testCalcLogic();
    });
  }(jQuery));
}
