/*! retirement.js */
var SortedCalculator_Retirement = SortedCalculator.extend({
  init: function() {
    'use strict';
    this._super();
    //console.debug = false;
  },
  ppy: function(val) {
    'use strict';
    if (parseInt(val, 10)) {
      if (val === 5) {
        return 0;
      }
      if (val === 4) {
        return 1;
      }
      if (val === 3) {
        return 12;
      }
      if (val === 2) {
        return 26;
      }
      if (val === 1) {
        return 52;
      }
    }
    return false;
  },
  test_mode: false,
  calculate: function(obj) {
    'use strict';
    if (this.test_mode) {
      //console.debug = true;
    }
    var work = {},
      results = {},
      a, b, c, span, today = new Date();
    //console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX " + today.toString('HH:mm:ss'));
    //console.log('______________Incoming Input Object______________________');
    //console.dir(obj);
    obj = {
      iar: (isNaN(parseInt(obj.iar, 10)) ? 0 : parseInt(obj.iar, 10)),
      live_on: (isNaN(parseInt(obj.live_on, 10)) ? null : parseInt(obj.live_on, 10)),
      lifestyle_freq: (isNaN(parseInt(obj.lifestyle_freq, 10)) ? null : parseInt(obj.lifestyle_freq, 10)),
      partner: (isNaN(parseInt(obj.partner, 10)) ? 0 : parseInt(obj.partner, 10)),
      partner_ks: (isNaN(parseInt(obj.partner_ks, 10)) ? 0 : parseInt(obj.partner_ks, 10)),
      partner_life_expectancy: (isNaN(parseInt(obj.partner_life_expectancy, 10)) ? null : parseInt(obj.partner_life_expectancy, 10)),
      partner_other_income: (isNaN(parseInt(obj.partner_other_income, 10)) ? 0 : parseInt(obj.partner_other_income, 10)),
      partner_other_schemes: (isNaN(parseInt(obj.partner_other_schemes, 10)) ? 0 : parseInt(obj.partner_other_schemes, 10)),
      partner_retire_age: (isNaN(parseInt(obj.partner_retire_age, 10)) ? null : parseInt(obj.partner_retire_age, 10)),
      partner_gender: (isNaN(parseInt(obj.partner_gender, 10)) ? null : parseInt(obj.partner_gender, 10)),
      partner_month_born: (isNaN(parseInt(obj.partner_month_born, 10)) ? null : parseInt(obj.partner_month_born, 10)),
      partner_super: (isNaN(parseInt(obj.partner_super, 10)) ? 0 : parseInt(obj.partner_super, 10)),
      partner_year_born: (isNaN(parseInt(obj.partner_year_born, 10)) ? null : parseInt(obj.partner_year_born, 10)),
      your_gender: (isNaN(parseInt(obj.your_gender, 10)) ? null : parseInt(obj.your_gender, 10)),
      your_ks: (isNaN(parseInt(obj.your_ks, 10)) ? 0 : parseInt(obj.your_ks, 10)),
      your_life_expectancy: (isNaN(parseInt(obj.your_life_expectancy, 10)) ? null : parseInt(obj.your_life_expectancy, 10)),
      your_month_born: (isNaN(parseInt(obj.your_month_born, 10)) ? null : parseInt(obj.your_month_born, 10)),
      your_other_income: (isNaN(parseInt(obj.your_other_income, 10)) ? 0 : parseInt(obj.your_other_income, 10)),
      your_other_schemes: (isNaN(parseInt(obj.your_other_schemes, 10)) ? 0 : parseInt(obj.your_other_schemes, 10)),
      your_retire_age: (isNaN(parseInt(obj.your_retire_age, 10)) ? null : parseInt(obj.your_retire_age, 10)),
      your_super: (isNaN(parseInt(obj.your_super, 10)) ? 0 : parseInt(obj.your_super, 10)),
      your_year_born: (isNaN(parseInt(obj.your_year_born, 10)) ? null : parseInt(obj.your_year_born, 10)),
      required_savings_freq: (isNaN(parseInt(obj.required_savings_freq, 10)) ? null : parseInt(obj.required_savings_freq, 10))
    };
    //console.log('______________Cleaned Input Object______________________');
    //console.dir(obj);
    work.i10 = 0.024;
    work.i11 = constants.inflation_rate;
    work.a3 = obj.partner;
    work.your_dob = null;
    if (obj.your_month_born !== null && obj.your_year_born !== null) {
      work.your_dob = Date.parse('15-' + obj.your_month_born + '-' + obj.your_year_born);
      if (work.your_dob !== null) {
        work.your_dob.setHours(0, 0, 0);
      }
    }
    work.partner_dob = null;
    if (obj.partner === 1 && obj.partner_month_born !== null && obj.partner_year_born) {
      work.partner_dob = Date.parse('15-' + obj.partner_month_born + '-' + obj.partner_year_born);
      if (work.partner_dob !== null) {
        work.partner_dob.setHours(0, 0, 0);
      }
    }
    work.your_age = null;
    if (work.your_dob !== null) {
      b = Date.today();
      b.setHours(0, 0, 0);
      span = new TimeSpan(b - work.your_dob);
      work.your_age = (span.getDays() / 365.25);
      //console.log("My Age: " + work.your_age);
      //console.log("My Age in days: " + span.getDays());
    }
    work.partner_age = null;
    if (work.partner_dob !== null) {
      b = Date.today();
      b.setHours(0, 0, 0);
      span = new TimeSpan(b - work.partner_dob);
      work.partner_age = (span.getDays() / 365.25);
      //console.log("Partners Age: " + work.partner_age);
      //console.log("Partners Age in days: " + span.getDays());
    }
    work.your_retire_age = obj.your_retire_age;
    work.your_life_expectancy = obj.your_life_expectancy;
    work.h33 = null;
    if (work.your_age !== null) {
      work.h33 = 65 - work.your_age;
    }
    work.h34 = null;
    if (work.your_retire_age !== null && work.your_age !== null) {
      work.h34 = Math.max(0, work.your_retire_age - work.your_age);
    }
    work.h35 = null;
    if (work.your_life_expectancy !== null && work.your_age !== null) {
      work.h35 = work.your_life_expectancy - work.your_age;
    }
    if (obj.partner === 1) {
      if (obj.your_super === 1 && obj.partner_super === 1) {
        work.c13 = (constants.nz_super_married * 2) / obj.lifestyle_freq;
        work.h39 = constants.nz_super_married / obj.lifestyle_freq;
        work.i39 = constants.nz_super_married / obj.lifestyle_freq;
      } else if (obj.your_super === 1) {
        work.c13 = constants.nz_super_ineligible_partner / obj.lifestyle_freq;
        work.h39 = constants.nz_super_ineligible_partner / obj.lifestyle_freq;
        work.i39 = 0;
      } else if (obj.partner_super === 1) {
        work.c13 = constants.nz_super_ineligible_partner / obj.lifestyle_freq;
        work.h39 = 0;
        work.i39 = constants.nz_super_ineligible_partner / obj.lifestyle_freq;
      } else {
        work.c13 = 0;
        work.h39 = 0;
        work.i39 = 0;
      }
    } else {
      if (obj.your_super === 1) {
        work.c13 = constants.nz_super_single / obj.lifestyle_freq;
        work.h39 = constants.nz_super_single / obj.lifestyle_freq;
        work.i39 = 0;
      } else {
        work.c13 = 0;
        work.h39 = 0;
        work.i39 = 0;
      }
    }
    work.your_other_income = obj.your_other_income;
    work.total_super = work.h39;
    work.total_kiwisaver = work.your_kiwisaver;
    work.total_other_schemes = work.h41;
    work.total_other_income = work.your_other_income;
    work.i33 = null;
    if (work.a3 === 1) {
      if (work.partner_age !== null) {
        work.i33 = 65 - work.partner_age;
      }
      work.partner_retire_age = obj.your_retire_age;
      work.partner_life_expectancy = obj.partner_life_expectancy;
      work.i34 = null;
      if (work.partner_age !== null && obj.partner_Retire_age !== null) {
        work.i34 = obj.partner_retire_age - work.partner_age;
      }
      work.i35 = null;
      if (work.i33 !== null) {
        work.i35 = work.partner_life_expectancy - work.partner_age;
      }
      work.partner_kiwisaver = obj.partner_ks;
      work.total_kiwisaver = null;
      if (work.your_kiwisaver !== null && work.partner_kiwisaver !== null) {
        work.total_kiwisaver = Number(work.your_kiwisaver) + Number(work.partner_kiwisaver);
      }
      work.partner_other_schemes = Number(obj.partner_other_schemes);
      work.total_other_schemes = null;
      if (work.h41 !== null && work.partner_other_schemes !== null) {
        work.total_other_schemes = work.h41 + work.partner_other_schemes;
      }
      work.partner_other_income = obj.partner_other_income;
      work.total_other_income = null;
      if (work.your_other_income !== null && work.partner_other_income !== null) {
        work.total_other_income = Number(work.your_other_income) + Number(work.partner_other_income);
      }
    }
    work.d41 = null;
    if (work.partner_age === 0 || work.partner_age === null) {
      a = 65;
    } else {
      a = work.partner_age;
    }
    if ((65 - work.your_age) < (65 - a)) {
      work.d41 = 1;
    } else {
      work.d41 = 2;
    }
    work.c12 = null;
    if (obj.live_on !== null && work.c13 !== null) {
      work.c12 = Math.max(obj.live_on, work.c13);
    }
    work.other_sources = null;
    if (work.c12 !== null && work.h39 !== null) {
      work.other_sources = work.c12 - work.h39;
    }
    work.c18 = constants.desired_nz_super_freq;
    work.c18ppy = this.ppy(work.c18);
    work.c20 = constants.expected_kiwisaver_freq;
    work.c21 = constants.expected_kiwisaver_freq;
    work.c23 = constants.your_expected_other_schemes_freq;
    work.c23ppy = this.ppy(work.c23);
    work.c24 = constants.partners_expected_other_schemes_freq;
    work.c24ppy = this.ppy(work.c24);
    work.c26 = constants.your_expected_other_income_freq;
    work.c26ppy = this.ppy(work.c26);
    work.c27 = constants.partners_expected_other_income_freq;
    work.c27ppy = this.ppy(work.c27);
    work.d48 = obj.iar;
    work.c33 = 0;
    work.c34 = null;
    if (work.h33 !== null && work.h34 !== null) {
      work.c34 = Math.max(0, (work.h33 - work.h34));
    }
    work.c35 = null;
    if (work.h35 !== null && work.h34 !== null && work.c34 !== null) {
      work.c35 = Math.max(0, (work.h35 - work.h34 - work.c34));
    }
    if (work.a3 === 1) {
      if (work.your_age !== null && work.i33 !== null && work.your_retire_age !== null && work.partner_retire_age !== null) {
        work.c33 = Math.max(0, (Math.min(65 - work.your_age, 65 - work.i33) - Math.min((work.your_retire_age - work.your_age), (work.partner_retire_age - work.i33))));
      }
      if (work.h33 !== null && work.i33 !== null && work.h34 !== null && work.i34 !== null && work.c33 !== null) {
        work.c34 = (Math.max(0, (Math.max(work.h33, work.i33) - Math.min(work.h34, work.i34))) - work.c33);
      }
      if (work.h35 !== null && work.i35 !== null && work.h34 !== null && work.i34 !== null && work.c33 !== null && work.c34 !== null) {
        work.c35 = Math.max(work.h35, work.i35) - Math.min(work.h34, work.i34) - (work.c33 + work.c34);
      }
    }
    work.c36 = null;
    if (work.c33 !== null && work.c34 !== null && work.c35 !== null) {
      work.c36 = work.c33 + work.c34 + work.c35;
    }
    work.e20 = null;
    if (work.h35 !== null && work.h33 !== null && work.h34 !== null) {
      work.e20 = work.h35 - (Math.max(work.h33, work.h34));
    }
    work.e21 = null;
    if (work.a3 === 1) {
      work.e20 = null;
      if (work.h35 !== null && work.i35 !== null && work.h33 !== null && work.h34 !== null) {
        work.e20 = (Math.max(work.h35, work.i35) - Math.max(work.h33, work.h34));
      }
      work.e21 = null;
      if (work.h35 !== null && work.i35 !== null && work.i33 !== null && work.i34 !== null) {
        work.e21 = (Math.max(work.h35, work.i35) - Math.max(work.i33, work.i34));
      }
    }
    work.d20 = null;
    if (work.c20 === 5) {
      a = null;
      b = null;
      c = null;
      if (work.i10 !== null && work.e20 !== null) {
        a = (1 - (Math.pow((1 + work.i10), (-work.e20))));
      }
      if (work.i10 !== null && obj.lifestyle_freq !== null) {
        b = ((Math.pow((1 + work.i10), (1 / obj.lifestyle_freq))) - 1);
      }
      if (a !== null && b !== null && b !== 0) {
        c = a / b;
      }
      work.d20 = null;
      if (c !== null && c !== 0) {
        work.d20 = 1 / c;
      }
    } else {
      work.d20 = work.c20;
    }
    work.d21 = null;
    if (work.a3 === 1) {
      a = null;
      b = null;
      c = null;
      if (Number(work.c21) === 5) {
        if (work.i10 !== null && work.e21 !== null) {
          a = (1 - (Math.pow((1 + work.i10), (-work.e21))));
        }
        if (work.i10 !== null && obj.lifestyle_freq !== null) {
          b = ((Math.pow((1 + work.i10), (1 / obj.lifestyle_freq))) - 1);
        }
        if (a !== null && b !== null && b !== 0) {
          c = a / b;
        }
        if (c !== null && c !== 0) {
          work.d21 = 1 / c;
        }
      } else {
        work.d21 = work.c20;
      }
    }
    work.d23 = null;
    if (work.c23 === 5) {
      a = null;
      b = null;
      c = null;
      if (work.i10 !== null && work.c36 !== null) {
        a = (1 - (Math.pow((1 + work.i10), (-work.c36))));
      }
      if (work.i10 !== null && obj.lifestyle_freq !== null) {
        b = ((Math.pow((1 + work.i10), (1 / obj.lifestyle_freq))) - 1);
      }
      if (a !== null && b !== null && b !== 0) {
        c = a / b;
      }
      if (c !== null && c !== 0) {
        work.d23 = 1 / c;
      }
    } else {
      if (work.c23ppy !== null && obj.lifestyle_freq !== null) {
        work.d23 = work.c23ppy / obj.lifestyle_freq;
      }
    }
    work.d24 = null;
    if (work.c24 === 5) {
      a = null;
      b = null;
      c = null;
      if (work.i10 !== null && work.c36 !== null) {
        a = (1 - (Math.pow((1 + work.i10), (-work.c36))));
      }
      if (work.i10 !== null && obj.lifestyle_freq !== null) {
        b = ((Math.pow((1 + work.i10), (1 / obj.lifestyle_freq))) - 1);
      }
      if (a !== null && b !== null && b !== 0) {
        c = a / b;
      }
      if (c !== null && c !== 0) {
        work.d24 = 1 / c;
      }
    } else {
      if (work.c24ppy !== null && obj.lifestyle_freq !== null) {
        work.d24 = work.c24ppy / obj.lifestyle_freq;
      }
    }
    work.d26 = null;
    if (work.c26 === 5) {
      a = null;
      b = null;
      c = null;
      if (work.i10 !== null && work.c36 !== null) {
        a = (1 - (Math.pow((1 + work.i10), (-work.c36))));
      }
      if (work.i10 !== null && obj.lifestyle_freq !== null) {
        b = ((Math.pow((1 + work.i10), (1 / obj.lifestyle_freq))) - 1);
      }
      if (a !== null && b !== null && b !== 0) {
        c = a / b;
      }
      if (c !== null && c !== 0) {
        work.d26 = 1 / c;
      }
    } else {
      if (work.c26ppy !== null && obj.lifestyle_freq !== null) {
        work.d26 = work.c26ppy / obj.lifestyle_freq;
      }
    }
    work.d27 = null;
    if (work.c27 === 5) {
      a = null;
      b = null;
      c = null;
      if (work.i10 !== null && work.c36 !== null) {
        a = (1 - (Math.pow((1 + work.i10), (-work.c36))));
      }
      if (work.i10 !== null && obj.lifestyle_freq !== null) {
        b = ((Math.pow((1 + work.i10), (1 / obj.lifestyle_freq))) - 1);
      }
      if (a !== null && b !== null && b !== 0) {
        c = a / b;
      }
      if (c !== null && c !== 0) {
        work.d27 = 1 / c;
      }
    } else {
      if (work.c27ppy !== null && obj.lifestyle_freq !== null) {
        work.d27 = work.c27ppy / obj.lifestyle_freq;
      }
    }
    work.h40 = null;
    if (obj.your_ks !== null && work.d20 !== null) {
      work.h40 = obj.your_ks * work.d20;
    }
    work.h41 = null;
    if (obj.your_other_schemes !== null && work.d23 !== null) {
      work.h41 = obj.your_other_schemes * work.d23;
    }
    work.h42 = null;
    if (obj.your_other_income !== null && work.d26 !== null) {
      work.h42 = obj.your_other_income * work.d26;
    }
    work.i40 = 0;
    if (obj.partner_ks !== null && work.d21 !== null && work.a3 !== null) {
      work.i40 = (obj.partner_ks * work.d21) * work.a3;
    }
    work.i41 = null;
    if (obj.partner_other_schemes !== null && work.d24 !== null && work.a3 !== null) {
      work.i41 = (obj.partner_other_schemes * work.d24) * work.a3;
    }
    work.i42 = null;
    if (obj.partner_other_income !== null && work.d27 !== null && work.a3 !== null) {
      work.i42 = (obj.partner_other_income * work.d27) * work.a3;
    }
    work.j39 = null;
    if (work.h39 !== null && work.i39 !== null) {
      work.j39 = work.h39 + work.i39;
    }
    work.j40 = null;
    if (work.h40 !== null && work.i40 !== null) {
      work.j40 = work.h40 + work.i40;
    }
    work.j41 = null;
    if (work.h41 !== null && work.i41 !== null) {
      work.j41 = work.h41 + work.i41;
    }
    work.j42 = null;
    if (work.h42 !== null && work.i42 !== null) {
      work.j42 = work.h42 + work.i42;
    }
    work.c40 = 0;
    if (work.c33 !== null && work.c33 > 0) {
      if (work.c12 !== null && work.j41 !== null && work.j42 !== null) {
        work.c40 = work.c12 - (work.j41 + work.j42);
      }
    }
    work.c41 = null;
    if (work.c34 !== null) {
      if (work.c34 === 0) {
        work.c41 = 0;
      } else {
        a = null;
        if (work.d41 === 1) {
          if (work.h39 !== null && work.h40 !== null) {
            a = work.h39 + work.h40;
          }
        } else {
          if (work.i39 !== null && work.i40 !== null) {
            a = work.i39 + work.i40;
          }
        }
        work.c41 = null;
        if (work.c34 !== null && work.c34 > 0) {
          if (obj.live_on !== null && work.j41 !== null && work.j42 !== null && a !== null) {
            work.c41 = obj.live_on - ((work.j41 + work.j42) + a);
          }
        }
      }
    }
    work.c42 = null;
    if (work.c35 !== null) {
      if (work.c35 === 0) {
        work.c42 = 0;
      } else {
        if (obj.live_on !== null && work.j39 !== null && work.j40 !== null && work.j41 !== null && work.j42 !== null) {
          work.c42 = obj.live_on - this.sum_array([work.j39, work.j40, work.j41, work.j42]);
        }
      }
    }
    work.c44 = null;
    if (work.i10 !== null && work.c33 !== null && work.i10 !== null && work.c40 !== null && work.i10 !== 0) {
      work.c44 = (1 - Math.pow((1 + work.i10), (-work.c33))) / (Math.pow((1 + work.i10), (1 / obj.lifestyle_freq)) - 1) * work.c40;
    }
    work.c45 = null;
    if (work.i10 !== null && work.c34 !== null && work.i10 !== null && work.c41 !== null && work.c33 !== null && work.i10 !== 0 && Math.pow(1 + work.i10, work.c33) !== 0) {
      work.c45 = ((1 - Math.pow((1 + work.i10), -(work.c34))) / (Math.pow((1 + work.i10), (1 / obj.lifestyle_freq)) - 1) * work.c41) / Math.pow(1 + work.i10, work.c33);
    }
    work.c46 = null;
    if (work.i10 !== null && work.c35 !== null && work.c42 !== null && work.c33 !== null && work.c34 !== null) {
      if (work.i10 !== 0 && Math.pow((1 + work.i10), (work.c33 + work.c34)) !== 0) {
        work.c46 = (((1 - Math.pow((1 + work.i10), -(work.c35))) / (Math.pow((1 + work.i10), (1 / obj.lifestyle_freq)) - 1)) * work.c42) / Math.pow((1 + work.i10), (work.c33 + work.c34));
      }
    }
    work.c47 = null;
    if (work.c44 !== null && work.c45 !== null && work.c46 !== null) {
      work.c47 = Math.max(0, work.c44) + Math.max(0, work.c45) + Math.max(0, work.c46);
    }
    work.c50 = work.h34;
    if (work.a3 === 1) {
      if (work.h34 !== null && work.i34 !== null) {
        work.c50 = Math.min(work.h34, work.i34);
      }
    }
    work.c48 = null;
    if (work.c47 !== null && work.i11 !== null && work.c50 !== null) {
      work.c48 = work.c47 * (Math.pow((1 + work.i11), work.c50));
    }
    work.c51 = 1;
    if (obj.required_savings_freq !== null) {
      work.c51 = obj.required_savings_freq;
    }
    work.c52 = null;
    if (work.c48 !== null && work.i10 !== null && work.i11 !== null && work.c50 !== null && work.c51 !== null && work.c50 > 0) {
      work.c52 = work.c48 / ((Math.pow((1 + work.i10 + work.i11), work.c50) - 1) / (Math.pow((1 + work.i10 + work.i11), (1 / work.c51)) - 1));
    }
    work.difference = work.c48;
    if (work.d48 === 1) {
      work.difference = work.c47;
    }
    work.shortfall_under_65 = null;
    if (work.a3 === 0) {
      if (work.c34 === 0) {
        if (work.c42 !== null) {
          work.shortfall_under_65 = 0;
          work.shortfall_over_65 = -work.c42;
        }
      } else {
        if (work.c41 !== null) {
          if (work.c41 !== null) {
            work.shortfall_under_65 = -work.c41;
            work.shortfall_over_65 = -work.c42;
          }
        }
      }
    } else {
      if (work.c33 === 0 && work.c34 === 0) {
        if (work.c42 !== null) {
          work.shortfall_under_65 = 0;
          work.shortfall_over_65 = -work.c42;
        }
      } else {
        if (work.c33 > 0 && work.c34 > 0) {
          if (work.c40 !== null) {
            work.shortfall_under_65 = -work.c40;
            work.shortfall_over_65 = -work.c42;
          }
        } else if (work.c33 > 0 && work.c34 === 0) {
          if (work.c40 !== null) {
            work.shortfall_under_65 = -work.c41;
            work.shortfall_over_65 = -work.c42;
          }
        } else {
          if (work.c41 !== null) {
            work.shortfall_under_65 = -work.c41;
            work.shortfall_over_65 = -work.c42;
          }
        }
      }
    }
    work.c14 = null;
    if (work.c12 !== null && work.c13 !== null) {
      work.c14 = work.c12 - work.c13;
    }
    //console.log('a3 ' + work.a3);
    //console.log('c12 ' + work.c12);
    //console.log('c13 ' + work.c13);
    //console.log('c14 ' + work.c14);
    //console.log('c18 ' + work.c18);
    //console.log('c18ppy ' + work.c18ppy);
    //console.log('c20 ' + work.c20);
    //console.log('c21 ' + work.c21);
    //console.log('c23: ' + work.c23);
    //console.log('c23ppy: ' + work.c23ppy);
    //console.log('c24: ' + work.c24);
    //console.log('c24ppy: ' + work.c24ppy);
    //console.log('c26: ' + work.c26);
    //console.log('c27: ' + work.c27);
    //console.log('c33: ' + work.c33);
    //console.log('c34: ' + work.c34);
    //console.log('c35: ' + work.c35);
    //console.log('c36: ' + work.c36);
    //console.log('c40: ' + work.c40);
    //console.log('c41: ' + work.c41);
    //console.log('c42: ' + work.c42);
    //console.log('c44: ' + work.c44);
    //console.log('c45: ' + work.c45);
    //console.log('c46: ' + work.c46);
    //console.log('c47: ' + work.c47);
    //console.log('c48: ' + work.c48);
    //console.log('c50: ' + work.c50);
    //console.log('c51: ' + work.c51);
    //console.log('c52: ' + work.c52);
    //console.log('d20: ' + work.d20);
    //console.log('d21: ' + work.d21);
    //console.log('d23: ' + work.d23);
    //console.log('d24: ' + work.d24);
    //console.log('d26: ' + work.d26);
    //console.log('d27: ' + work.d27);
    //console.log('d41: ' + work.d41);
    //console.log('e20: ' + work.e20);
    //console.log('e21: ' + work.e21);
    //console.log('h33: ' + work.h33);
    //console.log('h34: ' + work.h34);
    //console.log('h35: ' + work.h35);
    //console.log('h39: ' + work.h39);
    //console.log('h40: ' + work.h40);
    //console.log('h41: ' + work.h41);
    //console.log('h42: ' + work.h42);
    //console.log('i10: ' + work.i10);
    //console.log('i11: ' + work.i11);
    //console.log('i33: ' + work.i33);
    //console.log('i34: ' + work.i34);
    //console.log('i35: ' + work.i35);
    //console.log('i39: ' + work.i39);
    //console.log('i40: ' + work.i40);
    //console.log('i41: ' + work.i41);
    //console.log('i42: ' + work.i42);
    //console.log('j39: ' + work.j39);
    //console.log('j40: ' + work.j40);
    //console.log('j41: ' + work.j41);
    //console.log('j42: ' + work.j42);
    results.shortfall_pre_65 = null;
    if (work.shortfall_under_65 !== null) {
      results.shortfall_pre_65 = this.round(work.shortfall_under_65, 0);
    }
    results.shortfall_post_65 = null;
    if (work.shortfall_over_65 !== null) {
      results.shortfall_post_65 = this.round(work.shortfall_over_65, 0);
    }
    results.amount_total = null;
    if (work.difference !== null) {
      results.amount_total = this.round(work.difference, 0);
    }
    results.deficit_lump_amount = null;
    if (work.c52 !== null) {
      results.deficit_lump_amount = this.round(work.c52, 0);
    }
    results.retirement_income = null;
    if (work.j39 !== null && work.j40 !== null && work.j41 !== null && work.j42 !== null) {
      results.retirement_income = this.round(this.sum_array([work.j39, work.j40, work.j41, work.j42]), 0);
    }
    results.desired_retirement_income = null;
    if (obj.live_on !== null) {
      results.desired_retirement_income = this.round(obj.live_on, 0);
    }
    results.income_nz_superannuation = null;
    if (work.j39 !== null) {
      results.income_nz_superannuation = this.round(work.j39, 0);
    }
    results.income_kiwisaver_lump_sum = null;
    if (work.j40 !== null) {
      results.income_kiwisaver_lump_sum = this.round(work.j40, 0);
    }
    results.income_other_lump_sums = null;
    if (work.j41 !== null) {
      results.income_other_lump_sums = this.round(work.j41, 0);
    }
    results.income_other_income_sources = null;
    if (work.j42 !== null) {
      results.income_other_income_sources = this.round(work.j42, 0);
    }
    results.years_till_retire = null;
    if (work.i34 || work.h34) {
      if (work.i34 && work.h34) {
        results.years_till_retire = Math.min(work.i34, work.h34);
      } else {
        if (work.i34) {
          results.years_till_retire = work.i34;
        } else if (work.h34) {
          results.years_till_retire = work.h34;
        }
      }
    }
    //console.log('______________Returned Output Object______________________');
    //console.log('c52: ' + work.c52);
    //console.log('results.deficit: ' + results.deficit_lump_amount);
    //console.dir(results);
    results.deficit_lump_backup = results.deficit_lump_amount;
    return results;
  }
});
var testmode = false;
var testObj1 = {
  your_gender: 2,
  your_month_born: 6,
  your_year_born: 1977,
  your_retire_age: 62,
  your_life_expectancy: 85,
  live_on: 48000,
  partner: 1,
  partner_gender: 1,
  partner_month_born: 6,
  partner_year_born: 1977,
  partner_retire_age: 62,
  partner_life_expectancy: 90,
  your_super: 1,
  your_ks: 10000,
  your_other_schemes: 20000,
  your_other_income: 10000,
  partner_super: 1,
  partner_ks: 300000,
  partner_other_schemes: 23,
  partner_other_income: 1222,
  iar: 0,
  bridge_freq: 52,
  lifestyle_freq: 1,
  required_savings_freq: 52,
  expected: {
    shortfall_post_65: 10217,
    shortfall_pre_65: 0,
    amount_total: 171964,
    deficit_lump_amount: 58,
    desired_retirement_income: 48000,
    retirement_income: 58217,
    income_nz_superannuation: 27914,
    income_kiwisaver_lump_sum: 18002,
    income_other_lump_sums: 1080,
    income_other_income_sources: 11222
  }
};
var testObj2 = {
  your_gender: 2,
  your_month_born: 6,
  your_year_born: 1977,
  your_retire_age: 62,
  your_life_expectancy: 85,
  live_on: 48000,
  partner: 0,
  partner_ks: "",
  partner_life_expectancy: "",
  partner_other_income: "",
  partner_other_schemes: "",
  partner_retire_age: "",
  partner_gender: "",
  partner_month_born: "",
  partner_super: "",
  partner_year_born: "",
  your_ks: 10000,
  your_other_income: 10000,
  your_other_schemes: 20000,
  your_super: 1,
  iar: 1,
  required_savings_freq: 52,
  lifestyle_freq: 1,
  bridge_freq: 52,
  expected: {
    amount_total: 345236,
    deficit_lump_amount: 199,
    desired_retirement_income: 48000,
    income_kiwisaver_lump_sum: 678,
    income_nz_superannuation: 18144,
    income_other_income_sources: 10000,
    income_other_lump_sums: 1229,
    retirement_income: 30051,
    shortfall_post_65: -17949,
    shortfall_pre_65: -36771
  }
};
var testObj3 = {
  live_on: 20000,
  your_life_expectancy: 85,
  your_gender: 2,
  your_month_born: 6,
  your_year_born: 1977,
  your_retire_age: 62,
  partner: 0,
  partner_ks: "",
  partner_life_expectancy: "",
  partner_other_income: "",
  partner_other_schemes: "",
  partner_retire_age: "",
  partner_gender: "",
  partner_month_born: "",
  partner_super: "",
  partner_year_born: "",
  your_ks: 10000,
  your_other_income: 10000,
  your_other_schemes: 20000,
  your_super: 1,
  iar: 1,
  required_savings_freq: 52,
  lifestyle_freq: 1,
  bridge_freq: 12,
  expected: {
    amount_total: 24762,
    deficit_lump_amount: 14,
    desired_retirement_income: 20000,
    income_kiwisaver_lump_sum: 678,
    income_nz_superannuation: 18144,
    income_other_income_sources: 10000,
    income_other_lump_sums: 1229,
    retirement_income: 30051,
    shortfall_post_65: 10051,
    shortfall_pre_65: -8771
  }
};
var testObj4 = {
  your_gender: 2,
  your_month_born: 6,
  your_year_born: 1947,
  your_retire_age: 65,
  your_life_expectancy: 82,
  live_on: 20800,
  partner: 0,
  partner_gender: "",
  partner_month_born: "",
  partner_year_born: "",
  partner_retire_age: "",
  partner_life_expectancy: "",
  your_super: 1,
  your_ks: 0,
  your_other_schemes: 0,
  your_other_income: 0,
  partner_super: "",
  partner_ks: "",
  partner_other_schemes: "",
  partner_other_income: "",
  iar: 1,
  bridge_freq: 12,
  lifestyle_freq: 1,
  required_savings_freq: 52,
  expected: {
    shortfall_post_65: -2656,
    shortfall_pre_65: 0,
    amount_total: 34663,
    deficit_lump_amount: null,
    desired_retirement_income: 20800,
    retirement_income: 18144,
    income_nz_superannuation: 18144,
    income_kiwisaver_lump_sum: 0,
    income_other_income_sources: 0,
    income_other_lump_sums: 0
  }
};
var testObj5 = {
  your_gender: 2,
  your_month_born: 6,
  your_year_born: 1947,
  your_retire_age: 65,
  your_life_expectancy: 82,
  live_on: 20800,
  partner: 0,
  partner_gender: "",
  partner_month_born: "",
  partner_year_born: "",
  partner_ks: "",
  partner_life_expectancy: "",
  partner_other_income: "",
  partner_other_schemes: "",
  partner_retire_age: "",
  partner_super: "",
  your_super: 1,
  your_ks: 0,
  your_other_schemes: 0,
  your_other_income: 0,
  iar: 1,
  bridge_freq: 12,
  lifestyle_freq: 1,
  required_savings_freq: 1,
  expected: {
    shortfall_post_65: -2656,
    shortfall_pre_65: 0,
    amount_total: 34663,
    deficit_lump_amount: null,
    desired_retirement_income: 20800,
    income_kiwisaver_lump_sum: 0,
    income_nz_superannuation: 18144,
    income_other_income_sources: 0,
    income_other_lump_sums: 0,
    retirement_income: 18144
  }
};
var testObj6 = {
  your_gender: 2,
  your_month_born: 6,
  your_year_born: 1947,
  your_retire_age: 35,
  your_life_expectancy: 82,
  live_on: 20800,
  partner: 0,
  partner_ks: "",
  partner_life_expectancy: "",
  partner_other_income: "",
  partner_other_schemes: "",
  partner_retire_age: "",
  partner_gender: "",
  partner_month_born: "",
  partner_super: "",
  partner_year_born: "",
  your_super: 1,
  your_ks: 0,
  your_other_schemes: 0,
  your_other_income: 0,
  iar: 1,
  bridge_freq: 12,
  lifestyle_freq: 1,
  required_savings_freq: 1,
  expected: {
    shortfall_pre_65: 0,
    shortfall_post_65: -2656,
    amount_total: 34663,
    deficit_lump_amount: null,
    desired_retirement_income: 20800,
    retirement_income: 18144,
    income_nz_superannuation: 18144,
    income_kiwisaver_lump_sum: 0,
    income_other_income_sources: 0,
    income_other_lump_sums: 0
  }
};
var testObj7 = {
  your_gender: 2,
  your_month_born: 6,
  your_year_born: 1947,
  your_retire_age: 35,
  your_life_expectancy: 82,
  live_on: 40000,
  partner: 0,
  partner_ks: "",
  partner_life_expectancy: "",
  partner_other_income: "",
  partner_other_schemes: "",
  partner_retire_age: "",
  partner_gender: "",
  partner_month_born: "",
  partner_super: "",
  partner_year_born: "",
  your_super: 1,
  your_ks: 0,
  your_other_schemes: 0,
  your_other_income: 0,
  iar: 1,
  bridge_freq: 12,
  lifestyle_freq: 1,
  required_savings_freq: 1,
  expected: {
    shortfall_pre_65: 0,
    shortfall_post_65: -21856,
    amount_total: 285221,
    deficit_lump_amount: null,
    desired_retirement_income: 40000,
    retirement_income: 18144,
    income_nz_superannuation: 18144,
    income_kiwisaver_lump_sum: 0,
    income_other_income_sources: 0,
    income_other_lump_sums: 0
  }
};
var testObj8 = {
  your_gender: 2,
  your_month_born: 10,
  your_year_born: 1980,
  your_retire_age: 60,
  your_life_expectancy: 82,
  live_on: 40000,
  partner: 1,
  partner_gender: "1",
  partner_month_born: "1",
  partner_year_born: "1985",
  partner_retire_age: "60",
  partner_life_expectancy: "85",
  your_super: 1,
  your_ks: 0,
  your_other_schemes: 0,
  your_other_income: 0,
  partner_super: "1",
  partner_ks: "",
  partner_other_schemes: "",
  partner_other_income: "",
  iar: 1,
  bridge_freq: 1,
  lifestyle_freq: 1,
  required_savings_freq: 1,
  expected: {
    shortfall_pre_65: -40000,
    shortfall_post_65: -12086,
    amount_total: 404782,
    deficit_lump_amount: 11704,
    desired_retirement_income: 40000,
    retirement_income: 27914,
    income_nz_superannuation: 27914,
    income_kiwisaver_lump_sum: 0,
    income_other_income_sources: 0,
    income_other_lump_sums: 0
  }
};
var testObj9 = {
  your_gender: 2,
  your_month_born: 10,
  your_year_born: 1980,
  your_retire_age: 60,
  your_life_expectancy: 82,
  live_on: 40000,
  partner: 1,
  partner_gender: "1",
  partner_month_born: "1",
  partner_year_born: "1985",
  partner_retire_age: "65",
  partner_life_expectancy: "85",
  your_super: 1,
  your_ks: 0,
  your_other_schemes: 0,
  your_other_income: 0,
  partner_super: "0",
  partner_ks: "",
  partner_other_schemes: "",
  partner_other_income: "",
  iar: 1,
  bridge_freq: 1,
  lifestyle_freq: 1,
  required_savings_freq: 1,
  expected: {
    shortfall_pre_65: -40000,
    shortfall_post_65: -13471,
    amount_total: 377783,
    deficit_lump_amount: 10924,
    desired_retirement_income: 40000,
    retirement_income: 26529,
    income_nz_superannuation: 26529,
    income_kiwisaver_lump_sum: 0,
    income_other_income_sources: 0,
    income_other_lump_sums: 0
  }
};
if (testmode === true) {
  (function($) {
    'use strict';
    $(document).ready(function() {
      $('html').append("<h1>TESTMODE</h1>").append("<input id='calculate-test' type='button' value='test calc' />");
    });

    function testCalcLogic() {
      var test = new SortedCalculator_Retirement(),
        mode, candidate, i, str, results;
      //console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX END');
      mode = 'all';
      if (mode === 'one') {
        candidate = testObj4;
        results = test.calculate(candidate);
        //console.debug = true;
        //console.dir(candidate);
        //console.log('><><><><> OUTPUT <><><><><');
        //console.dir(results);
        //console.debug = false;
      } else {
        results = {};
        for (i = 1; i <= 9; i += 1) {
          //console.log('>>>>>>>>>>>>> Test Case ' + i);
          candidate = window['testObj' + i];
          results[i] = test.calculate(candidate);
          str = "<div style='padding: 40px; background: #eee; color:#333; font-family: verdana;'><a name='testresults" + i + "'></a><h2>Test Case " + i + "</h2>";
          if (results[i].amount_total === candidate.expected.amount_total) {
            str += "<p>amount_total: <span style='color:green'>PASS</span></p>";
          } else {
            str += "<p>amount_total: <span style='color:red'>FAIL</span> " + results[i].amount_total + ' != ' + candidate.expected.amount_total + "</p>";
          }
          if (results[i].deficit_lump_amount === candidate.expected.deficit_lump_amount) {
            str += "<p>deficit_lump_amount: <span style='color:green'>PASS</span></p>";
          } else {
            str += "<p>deficit_lump_amount: <span style='color:red'>FAIL</span> " + results[i].deficit_lump_amount + ' != ' + candidate.expected.deficit_lump_amount + "</p>";
          }
          if (results[i].desired_retirement_income === candidate.expected.desired_retirement_income) {
            str += "<p>desired_retirement_income: <span style='color:green'>PASS</span></p>";
          } else {
            str += "<p>desired_retirement_income: <span style='color:red'>FAIL</span> " + results[i].desired_retirement_income + ' != ' + candidate.expected.desired_retirement_income + "</p>";
          }
          if (results[i].income_kiwisaver_lump_sum === candidate.expected.income_kiwisaver_lump_sum) {
            str += "<p>income_kiwisaver_lump_sum: <span style='color:green'>PASS</span></p>";
          } else {
            str += "<p>income_kiwisaver_lump_sum: <span style='color:red'>FAIL</span> " + results[i].income_kiwisaver_lump_sum + ' != ' + candidate.expected.income_kiwisaver_lump_sum + "</p>";
          }
          if (results[i].income_nz_superannuation === candidate.expected.income_nz_superannuation) {
            str += "<p>income_nz_superannuation: <span style='color:green'>PASS</span></p>";
          } else {
            str += "<p>income_nz_superannuation: <span style='color:red'>FAIL</span> " + results[i].income_nz_superannuation + ' != ' + candidate.expected.income_nz_superannuation + "</p>";
          }
          if (results[i].income_other_income_sources === candidate.expected.income_other_income_sources) {
            str += "<p>income_other_income_sources: <span style='color:green'>PASS</span></p>";
          } else {
            str += "<p>income_other_income_sources: <span style='color:red'>FAIL</span> " + results[i].income_other_income_sources + ' != ' + candidate.expected.income_other_income_sources + "</p>";
          }
          if (results[i].income_other_lump_sums === candidate.expected.income_other_lump_sums) {
            str += "<p>income_other_lump_sums: <span style='color:green'>PASS</span></p>";
          } else {
            str += "<p>income_other_lump_sums: <span style='color:red'>FAIL</span> " + results[i].income_other_lump_sums + ' != ' + candidate.expected.income_other_lump_sums + "</p>";
          }
          if (results[i].retirement_income === candidate.expected.retirement_income) {
            str += "<p>retirement_income: <span style='color:green'>PASS</span></p>";
          } else {
            str += "<p>retirement_income: <span style='color:red'>FAIL</span> " + results[i].retirement_income + ' != ' + candidate.expected.retirement_income + "</p>";
          }
          if (results[i].shortfall_post_65 === candidate.expected.shortfall_post_65) {
            str += "<p>shortfall_post_65: <span style='color:green'>PASS</span></p>";
          } else {
            str += "<p>shortfall_post_65: <span style='color:red'>FAIL</span> " + results[i].shortfall_post_65 + ' != ' + candidate.expected.shortfall_post_65 + "</p>";
          }
          if (results[i].shortfall_pre_65 === candidate.expected.shortfall_pre_65) {
            str += "<p>shortfall_pre_65: <span style='color:green'>PASS</span></p>";
          } else {
            str += "<p>shortfall_pre_65: <span style='color:red'>FAIL</span> " + results[i].shortfall_pre_65 + ' != ' + candidate.expected.shortfall_pre_65 + "</p>";
          }
          str += "</div>";
          $('html').append(str);
          //console.debug = true;
          //console.log('><><><><> INPUT ' + i + ' <><><><><');
          //console.dir(candidate);
          //console.log('><><><><> OUTPUT ' + i + ' <><><><><');
          //console.dir(results);
          //console.debug = false;
        }
        window.location = window.location + "#testresults" + (i - 1);
      }
    }
    $('#calculate-test').live("click", function() {
      testCalcLogic();
    });
  }(jQuery));
}
