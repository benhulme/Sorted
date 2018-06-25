/*! kiwisaver_fees.js */
var SortedCalculator_KiwiSaver_Fees = SortedCalculator.extend({
  ui: {},
  init: function() {
    'use strict';
    console.debug = true;
    //console.log('Welcome to the KiwiSaver Fees Calculator.');
    this._super();
    if (this.test_mode === true) {
      this.test_calc();
    }
  },
  test_mode: true,
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
  model: {},
  risk_profile: function(n) {
    'use strict';
    var rp = 5;
    n = parseFloat(n);
    if (n < 0.90) {
      rp = 4;
    }
    if (n < 0.70) {
      rp = 3;
    }
    if (n < 0.50) {
      rp = 2;
    }
    if (n < 0.30) {
      rp = 1;
    }
    return rp;
  },
  get_pir: function(n) {
    'use strict';
    var pir;
    n = Number(n);
    if (n > 48001) {
      pir = 0.28;
    } else if (n > 14001) {
      pir = 0.175;
    } else {
      pir = 0.105;
    }
    return pir;
  },
  get_ecst: function(n) {
    'use strict';
    var ecst;
    if (n > 84000) {
      ecst = 0.33;
    } else if (n > 57600) {
      ecst = 0.30;
    } else if (n > 16800) {
      ecst = 0.175;
    } else {
      ecst = 0.105;
    }
    return ecst;
  },
  get_risk_profile_label: function(n) {
    'use strict';
    switch (n) {
      case 1:
        return "Defensive";
      case 2:
        return "Conservative";
      case 3:
        return "Balanced";
      case 4:
        return "Growth";
      case 5:
        return "Aggressive";
      case 0:
        return "All";
      default:
        return false;
    }
  },
  get_net_returns: function(pir) {
    'use strict';
    switch (pir) {
      case 0.105:
        return {
          nz_shares: 0.0682,
          oseas_shares: 0.0797,
          prop_nz: 0.0561,
          prop_global: 0.0597,
          alt_growth: 0.0672,
          alt_income: 0.0672,
          alt_other: 0.0672,
          nz_fixed: 0.0359,
          oseas_fixed: 0.0404,
          cash: 0.0336
        };
      case 0.175:
        return {
          nz_shares: 0.0637,
          oseas_shares: 0.0762,
          prop_nz: 0.0519,
          prop_global: 0.0562,
          alt_growth: 0.0645,
          alt_income: 0.0645,
          alt_other: 0.0645,
          nz_fixed: 0.0331,
          oseas_fixed: 0.0373,
          cash: 0.0309
        };
      case 0.28:
        return {
          nz_shares: 0.0569,
          oseas_shares: 0.0709,
          prop_nz: 0.0456,
          prop_global: 0.0508,
          alt_growth: 0.0605,
          alt_income: 0.0605,
          alt_other: 0.0605,
          nz_fixed: 0.0290,
          oseas_fixed: 0.0326,
          cash: 0.0270
        };
      default:
        return false;
    }
  },
  employer_withholding_tax: function(obj, year) {
    'use strict';
    var ewt = {};
    switch (year) {
      case 1:
        ewt.non_compulsory = 0;
        ewt.compulsory = 0;
        if (obj.b27 > 0) {
          ewt.non_compulsory = Math.min(0.03, (obj.i27 * obj.e23) + (obj.i28 * (1 - obj.e23)));
          ewt.compulsory = (obj.j27 * obj.e23) + (obj.j28 * (1 - obj.e23));
        }
        return ewt;
      case 2:
        ewt.non_compulsory = 0;
        ewt.compulsory = 0;
        if (obj.b27 > 0) {
          ewt.non_compulsory = Math.min(0.03, (obj.i28 * obj.e23) + (obj.i29 * (1 - obj.e23)));
          ewt.compulsory = (obj.j28 * obj.e23) + (obj.j29 * (1 - obj.e23));
        }
        return ewt;
      case 3:
        ewt.non_compulsory = 0;
        ewt.compulsory = 0;
        if (obj.b27 > 0) {
          ewt.non_compulsory = Math.min(0.03, (obj.i29 * obj.e23) + (obj.i30 * (1 - obj.e23)));
          ewt.compulsory = (obj.j29 * obj.e23) + (obj.j30 * (1 - obj.e23));
        }
        return ewt;
      case 4:
        ewt.non_compulsory = 0;
        ewt.compulsory = 0;
        if (obj.b27 > 0) {
          ewt.non_compulsory = Math.min(0.03, (obj.i30 * obj.e23) + (obj.i31 * (1 - obj.e23)));
          ewt.compulsory = (obj.j30 * obj.e23) + (obj.j31 * (1 - obj.e23));
        }
        return ewt;
      case 5:
        ewt.non_compulsory = 0;
        ewt.compulsory = 0;
        if (obj.b27 > 0) {
          ewt.non_compulsory = Math.min(0.03, (obj.i30 * obj.e23) + (obj.i31 * (1 - obj.e23)));
          ewt.compulsory = (obj.j30 * obj.e23) + (obj.j31 * (1 - obj.e23));
        }
        return ewt;
      default:
        ewt.non_compulsory = 0;
        ewt.compulsory = 0;
        if (obj.b27 > 0) {
          ewt.non_compulsory = Math.min(0.03, (obj.i30 * obj.e23) + (obj.i31 * (1 - obj.e23)));
          ewt.compulsory = (obj.j30 * obj.e23) + (obj.j31 * (1 - obj.e23));
        }
        return ewt;
    }
  },
  generate_map: function(model, n) {
    'use strict';
    var i, m = {},
      x, a, ewt;
    model.providers[n].rows = {};
    for (i = 1; i <= model.b37; i += 1) {
      model.providers[n].rows[i] = {};
      model.providers[n].rows[i].a = i;
      model.providers[n].rows[i].b = null;
      if (this.check_vars([model.b22, model.b23], 'model.providers[' + i + '].b')) {
        model.providers[n].rows[i].b = model.b22 * Math.pow(1 + model.b23, i - 0.5);
      }
      model.providers[n].rows[i].c = null;
      if (i > 1) {
        if (this.check_vars([model.providers[n].rows[i - 1].r], 'model.providers[' + i + '].c')) {
          model.providers[n].rows[i].c = model.providers[n].rows[i - 1].r;
        }
      } else {
        model.providers[n].rows[i].c = 0;
      }
      model.providers[n].rows[i].d = null;
      model.providers[n].rows[i].e = null;
      model.providers[n].rows[i].f = null;
      if (model.employment) {
        if (this.check_vars([model.b26, model.providers[n].rows[i].b], 'm[' + i + '].d - employed')) {
          model.providers[n].rows[i].d = model.b26 * model.providers[n].rows[i].b;
        }
        ewt = this.employer_withholding_tax(model, i);
        if (this.check_vars(ewt, 'm[' + i + '].e - employed')) {
          model.providers[n].rows[i].e = ewt.non_compulsory * model.providers[n].rows[i].b;
        }
        if (this.check_vars(ewt, 'm[' + i + '].f - employed')) {
          model.providers[n].rows[i].f = ewt.compulsory * (1 - model.g32) * model.providers[n].rows[i].b;
        }
      } else {
        if (this.check_vars([model.b30, model.b31], 'model.providers[' + i + '].d - unemployed')) {
          if (model.b32) {
            model.providers[n].rows[i].d = model.b30 * model.b31 * (Math.pow((1 + model.b24), (model.providers[n].rows[i].a - 1)));
          } else {
            model.providers[n].rows[i].d = model.b30 * model.b31;
          }
        }
        model.providers[n].rows[i].e = 0;
        model.providers[n].rows[i].f = 0;
      }
      model.providers[n].rows[i].g = 0;
      model.providers[n].rows[i].i = 0;
      model.providers[n].rows[i].aa = model.providers[n].rows[i].e;
      model.providers[n].rows[i].ab = model.providers[n].rows[i].g;
      model.providers[n].rows[i].ad = model.providers[n].rows[i].i;
      model.providers[n].rows[i].am = parseFloat(model.providers[n].t.aa_nz_au_s);
      model.providers[n].rows[i].an = parseFloat(model.providers[n].t.aa_oss_s);
      model.providers[n].rows[i].ao = parseFloat(model.providers[n].t.aa_prop_nz);
      model.providers[n].rows[i].ap = parseFloat(model.providers[n].t.aa_prop_global);
      model.providers[n].rows[i].aq = parseFloat(model.providers[n].t.aa_alt_growth);
      model.providers[n].rows[i].ar = parseFloat(model.providers[n].t.aa_alt_income);
      model.providers[n].rows[i].as = parseFloat(model.providers[n].t.aa_alt_other);
      model.providers[n].rows[i].at = parseFloat(model.providers[n].t.aa_nzfi);
      model.providers[n].rows[i].au = parseFloat(model.providers[n].t.aa_osfi);
      model.providers[n].rows[i].av = parseFloat(model.providers[n].t.aa_cash);
      model.providers[n].rows[i].aw = null;
      if (this.check_vars([model.providers[n].rows[i].am, model.providers[n].rows[i].an, model.providers[n].rows[i].ao, model.providers[n].rows[i].ap, model.providers[n].rows[i].aq, model.providers[n].rows[i].as], 'model.providers[' + n + '][rows][' + i + '].aw') && model.providers[n].rows[i].as !== 0) {
        model.providers[n].rows[i].aw = this.sum_array([model.providers[n].rows[i].am, model.providers[n].rows[i].an, model.providers[n].rows[i].ao, model.providers[n].rows[i].ap, model.providers[n].rows[i].aq, (model.providers[n].rows[i].as / 2)]);
      }
      model.providers[n].rows[i].ay = this.get_net_returns(this.get_pir(model.providers[n].rows[i].b)).nz_shares;
      model.providers[n].rows[i].az = this.get_net_returns(this.get_pir(model.providers[n].rows[i].b)).oseas_shares;
      model.providers[n].rows[i].ba = this.get_net_returns(this.get_pir(model.providers[n].rows[i].b)).prop_nz;
      model.providers[n].rows[i].bb = this.get_net_returns(this.get_pir(model.providers[n].rows[i].b)).prop_global;
      model.providers[n].rows[i].bc = this.get_net_returns(this.get_pir(model.providers[n].rows[i].b)).alt_growth;
      model.providers[n].rows[i].bd = this.get_net_returns(this.get_pir(model.providers[n].rows[i].b)).alt_income;
      model.providers[n].rows[i].be = this.get_net_returns(this.get_pir(model.providers[n].rows[i].b)).alt_other;
      model.providers[n].rows[i].bf = this.get_net_returns(this.get_pir(model.providers[n].rows[i].b)).nz_fixed;
      model.providers[n].rows[i].bg = this.get_net_returns(this.get_pir(model.providers[n].rows[i].b)).oseas_fixed;
      model.providers[n].rows[i].bh = this.get_net_returns(this.get_pir(model.providers[n].rows[i].b)).cash;
      model.providers[n].rows[i].bi = this.sum_product([model.providers[n].rows[i].am, model.providers[n].rows[i].an, model.providers[n].rows[i].ao, model.providers[n].rows[i].ap, model.providers[n].rows[i].aq, model.providers[n].rows[i].ar, model.providers[n].rows[i].as, model.providers[n].rows[i].at, model.providers[n].rows[i].au, model.providers[n].rows[i].av], [model.providers[n].rows[i].ay, model.providers[n].rows[i].az, model.providers[n].rows[i].ba, model.providers[n].rows[i].bb, model.providers[n].rows[i].bc, model.providers[n].rows[i].bd, model.providers[n].rows[i].be, model.providers[n].rows[i].bf, model.providers[n].rows[i].bg, model.providers[n].rows[i].bh]);
      model.providers[n].rows[i].j = null;
      if (i === 1) {
        if (this.check_vars([model.b34, model.e34, model.providers[n].rows[i].d], 'model.providers[' + n + '][rows' + i + '].j.1')) {
          model.providers[n].rows[i].j = Math.min((model.b34 * model.e34), (model.providers[n].rows[i].d * model.e34));
        }
      } else {
        if (this.check_vars([model.b34, model.e34, model.providers[n].rows[i].d, model.providers[n].rows[(i - 1)].d], 'model.providers[' + n + '][rows' + i + '].j.2')) {
          model.providers[n].rows[i].j = Math.min(model.b34, ((model.providers[n].rows[i].d * model.e34) + (model.providers[n].rows[(i - 1)].d * (1 - model.e34))));
        }
      }
      model.providers[n].rows[i].h = null;
      if (this.check_vars([model.providers[n].rows[i].c, model.providers[n].rows[i].bi, model.providers[n].rows[i].d, model.providers[n].rows[i].e, model.providers[n].rows[i].f, model.providers[n].rows[i].g, model.providers[n].rows[i].i, model.providers[n].rows[i].j, model.e34], 'model.providers[' + n + '].rows[' + i + '].h')) {
        model.providers[n].rows[i].h = model.providers[n].rows[i].c * model.providers[n].rows[i].bi + this.sum_array([model.providers[n].rows[i].d, model.providers[n].rows[i].e, model.providers[n].rows[i].f]) * (Math.pow((1 + model.providers[n].rows[i].bi), 0.5) - 1) + model.providers[n].rows[i].g * (Math.pow((1 + model.providers[n].rows[i].bi), 0.75) - 1) + model.providers[n].rows[i].i * (Math.pow((1 + model.providers[n].rows[i].bi), 0.75) - 1) + model.providers[n].rows[i].j * (Math.pow((1 + model.providers[n].rows[i].bi), (1 - model.e34)) - 1);
      }
      model.providers[n].rows[i].bj = 1 / (1 + model.providers[n].rows[i].bi);
      model.providers[n].rows[i].bk = (this.sum_array([model.providers[n].rows[i].am, model.providers[n].rows[i].an, model.providers[n].rows[i].ao, model.providers[n].rows[i].ap, model.providers[n].rows[i].aq, model.providers[n].rows[i].ar, model.providers[n].rows[i].as, model.providers[n].rows[i].at, model.providers[n].rows[i].au, model.providers[n].rows[i].av]) === 1) ? true : false;
      model.providers[n].rows[i].bl = model.providers[n].rows[i].d / Math.pow((1 + model.inflation_rate), i);
      model.providers[n].rows[i].bm = model.providers[n].rows[i].e / Math.pow((1 + model.inflation_rate), i);
      model.providers[n].rows[i].bn = model.providers[n].rows[i].g / Math.pow((1 + model.inflation_rate), i);
      model.providers[n].rows[i].bo = model.providers[n].rows[i].h / Math.pow((1 + model.inflation_rate), i);
      model.providers[n].rows[i].bp = model.providers[n].rows[i].i / Math.pow((1 + model.inflation_rate), i);
      model.providers[n].rows[i].bq = model.providers[n].rows[i].j / Math.pow((1 + model.inflation_rate), i);
      model.providers[n].rows[i].br = model.providers[n].rows[i].v;
      if (i > 1) {
        a = i - 1;
        model.providers[n].rows[i].j = Math.min(model.b34, (model.providers[n].rows[i].d * model.e34 + model.providers[n].rows[a].d * (1 - model.e34)));
      } else {
        model.providers[n].rows[i].j = Math.min(model.b34 * model.e34, model.providers[n].rows[i].d * model.e34);
      }
      model.providers[n].rows[i].y = null;
      if (i === 1) {
        if (this.check_vars([model.providers[n].rows[i].c], 'model.providers[' + n + '].rows[' + i + '].y')) {
          model.providers[n].rows[i].y = model.providers[n].rows[i].c;
        }
      } else {
        if (this.check_vars([model.providers[n].rows[(i - 1)].af], 'model.providers[' + n + '].rows[' + i + '].y')) {
          model.providers[n].rows[i].y = model.providers[n].rows[(i - 1)].af;
        }
      }
      model.providers[n].rows[i].z = model.providers[n].rows[i].d;
      x = this.average_array([model.providers[n].rows[i].c, this.sum_array([model.providers[n].rows[i].c, model.providers[n].rows[i].d, model.providers[n].rows[i].e, model.providers[n].rows[i].f, model.providers[n].rows[i].g, model.providers[n].rows[i].h, model.providers[n].rows[i].i, model.providers[n].rows[i].j])]) * (Math.pow((1 + model.providers[n].rows[i].bi), 0.5));
      if (x > 30000) {
        a = model.providers[n].t.fee_invest_30000;
      } else if (x > 4500) {
        a = model.providers[n].t.fee_invest_4500;
      } else {
        a = model.providers[n].t.fee_invest_0;
      }
      model.providers[n].rows[i].k = (a * x);
      model.providers[n].rows[i].l = model.providers[n].t.fee_trustee * x;
      model.providers[n].rows[i].m = model.providers[n].t.fee_admin * x;
      model.providers[n].rows[i].n = 12 * model.providers[n].t.fee_member * Math.pow((1 + model.inflation_rate), (model.providers[n].rows[i].a - 1)) * Math.pow((1 + model.providers[n].rows[i].bi), 0.5);
      model.providers[n].rows[i].o = model.providers[n].t.fee_infund * x;
      if (model.providers[n].t.fee_min === 0) {
        model.providers[n].rows[i].p = 0;
      } else if (this.sum_array([model.providers[n].rows[i].k, model.providers[n].rows[i].l, model.providers[n].rows[i].m, model.providers[n].rows[i].n, model.providers[n].rows[i].o]) < model.providers[n].t.fee_min) {
        model.providers[n].rows[i].p = model.providers[n].t.fee_min - this.sum_array([model.providers[n].rows[i].k, model.providers[n].rows[i].l, model.providers[n].rows[i].m, model.providers[n].rows[i].n, model.providers[n].rows[i].o]);
      } else {
        model.providers[n].rows[i].p = 0;
      }
      model.providers[n].rows[i].q = null;
      if (this.check_vars([model.providers[n].rows[i].k, model.providers[n].rows[i].l, model.providers[n].rows[i].m, model.providers[n].rows[i].n, model.providers[n].rows[i].o, model.providers[n].rows[i].p, model.providers[n].c40], 'm[' + i + '].q')) {
        model.providers[n].rows[i].q = this.sum_array([model.providers[n].rows[i].k, model.providers[n].rows[i].l, model.providers[n].rows[i].m, model.providers[n].rows[i].n, model.providers[n].rows[i].o, model.providers[n].rows[i].p]) * (1 - model.providers[n].c40);
      }
      model.providers[n].rows[i].ae = model.providers[n].rows[i].j;
      model.providers[n].rows[i].ac = null;
      if (this.check_vars([model.providers[n].rows[i].y, model.providers[n].rows[i].bi, model.providers[n].rows[i].z, model.providers[n].rows[i].aa, model.providers[n].rows[i].ab, model.providers[n].rows[i].ad], 'model.providers[' + n + '].rows[' + i + '].ac')) {
        model.providers[n].rows[i].ac = (model.providers[n].rows[i].y) * (model.providers[n].rows[i].bi) + this.sum_array([model.providers[n].rows[i].z, model.providers[n].rows[i].aa]) * (Math.pow((1 + model.providers[n].rows[i].bi), 0.5) - 1) + model.providers[n].rows[i].ab * (Math.pow((1 + model.providers[n].rows[i].bi), 0.75) - 1) + (model.providers[n].rows[i].ad / 2) * (Math.pow((1 + model.providers[n].rows[i].bi), 0.5) - 1);
      }
      model.providers[n].rows[i].af = this.sum_array([model.providers[n].rows[i].y, model.providers[n].rows[i].z, model.providers[n].rows[i].aa, model.providers[n].rows[i].ab, model.providers[n].rows[i].ac, model.providers[n].rows[i].ad, model.providers[n].rows[i].ae]);
      model.providers[n].rows[i].ag = model.providers[n].rows[i].af / (Math.pow(1 + model.inflation_rate, i));
      model.providers[n].rows[i].r = null;
      if (this.check_vars([model.providers[n].rows[i].c, model.providers[n].rows[i].d, model.providers[n].rows[i].e, model.providers[n].rows[i].f, model.providers[n].rows[i].g, model.providers[n].rows[i].h, model.providers[n].rows[i].i, model.providers[n].rows[i].j, model.providers[n].rows[i].q], 'm[' + i + '].r')) {
        model.providers[n].rows[i].r = this.sum_array([model.providers[n].rows[i].c, model.providers[n].rows[i].d, model.providers[n].rows[i].e, model.providers[n].rows[i].f, model.providers[n].rows[i].g, model.providers[n].rows[i].h, model.providers[n].rows[i].i, model.providers[n].rows[i].j]) - model.providers[n].rows[i].q;
      }
      model.providers[n].rows[i].ah = model.providers[n].rows[i].af - model.providers[n].rows[i].r;
      model.providers[n].rows[i].ai = model.providers[n].rows[i].ah / (Math.pow((1 + model.b24), i));
      model.providers[n].rows[i].ak = this.get_pir(model.providers[n].rows[i].b) * model.providers[n].t.expense_before_tax;
      model.providers[n].rows[i].al = parseInt(model.providers[n].t.risk_profile, 10);
      model.providers[n].rows[i].s = null;
      if (this.check_vars([model.providers[n].rows[i].k, model.providers[n].rows[i].l, model.providers[n].rows[i].m, model.providers[n].rows[i].n, model.providers[n].rows[i].o, model.providers[n].rows[i].bi, model.providers[n].rows[i].p, model.providers[n].c40], 'model.providers[' + n + '][rows][' + i + '].s')) {
        model.providers[n].rows[i].s = ((this.sum_array([model.providers[n].rows[i].k, model.providers[n].rows[i].l, model.providers[n].rows[i].m, model.providers[n].rows[i].n, model.providers[n].rows[i].o]) / Math.pow((1 + model.providers[n].rows[i].bi), 0.5)) + model.providers[n].rows[i].p) * (1 - model.providers[n].c40);
      }
      model.providers[n].rows[i].t = null;
      x = 0;
      if (i === 1) {
        model.providers[n].rows[i].t = model.providers[n].rows[i].s;
      } else {
        for (a = 1; a < i; a += 1) {
          x += model.providers[n].rows[a].s;
        }
        model.providers[n].rows[i].t = x + model.providers[n].rows[i].s;
      }
      model.providers[n].rows[i].u = null;
      if (this.check_vars([model.providers[n].rows[i].r, model.inflation_rate, model.providers[n].rows[i].a], 'model.providers[' + n + '].rows[' + i + '].u')) {
        model.providers[n].rows[i].u = model.providers[n].rows[i].r / (Math.pow((1 + model.inflation_rate), model.providers[n].rows[i].a));
      }
      model.providers[n].rows[i].v = null;
      if (this.check_vars([model.providers[n].rows[i].k, model.providers[n].rows[i].l, model.providers[n].rows[i].m, model.providers[n].rows[i].n, model.providers[n].rows[i].o, model.providers[n].rows[i].bi, model.providers[n].rows[i].p, model.providers[n].c40, model.inflation_rate, model.providers[n].rows[i].a], 'model.providers[' + n + '][rows][' + i + '].v')) {
        model.providers[n].rows[i].v = ((this.sum_array([model.providers[n].rows[i].k, model.providers[n].rows[i].l, model.providers[n].rows[i].m, model.providers[n].rows[i].n, model.providers[n].rows[i].o]) / (Math.pow((1 + model.providers[n].rows[i].bi), 0.5)) + model.providers[n].rows[i].p) * ((1 - model.providers[n].c40))) / (Math.pow((1 + model.inflation_rate), model.providers[n].rows[i].a));
      }
      model.providers[n].rows[i].w = 0;
      model.providers[n].rows[i].x = "";
      for (x = 1; x <= i; x += 1) {
        model.providers[n].rows[i].w += model.providers[n].rows[x].v;
      }
      model.providers[n].rows[i].br = model.providers[n].rows[i].v;
      model.providers[n].l4 = this.round_negative(model.providers[n].rows[i].w, -1);
      model.providers[n].j4 = this.round_negative(model.providers[n].rows[i].u, -2);
      model.providers[n].o4 = this.round_negative(model.providers[n].rows[i].t, -1);
      model.providers[n].n4 = this.round_negative(model.providers[n].rows[i].r, -2);
    }
    return m;
  },
  interrupt: false,
  calculating: false,
  calculate: function(obj) {
    'use strict';
    var self = this;
    if (this.test_mode === true) {
      console.debug = true;
    }
    if (this.calculating === true) {
      this.interrupt = true;
      setTimeout(function() {
        self.calculate(obj);
      }, 50);
      return;
    }
    if (this.ui.calculating === true) {
      this.ui.interrupt = true;
      setTimeout(function() {
        self.calculate(obj);
      }, 50);
      return;
    }
    this._calculate(obj);
  },
  _calculate: function(obj) {
    'use strict';
    var span, span2, x, external;
    //console.log("><><><>< Calculating ><><><><");
    this.calculating = true;
    //console.log('__Dirty Object__');
    //console.dir(obj);
    obj = {
      month_born: (isNaN(parseInt(obj.month_born, 10)) ? null : parseInt(obj.month_born, 10)),
      year_born: (isNaN(parseInt(obj.year_born, 10)) ? null : parseInt(obj.year_born, 10)),
      employment: (obj.employment === true ? true : false),
      salary: (isNaN(parseInt(obj.salary, 10)) ? null : parseInt(obj.salary, 10)),
      earnings: (isNaN(parseInt(obj.earnings, 10)) ? null : parseInt(obj.earnings, 10)),
      contrib_freq: (isNaN(parseInt(obj.contrib_freq, 10)) ? null : parseInt(obj.contrib_freq, 10)),
      contrib: (isNaN(parseInt(obj.contrib, 10)) ? null : parseInt(obj.contrib, 10)),
      employee_contrib: (isNaN(parseInt(obj.employee_contrib, 10)) ? null : parseInt(obj.employee_contrib, 10)),
      employer_contrib: (isNaN(parseInt(obj.employer_contrib, 10)) ? null : parseInt(obj.employer_contrib, 10)),
      risk_profile: (isNaN(parseInt(obj.risk_profile, 10)) ? null : parseInt(obj.risk_profile, 10)),
      iac: (obj.iac === true ? true : false)
    };
    //console.log('__Clean Object__');
    //console.dir(obj);
    x = 0;
    jQuery.each(obj, function(i, v) {
      if (obj.employment === true) {
        if (v === null && (i !== 'earnings' && i !== 'contrib' && i !== 'contrib_freq')) {
          //console.log('Null on "' + i + '"');
          x += 1;
        }
      } else if (obj.employment === false) {
        if (v === null && (i !== 'salary')) {
          //console.log('Null on "' + i + '"');
          x += 1;
        }
      } else {
        this.model.results = false;
        this.calculating = false;
        this.interrupt = false;
        $(document).trigger('ksfcalcend');
        return;
      }
    });
    if (x > 0) {
      this.model.results = false;
      this.calculating = false;
      this.interrupt = false;
      $(document).trigger('ksfcalcend');
      return;
    }
    this.model.age = this.get_age('01/' + obj.month_born + '/' + obj.year_born);
    if (this.model.age >= 65) {
      console.log("this.model.age >= 65");
      this.model.results = false;
      this.calculating = false;
      this.interrupt = false;
      $(document).trigger('ksfcalcend');
      return;
    }
    this.model.inflation_rate = 0.02;
    this.model.employment = obj.employment;
    this.model.b22 = (obj.employment) ? obj.salary : obj.earnings;
    this.model.b23 = constants.salary_inflation_pa;
    this.model.b24 = this.model.inflation_rate;
    this.model.b26 = obj.employee_contrib / 100;
    this.model.b27 = obj.employer_contrib / 100;
    this.model.b30 = (obj.employment) ? 0 : obj.contrib;
    this.model.b31 = (obj.employment) ? 0 : obj.contrib_freq;
    this.model.b32 = (obj.employment) ? 0 : obj.iac;
    this.model.b34 = 10 / 7 * 365;
    this.model.b36 = this.model.age;
    this.model.b37 = (constants.retire_age - this.model.age);
    this.model.c40 = this.get_pir(this.model.b22);
    this.model.c48 = 0.002;
    this.model.d22 = Date.today();
    if (this.model.d22.toString('M') < 4) {
      this.model.d23 = Date.parse('01-04-' + Date.today().toString('yyyy'));
    } else {
      this.model.d23 = Date.parse('01-04-' + Date.today().addYears(1).toString('yyyy'));
    }
    this.model.d24 = Date.today().addYears(1);
    this.model.d34 = null;
    if (this.check_vars([this.model.d22], 'd34')) {
      if (this.model.d22.toString('M') < 6) {
        this.model.d34 = Date.parse('30-06-' + Date.today().toString('yyyy'));
      } else {
        this.model.d34 = Date.parse('30-06-' + Date.today().addYears(1).toString('yyyy'));
      }
    }
    this.model.e23 = null;
    if (this.check_vars([this.model.d22, this.model.d23, this.model.d24], 'e23')) {
      span = new TimeSpan(this.model.d23 - this.model.d22);
      span2 = new TimeSpan(this.model.d24 - this.model.d22);
      this.model.e23 = (span.getDays() + 1) / (span2.getDays());
    }
    this.model.h27 = null;
    if (this.check_vars([this.model.d23], 'h27')) {
      this.model.h27 = new Date(this.model.d23.getTime());
      this.model.h27.addYears(-1);
    }
    this.model.h28 = null;
    if (this.check_vars([this.model.h27], 'h28')) {
      this.model.h28 = new Date(this.model.h27.getTime());
      this.model.h28.addYears(+1);
    }
    this.model.h29 = null;
    if (this.check_vars([this.model.h28], 'h28')) {
      this.model.h29 = new Date(this.model.h28.getTime());
      this.model.h29.addYears(+1);
    }
    this.model.h30 = null;
    if (this.check_vars([this.model.h29], '')) {
      this.model.h30 = new Date(this.model.h29.getTime());
      this.model.h30.addYears(+1);
    }
    this.model.h31 = null;
    if (this.check_vars([this.model.h30], '')) {
      this.model.h31 = new Date(this.model.h30.getTime());
      this.model.h31.addYears(+1);
    }
    this.model.i27 = 0;
    this.model.i28 = 0;
    this.model.i29 = 0;
    this.model.i30 = 0;
    this.model.i31 = 0;
    this.model.i45 = null;
    if (this.check_vars([this.model.b37], 'i45')) {
      this.model.i45 = this.model.b37;
    }
    this.model.j27 = this.model.b27;
    this.model.j28 = null;
    if (this.check_vars([this.model.h28, this.model.b27, this.model.i28], 'j28')) {
      this.model.j28 = Math.max(0, (this.model.b27 - this.model.i28));
      if (this.model.h28.toString('yyyy') > 2012) {
        this.model.j28 = Math.max(0.03, (this.model.b27 - this.model.i28));
      }
    }
    this.model.j29 = null;
    if (this.check_vars([this.model.h29, this.model.b27, this.model.i29], 'j29')) {
      this.model.j29 = Math.max(0, (this.model.b27 - this.model.i29));
      if (this.model.h29.toString('yyyy') > 2012) {
        this.model.j29 = Math.max(0.03, (this.model.b27 - this.model.i29));
      }
    }
    this.model.j30 = null;
    if (this.check_vars([this.model.h30, this.model.b27, this.model.i30], 'J30')) {
      this.model.j30 = Math.max(0, (this.model.b27 - this.model.i30));
      if (this.model.h30.toString('yyyy') > 2012) {
        this.model.j30 = Math.max(0.03, (this.model.b27 - this.model.i30));
      }
    }
    this.model.j31 = null;
    if (this.check_vars([this.model.b27, this.model.i31], 'J31')) {
      this.model.j31 = Math.max(0, (this.model.b27 - this.model.i31));
      if (this.model.h31.toString('yyyy') > 2012) {
        this.model.j31 = Math.max(0.03, (this.model.b27 - this.model.i31));
      }
    }
    this.model.e27 = 0;
    this.model.e28 = null;
    if (this.check_vars([this.model.b27, obj.employment, this.model.i28, this.model.e23, this.model.i29], 'e28')) {
      this.model.e28 = 0;
      if (this.model.b27 > 0 && obj.employment) {
        this.model.e28 = Math.min(0.03, (this.model.i28 * this.model.e23) + (this.model.i29 * (1 - this.model.e23)));
      }
    }
    this.model.e29 = null;
    if (this.check_vars([this.model.b27, obj.employment, this.model.i29, this.model.e23, this.model.i30], 'e29')) {
      this.model.e29 = 0;
      if (this.model.b27 > 0 && obj.employment) {
        this.model.e29 = Math.min(0.03, (this.model.i29 * this.model.e23) + (this.model.i30 * (1 - this.model.e23)));
      }
    }
    this.model.e30 = null;
    if (this.check_vars([this.model.b27, obj.employment, this.model.i30, this.model.e23, this.model.i31], 'e30')) {
      this.model.e30 = 0;
      if (this.model.b27 > 0 && obj.employment) {
        this.model.e30 = Math.min(0.03, (this.model.i30 * this.model.e23) + (this.model.i31 * (1 - this.model.e23)));
      }
    }
    this.model.e31 = null;
    if (this.check_vars([this.model.e30], 'e31')) {
      this.model.e31 = this.model.e30;
    }
    this.model.e34 = null;
    if (this.check_vars([this.model.d22, this.model.d24, this.model.d34], 'e34')) {
      span = new TimeSpan(this.model.d34 - this.model.d22);
      span2 = new TimeSpan(this.model.d24 - this.model.d22);
      this.model.e34 = span.getDays() / span2.getDays();
    }
    this.model.f27 = null;
    if (this.check_vars(this.model.b27, 'f27')) {
      this.model.f27 = Math.max(0.03, this.model.b27);
    }
    this.model.f28 = null;
    if (this.check_vars([this.model.b27, obj.employment, this.model.j28, this.model.e23, this.model.j29], 'f28')) {
      this.model.f28 = 0;
      if (this.model.b27 > 0 && obj.employment) {
        this.model.f28 = ((this.model.j28 * this.model.e23) + (this.model.j29 * (1 - this.model.e23)));
      }
    }
    this.model.f29 = null;
    if (this.check_vars([this.model.b27, obj.employment, this.model.j29, this.model.e23, this.model.j30], 'f29')) {
      this.model.f29 = 0;
      if (this.model.b27 > 0 && obj.employment) {
        this.model.f29 = ((this.model.j29 * this.model.e23) + (this.model.j30 * (1 - this.model.e23)));
      }
    }
    this.model.f30 = null;
    if (this.check_vars([this.model.b27, obj.employment, this.model.j30, this.model.e23, this.model.j31], 'f30')) {
      this.model.f30 = 0;
      if (this.model.b27 > 0 && obj.employment) {
        this.model.f30 = ((this.model.j30 * this.model.e23) + (this.model.j31 * (1 - this.model.e23)));
      }
    }
    this.model.f31 = null;
    if (this.check_vars([this.model.f30], 'f31')) {
      this.model.f31 = this.model.f30;
    }
    this.model.g32 = this.get_ecst((this.model.b22 * (1 + this.model.b27)));
    //console.log('<___MODEL___>');
    //console.log('B22: ' + this.model.b22);
    //console.log('B23: ' + this.model.b23);
    //console.log('B24: ' + this.model.b24);
    //console.log('B26: ' + this.model.b26);
    //console.log('B27: ' + this.model.b27);
    //console.log('B30: ' + this.model.b30);
    //console.log('B31: ' + this.model.b31);
    //console.log('B32: ' + this.model.b32);
    //console.log('B34: ' + this.model.b34);
    //console.log('B36: ' + this.model.b36);
    //console.log('B37: ' + this.model.b37);
    //console.log('C40: ' + this.model.c40);
    //console.log('C48: ' + this.model.c48);
    //console.log('D22: ' + this.model.d22);
    //console.log('D23: ' + this.model.d23);
    //console.log('D24: ' + this.model.d24);
    //console.log('D34: ' + this.model.d34);
    //console.log('E23: ' + this.model.e23);
    //console.log('E27: ' + this.model.e27);
    //console.log('E28: ' + this.model.e28);
    //console.log('E29: ' + this.model.e29);
    //console.log('E30: ' + this.model.e30);
    //console.log('E31: ' + this.model.e31);
    //console.log('E34: ' + this.model.e34);
    //console.log('F27: ' + this.model.f27);
    //console.log('F28: ' + this.model.f28);
    //console.log('F29: ' + this.model.f29);
    //console.log('F30: ' + this.model.f30);
    //console.log('F31: ' + this.model.f31);
    //console.log('G32: ' + this.model.g32);
    //console.log('H27: ' + this.model.h27);
    //console.log('H28: ' + this.model.h28);
    //console.log('H29: ' + this.model.h29);
    //console.log('H30: ' + this.model.h30);
    //console.log('H31: ' + this.model.h31);
    //console.log('I27: ' + this.model.i27);
    //console.log('I28: ' + this.model.i28);
    //console.log('I29: ' + this.model.i29);
    //console.log('I30: ' + this.model.i30);
    //console.log('I31: ' + this.model.i31);
    //console.log('J27: ' + this.model.j27);
    //console.log('J28: ' + this.model.j28);
    //console.log('J29: ' + this.model.j29);
    //console.log('J30: ' + this.model.j30);
    //console.log('J31: ' + this.model.j31);
    this.model.risk = obj.risk_profile;
    this.model.providers = {};
    this.model.results = {};
    this.reduced_fees_table = {};
    this.reduced_fees_table_length = 0;
    external = this;

    jQuery.each(fees_table, function(i, v) {
      if (v.risk_profile === external.model.risk || external.model.risk === 0) {
        external.reduced_fees_table[i] = v;
        external.reduced_fees_table_length += 1;
      }
    });
    setTimeout(function() {
      external.recurse_map(0);
    }, 10);
  },
  recurse_map: function(n) {
    'use strict';
    var j = 0,
      k, i, v, external = this;
    if (this.interrupt === true) {
      this.interrupt = false;
      this.calculating = false;
      return;
    }
    for (k in this.reduced_fees_table) {
      if (this.reduced_fees_table.hasOwnProperty(k)) {
        if (j === n) {
          i = k;
          v = this.reduced_fees_table[i];
        }
        j += 1;
      }
    }
    external.model.providers[i] = {};
    external.model.providers[i].b4 = v.id;
    external.model.providers[i].b5 = v.scheme;
    external.model.providers[i].b7 = v.fund;
    external.model.providers[i].b9 = v.fee_invest_0;
    external.model.providers[i].b10 = v.fee_invest_4500;
    external.model.providers[i].b11 = v.fee_invest_30000;
    external.model.providers[i].b12 = v.fee_trustee;
    external.model.providers[i].b13 = v.fee_admin;
    external.model.providers[i].b14 = v.fee_member;
    external.model.providers[i].b15 = v.fee_infund;
    external.model.providers[i].b16 = v.fee_min;
    external.model.providers[i].b18 = v.risk_profile;
    external.model.providers[i].b22 = external.model.b22;
    external.model.providers[i].c39 = v.expense_before_tax;
    external.model.providers[i].c40 = external.get_pir(external.model.providers[i].b22);
    external.model.providers[i].t = v;
    external.generate_map(external.model, external.model.providers[i].b4);
    external.model.results[i] = {};
    external.model.results[i].todays = {
      risk: external.get_risk_profile_label(parseInt(v.risk_profile, 10)),
      scheme: v.scheme,
      fund: v.fund,
      fees_till_65_dollars: external.round(external.model.providers[i].l4, -1),
      fees_till_65_percent: external.round(external.model.providers[i].l4 / external.model.providers[i].j4 * 100, 1),
      fees_balance: external.model.providers[i].j4,
      id: v.id,
      active: v.active,
      date_verified: v.verified
    };
    external.model.results[i].nominal = {
      risk: external.get_risk_profile_label(parseInt(v.risk_profile, 10)),
      scheme: v.scheme,
      fund: v.fund,
      fees_till_65_dollars: external.model.providers[i].o4,
      fees_till_65_percent: external.round(external.model.providers[i].o4 / external.model.providers[i].n4 * 100, 1),
      fees_balance: external.model.providers[i].o4,
      id: v.id,
      active: v.active,
      date_verified: v.verified
    };
    if (this.interrupt === true) {
      this.interrupt = false;
      this.calculating = false;
      return;
    }
    $(document).trigger('ksfcalcprogress', Math.round((n + 1) * 100 / this.reduced_fees_table_length));
    if (n + 1 === this.reduced_fees_table_length) {
      this.calculating = false;
      $(document).trigger('ksfcalcend');
      if (this.test_mode === true) {
        //console.dir(external.model);
      }
      return;
    }
    setTimeout(function() {
      external.recurse_map(n + 1);
    }, 10);
  },
  test_calc: function() {
    'use strict';
    var external = this;
    if (this.test_mode !== true) {
      //console.log('no testing today thanks');
    } else {
      //console.log('lets test the calc');
      /*console.debug = true;
      (function($) {
        $(document).ready(function() {
          $('html').append("<div style='clear:both'></div><div style='margin:0; background:#2C2927; color:#efefef; padding:50px;'><h1 style='float:left; line-height:40px; font-size:30px; height:40px;'>TESTMODE</h1><span id='calculate-test' type='button' class='ui-widget ui-state-default ui-corner-all ui-selectmenu-dropdown form-select split-button calculator-save-button' style='line-height:40px; height:40px; font-size:30px; padding:0 20px; cursor:pointer; margin-left:30px;'>test calc</span></div>");
        });
        $('#calculate-test').on("click", function() {
          external.test_begin();
        });
      }(jQuery));
*/  
    }
  },
  test_begin: function() {
    'use strict';
    var i, test = [],
      results = [];
    //console.log('begin testing');
    for (i = 0; i < this.tests.length; i += 1) {
      //console.log(' ');
      //console.log(' ');
      //console.log('///\\\///\\\///\\\///\\\///\\\/// TEST ' + (i + 1));
      test[i] = new SortedCalculator_KiwiSaver_Fees();
      results[i] = test[i].calculate(this.tests[i], true);
    }
  },
  test_check_results: function(results) {
    'use strict';
    var i = 0,
      tests, e, c, str, pf;
    //console.log('Checking results: ', results);
    //console.log('///\\\///\\\/// TEST RESULTS ///\\\///\\\///');
    //console.dir(results[i].results);
    //console.log(tests[i].expected.length);
    for (e = 0; e < tests[i].expected.length; e += 1) {
      c += 1;
      str = "<div style='clear:both'></div>";
      str += "<div style='margin:0; background:#000; color:#efefef; margin:20px; padding:20px; border:4px solid #000'>";
      if (e === 0) {
        str += "<div style='float:right; width:200px; padding:10px; maring:5px; background:#efefef; color:#333; font-family:verdana'><h2>Test " + (i + 1) + " inputs</h2>";
        str += "month_born: " + tests[i].month_born + "<br />";
        str += "year_born: " + tests[i].year_born + "<br />";
        str += "risk_profile: " + tests[i].risk_profile + "<br />";
        str += "employment: " + tests[i].employment + "<br />";
        str += "iac: " + tests[i].iac + "<br />";
        str += "//employed<br />";
        str += "salary: " + tests[i].salary + "<br />";
        str += "employee_contrib: " + tests[i].employee_contrib + "<br />";
        str += "employer_contrib: " + tests[i].employer_contrib + "<br />";
        str += "//unemployed<br />";
        str += "earnings: " + tests[i].earnings + "<br />";
        str += "contrib_freq: " + tests[i].contrib_freq + "<br />";
        str += "contrib: " + tests[i].contrib + "<br />";
        str += "</div>";
      }
      str += "<h1 style='float:left; line-height:40px; font-size:30px; height:40px; color:#555'>Test " + (i + 1) + '.' + c + " </h1>";
      str += "<div style='clear:left'></div><h3 style='color:#999'>Row: " + tests[i].expected[e].row + '</h3>';
      pf = (tests[i].expected[e].todays.risk === results[i].results[tests[i].expected[e].row].todays.risk) ? "<span style='color:green'>Pass</span>" : "<span style='color:red'>Fail</span> != " + results[i].results[tests[i].expected[e].row].todays.risk;
      str += "Todays risk: " + tests[i].expected[e].todays.risk + ' ' + pf + '<br />';
      pf = (tests[i].expected[e].todays.scheme === results[i].results[tests[i].expected[e].row].todays.scheme) ? "<span style='color:green'>Pass</span>" : "<span style='color:red'>Fail</span> != " + results[i].results[tests[i].expected[e].row].todays.scheme;
      str += "Todays scheme: " + tests[i].expected[e].todays.scheme + ' ' + pf + '<br />';
      pf = (tests[i].expected[e].todays.fund === results[i].results[tests[i].expected[e].row].todays.fund) ? "<span style='color:green'>Pass</span>" : "<span style='color:red'>Fail</span> != " + results[i].results[tests[i].expected[e].row].todays.fund;
      str += "Todays fund: " + tests[i].expected[e].todays.fund + ' ' + pf + '<br />';
      pf = (tests[i].expected[e].todays.fees_till_65_dollars === results[i].results[tests[i].expected[e].row].todays.fees_till_65_dollars) ? "<span style='color:green'>Pass</span>" : "<span style='color:red'>Fail</span> != " + results[i].results[tests[i].expected[e].row].todays.fees_till_65_dollars;
      str += "Todays fees till 65 ($): " + tests[i].expected[e].todays.fees_till_65_dollars + ' ' + pf + '<br />';
      pf = (tests[i].expected[e].todays.fees_till_65_percent === results[i].results[tests[i].expected[e].row].todays.fees_till_65_percent) ? "<span style='color:green'>Pass</span>" : "<span style='color:red'>Fail</span> != " + results[i].results[tests[i].expected[e].row].todays.fees_till_65_percent;
      str += "Todays fees till 65 (%): " + tests[i].expected[e].todays.fees_till_65_percent + ' ' + pf + '<br />';
      pf = (tests[i].expected[e].todays.active === results[i].results[tests[i].expected[e].row].todays.active) ? "<span style='color:green'>Pass</span>" : "<span style='color:red'>Fail</span> != " + results[i].results[tests[i].expected[e].row].todays.active;
      str += "Todays Passive/Active: " + tests[i].expected[e].todays.active + ' ' + pf + '<br />';
      str += "<div style='background:#000; margin:5px; height:10px;'></div>";
      pf = (tests[i].expected[e].nominal.risk === results[i].results[tests[i].expected[e].row].nominal.risk) ? "<span style='color:green'>Pass</span>" : "<span style='color:red'>Fail</span> != " + results[i].results[tests[i].expected[e].row].nominal.risk;
      str += "Nominal risk: " + tests[i].expected[e].nominal.risk + ' ' + pf + '<br />';
      pf = (tests[i].expected[e].nominal.scheme === results[i].results[tests[i].expected[e].row].nominal.scheme) ? "<span style='color:green'>Pass</span>" : "<span style='color:red'>Fail</span> != " + results[i].results[tests[i].expected[e].row].nominal.scheme;
      str += "Nominal scheme: " + tests[i].expected[e].nominal.scheme + ' ' + pf + '<br />';
      pf = (tests[i].expected[e].nominal.fund === results[i].results[tests[i].expected[e].row].nominal.fund) ? "<span style='color:green'>Pass</span>" : "<span style='color:red'>Fail</span> != " + results[i].results[tests[i].expected[e].row].nominal.fund;
      str += "Nominal fund: " + tests[i].expected[e].nominal.fund + ' ' + pf + '<br />';
      pf = (tests[i].expected[e].nominal.fees_till_65_dollars === results[i].results[tests[i].expected[e].row].nominal.fees_till_65_dollars) ? "<span style='color:green'>Pass</span>" : "<span style='color:red'>Fail</span> != " + results[i].results[tests[i].expected[e].row].nominal.fees_till_65_dollars;
      str += "Nominal fees till 65 ($): " + tests[i].expected[e].nominal.fees_till_65_dollars + ' ' + pf + '<br />';
      pf = (tests[i].expected[e].nominal.fees_till_65_percent === results[i].results[tests[i].expected[e].row].nominal.fees_till_65_percent) ? "<span style='color:green'>Pass</span>" : "<span style='color:red'>Fail</span> != " + results[i].results[tests[i].expected[e].row].nominal.fees_till_65_percent;
      str += "Nominal fees till 65 (%): " + tests[i].expected[e].nominal.fees_till_65_percent + ' ' + pf + '<br />';
      pf = (tests[i].expected[e].nominal.active === results[i].results[tests[i].expected[e].row].nominal.active) ? "<span style='color:green'>Pass</span>" : "<span style='color:red'>Fail</span> != " + results[i].results[tests[i].expected[e].row].nominal.active;
      str += "Nominal Passive/Active: " + tests[i].expected[e].nominal.active + ' ' + pf + '<br />';
      $('html').append(str + "<hr /></div>");
    }
  },
  tests: [{
    month_born: 1,
    year_born: 1992,
    risk_profile: 3,
    employment: true,
    iac: true,
    salary: 95000,
    employee_contrib: 8,
    employer_contrib: 4,
    earnings: '',
    contrib_freq: '',
    contrib: '',
    expected: [{
      row: 1,
      todays: {
        risk: 'High risk',
        scheme: 'AMP KiwiSaver Scheme',
        fund: 'Aggressive',
        fees_till_65_dollars: 253850,
        fees_till_65_percent: 11.3,
        active: 'Active'
      },
      nominal: {
        risk: 'High risk',
        scheme: 'AMP KiwiSaver Scheme',
        fund: 'Aggressive',
        fees_till_65_dollars: 601620,
        fees_till_65_percent: 8.8,
        active: 'Active'
      }
    }, {
      row: 2,
      todays: {
        risk: 'Medium risk',
        scheme: 'AMP KiwiSaver Scheme',
        fund: 'Balanced',
        fees_till_65_dollars: 160320,
        fees_till_65_percent: 12,
        active: 'Active'
      },
      nominal: {
        risk: 'Medium risk',
        scheme: 'AMP KiwiSaver Scheme',
        fund: 'Balanced',
        fees_till_65_dollars: 370580,
        fees_till_65_percent: 9.2,
        active: 'Active'
      }
    }, {
      row: 3,
      todays: {
        risk: 'Cash & Fixed Interest only',
        scheme: 'AMP KiwiSaver Scheme',
        fund: 'Cash',
        fees_till_65_dollars: 66850,
        fees_till_65_percent: 10.9,
        active: 'Active'
      },
      nominal: {
        risk: 'Cash & Fixed Interest only',
        scheme: 'AMP KiwiSaver Scheme',
        fund: 'Cash',
        fees_till_65_dollars: 148220,
        fees_till_65_percent: 8.0,
        active: 'Active'
      }
    }, {
      row: 5,
      todays: {
        risk: 'Low risk',
        scheme: 'AMP KiwiSaver Scheme',
        fund: 'Default (Default fund)',
        fees_till_65_dollars: 67320,
        fees_till_65_percent: 7.3,
        active: 'Active'
      },
      nominal: {
        risk: 'Low risk',
        scheme: 'AMP KiwiSaver Scheme',
        fund: 'Default (Default fund)',
        fees_till_65_dollars: 152510,
        fees_till_65_percent: 5.4,
        active: 'Active'
      }
    }, {
      row: 8,
      todays: {
        risk: 'Medium risk',
        scheme: 'AMP KiwiSaver Scheme',
        fund: 'Moderate Balanced',
        fees_till_65_dollars: 160320,
        fees_till_65_percent: 12.0,
        active: 'Active'
      },
      nominal: {
        risk: 'Medium risk',
        scheme: 'AMP KiwiSaver Scheme',
        fund: 'Moderate Balanced',
        fees_till_65_dollars: 370580,
        fees_till_65_percent: 9.2,
        active: 'Active'
      }
    }, {
      row: 13,
      todays: {
        risk: 'Medium to high risk',
        scheme: 'ANZ KiwiSaver Scheme',
        fund: 'Balanced Growth',
        fees_till_65_dollars: 207510,
        fees_till_65_percent: 12.7,
        active: 'Active'
      },
      nominal: {
        risk: 'Medium to high risk',
        scheme: 'ANZ KiwiSaver Scheme',
        fund: 'Balanced Growth',
        fees_till_65_dollars: 484730,
        fees_till_65_percent: 9.8,
        active: 'Active'
      }
    }, {
      row: 35,
      todays: {
        risk: 'Medium to high risk',
        scheme: 'AonSaver Scheme',
        fund: 'Russell LifePoints 2045',
        fees_till_65_dollars: 196630,
        fees_till_65_percent: 11.9,
        active: 'Active'
      },
      nominal: {
        risk: 'Medium to high risk',
        scheme: 'AonSaver Scheme',
        fund: 'Russell LifePoints 2045',
        fees_till_65_dollars: 459240,
        fees_till_65_percent: 9.1,
        active: 'Active'
      }
    }, {
      row: 89,
      todays: {
        risk: 'Cash & Fixed Interest only',
        scheme: 'Grosvenor KiwiSaver Scheme',
        fund: 'Enhanced Income',
        fees_till_65_dollars: 74850,
        fees_till_65_percent: 12.4,
        active: 'Active'
      },
      nominal: {
        risk: 'Cash & Fixed Interest only',
        scheme: 'Grosvenor KiwiSaver Scheme',
        fund: 'Enhanced Income',
        fees_till_65_dollars: 165820,
        fees_till_65_percent: 9.0,
        active: 'Active'
      }
    }, {
      row: 105,
      todays: {
        risk: 'Medium to high risk',
        scheme: 'Law Retirement KiwiSaver Scheme',
        fund: 'Balanced Portfolio',
        fees_till_65_dollars: 198630,
        fees_till_65_percent: 12.1,
        active: 'Active'
      },
      nominal: {
        risk: 'Medium to high risk',
        scheme: 'Law Retirement KiwiSaver Scheme',
        fund: 'Balanced Portfolio',
        fees_till_65_dollars: 463510,
        fees_till_65_percent: 9.3,
        active: 'Active'
      }
    }]
  }, {
    month_born: 1,
    year_born: 1992,
    risk_profile: 4,
    employment: false,
    iac: true,
    salary: '',
    employee_contrib: '',
    employer_contrib: '',
    earnings: 30000,
    contrib_freq: 1,
    contrib: 200,
    expected: [{
      row: 1,
      todays: {
        risk: 'High risk',
        scheme: 'AMP KiwiSaver Scheme',
        fund: 'Aggressive',
        fees_till_65_dollars: 11730,
        fees_till_65_percent: 15.5,
        active: "Active"
      },
      nominal: {
        risk: 'High risk',
        scheme: 'AMP KiwiSaver Scheme',
        fund: 'Aggressive',
        fees_till_65_dollars: 26810,
        fees_till_65_percent: 11.6,
        active: "Active"
      }
    }, {
      row: 32,
      todays: {
        risk: 'Low risk',
        scheme: 'AonSaver Scheme',
        fund: 'Russell LifePoints 2015',
        fees_till_65_dollars: 5690,
        fees_till_65_percent: 22,
        active: "Active"
      },
      nominal: {
        risk: 'Low risk',
        scheme: 'AonSaver Scheme',
        fund: 'Russell LifePoints 2015',
        fees_till_65_dollars: 11940,
        fees_till_65_percent: 15.2,
        active: "Active"
      }
    }, {
      row: 200,
      todays: {
        risk: 'Medium risk',
        scheme: 'SuperLife',
        fund: 'Ethica',
        fees_till_65_dollars: 4580,
        fees_till_65_percent: 9.3,
        active: "Passive"
      },
      nominal: {
        risk: 'Medium risk',
        scheme: 'SuperLife',
        fund: 'Ethica',
        fees_till_65_dollars: 9970,
        fees_till_65_percent: 6.7,
        active: "Passive"
      }
    }]
  }, {
    month_born: 1,
    year_born: 1982,
    risk_profile: 2,
    employment: true,
    iac: true,
    salary: 55000,
    employee_contrib: 8,
    employer_contrib: 4,
    earnings: '',
    contrib_freq: '',
    contrib: '',
    expected: [{
      row: 1,
      todays: {
        risk: 'High risk',
        scheme: 'AMP KiwiSaver Scheme',
        fund: 'Aggressive',
        fees_till_65_dollars: 74440,
        fees_till_65_percent: 9.9,
        active: "Active"
      },
      nominal: {
        risk: 'High risk',
        scheme: 'AMP KiwiSaver Scheme',
        fund: 'Aggressive',
        fees_till_65_dollars: 143240,
        fees_till_65_percent: 8,
        active: "Active"
      }
    }, {
      row: 32,
      todays: {
        risk: 'Low risk',
        scheme: 'AonSaver Scheme',
        fund: 'Russell LifePoints 2015',
        fees_till_65_dollars: 36380,
        fees_till_65_percent: 9.8,
        active: "Active"
      },
      nominal: {
        risk: 'Low risk',
        scheme: 'AonSaver Scheme',
        fund: 'Russell LifePoints 2015',
        fees_till_65_dollars: 67810,
        fees_till_65_percent: 7.7,
        active: "Active"
      }
    }, {
      row: 200,
      todays: {
        risk: 'Medium risk',
        scheme: 'SuperLife',
        fund: 'Ethica',
        fees_till_65_dollars: 26850,
        fees_till_65_percent: 4.9,
        active: "Passive"
      },
      nominal: {
        risk: 'Medium risk',
        scheme: 'SuperLife',
        fund: 'Ethica',
        fees_till_65_dollars: 50900,
        fees_till_65_percent: 3.9,
        active: "Passive"
      }
    }]
  }]
});
