/*! savings.js */
console.debug = false;
var debug = false;
var SortedCalculator_Savings = SortedCalculator.extend({
  init: function () {
    'use strict';
    if(debug) console.log('SortedCalculator_Savings.init');
    this._super();
  }, debug_mode: false, check_vars: function (teArray, flag) {
    'use strict';
    var i;
    for (i = 0; i < teArray.length; i += 1) {
      if (teArray[i] === null || teArray[i] === undefined) {
        if(debug) console.log(flag + ') found null or undefined in key [' + i + ']', teArray);
        return false;
      }
      if (isNaN(teArray[i])) {
        if(debug) console.log(flag + ') found NaN in key [' + i + ']', teArray);
        return false;
      }
    }
    return true;
  }, calculate: function (obj) {

    'use strict';
    if (this.debug_mode) {
      console.debug = true;
    }
    var work = {}, results = {}, today = new Date(), a, b;
    if(debug) console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX " + today.toString('HH:mm:ss'));
    if(debug) console.log("______________Incoming Input Object______________________");
    if(debug) console.dir(obj);
    obj = {
      type: (isNaN(parseInt(obj.type, 10)) ? 0 : parseInt(obj.type, 10)),
      saving_amount: (isNaN(parseFloat(obj.saving_amount, 10)) ? 0 : parseFloat(obj.saving_amount, 10)),
      regular_amount: (isNaN(parseFloat(obj.regular_amount, 10)) ? 0 : parseFloat(obj.regular_amount, 10)),
      saving_freq: (isNaN(parseInt(obj.saving_freq, 10)) ? null : parseInt(obj.saving_freq, 10)),
      starting: Date.parse(obj.starting),
      ending: Date.parse(obj.ending),
      initial_savings: (isNaN(parseFloat(obj.initial_savings, 10)) ? 0 : parseFloat(obj.initial_savings, 10)),
      interest_rate: (isNaN(parseFloat(obj.interest_rate, 10)) ? null : parseFloat(obj.interest_rate, 10)),
      age_month: (isNaN(parseInt(obj.age_month, 10)) ? null : parseInt(obj.age_month, 10)),
      age_year: (isNaN(parseInt(obj.age_year, 10)) ? null : parseInt(obj.age_year, 10)),
      nudge_dollars: (isNaN(parseFloat(obj.nudge_dollars, 10)) ? null : parseFloat(obj.nudge_dollars, 10)),
      iar: (isNaN(parseInt(obj.iar, 10)) ? 0 : parseInt(obj.iar, 10))
    };
    if(debug) console.log("______________Cleaned Input Object______________________");
    if(debug) console.dir(obj);
    work.type = null;
    if (obj.type !== null) {
      work.type = obj.type;
    }
    work.dob = null;
    if (this.check_vars([obj.age_month, obj.age_year], 'work.dob')) {
      work.dob = Date.parse('15-' + obj.age_month + '-' + obj.age_year);
    }
    work.span = null;
    if (this.check_vars([work.dob], 'work.span')) {
      work.span = new TimeSpan(Date.today() - work.dob);
    }
    work.regular = null;
    if (this.check_vars([obj.regular_amount], 'work.regular')) {
      work.regular = obj.regular_amount;
    }
    work.start = null;
    if (this.check_vars([obj.starting], 'work.start')) {
      work.start = obj.starting;
    }
    work.end = null;
    if (this.check_vars([obj.ending], 'work.end')) {
      work.end = obj.ending;
    }
    work.saved = null;
    if (this.check_vars([obj.initial_savings], 'work.saved')) {
      work.saved = obj.initial_savings;
    }
    work.goal = null;
    if (this.check_vars([obj.saving_amount], 'work.goal')) {
      work.goal = obj.saving_amount;
    }
    work.interest_rate = null;
    if (this.check_vars([obj.interest_rate], 'work.interest_rate')) {
      work.interest_rate = obj.interest_rate / 100;
    }
    work.freq = null;
    if (this.check_vars([obj.saving_freq], 'work.freq')) {
      work.freq = obj.saving_freq;
    }
    if (obj.iar === 1) {
      work.inflation_adjusted = true;
    } else {
      work.inflation_adjusted = false;
    }
    work.b23 = work.saved;
    work.b24 = work.regular;
    work.b25 = work.freq;
    work.b29 = work.interest_rate;
    work.b28 = constants.inflation_rate;
    work.b27 = null;
    if (this.check_vars([work.b29, work.b28], 'work.b27')) {
      work.b27 = (1 + work.b29) / (1 + work.b28) - 1;
    }
    work.b30 = null;
    if (this.check_vars([work.b27, work.b25], 'work.b30')) {
      work.b30 = Math.pow((1 + work.b27), (1 / work.b25)) - 1;
    }
    work.b34 = null;
    if (this.check_vars([work.end, work.start], 'work.b30')) {
      work.b34 = (work.end.getFullYear() - work.start.getFullYear()) + (work.end.getMonth() - work.start.getMonth()) / 12 + (work.end.getDate() - work.start.getDate()) / 365.25;
    }
    work.b35 = null;
    if (this.check_vars([work.start], 'work.b35')) {
      work.b35 = (work.start.getFullYear() - Date.today().getFullYear()) + (work.start.getMonth() - Date.today().getMonth()) / 12 + (work.start.getDate() - Date.today().getDate()) / 365.25;
    }
    work.b32 = null;
    if (this.check_vars([work.b29, work.b25], 'work.b32')) {
      work.b32 = ((Math.pow((1 + work.b29), (1 / work.b25))) - 1);
    }
    work.b31 = null;
    if (this.check_vars([work.b28, work.b25], 'work.b31')) {
      work.b31 = Math.pow((1 + work.b28), (1 / work.b25)) - 1;
    }
    work.b38 = null;
    if (work.b24 !== null && work.b29 !== null && work.b34 !== null && work.b32 !== null) {
      work.b38 = work.b24 * ((Math.pow((1 + work.b29), (work.b34))) - 1) / work.b32;
    }
    work.c37 = null;
    if (work.b23 !== null && work.b27 !== null && work.b34 !== null && work.b35 !== null) {
      work.c37 = work.b23 * Math.pow((1 + work.b27), (work.b34 + work.b35));
    }
    work.b37 = null;
    if (work.b23 !== null && work.b29 !== null && work.b34 !== null && work.b35 !== null) {
      work.b37 = work.b23 * Math.pow((1 + work.b29), (work.b34 + work.b35));
    }
    work.c38 = null;
    if (work.b38 !== null && work.b28 !== null && work.b34 !== null && work.b35 !== null) {
      work.c38 = work.b38 * Math.pow((1 + work.b28), -(work.b34 + work.b35));
    }
    work.c39 = null;
    if (work.c37 !== null && work.c38 !== null) {
      work.c39 = work.c37 + work.c38;
    }
    work.c41 = null;
    if (work.b24 !== null && work.b28 !== null && work.b34 !== null && work.b35 !== null && work.b23 !== null) {
      work.c41 = ((work.b24 * (1 - (Math.pow((1 + work.b28), (-work.b34)))) / work.b31) * Math.pow((1 + work.b28), -work.b35)) + work.b23;
    }
    work.b41 = null;
    if (work.b23 !== null && work.b24 !== null && work.b25 !== null && work.b34 !== null) {
      work.b41 = work.b23 + work.b24 * work.b25 * work.b34;
    }
    work.b39 = null;
    if (work.b37 !== null && work.b38 !== null) {
      work.b39 = work.b37 + work.b38;
    }
    work.c42 = null;
    if (work.c39 !== null && work.c41 !== null) {
      work.c42 = work.c39 - work.c41;
    }
    work.b42 = null;
    if (work.b39 !== null && work.b41 !== null) {
      work.b42 = work.b39 - work.b41;
    }
    work.b51 = work.b23;
    work.b52 = 0;
    if (obj.nudge_dollars !== null) {
      work.b52 = obj.nudge_dollars;
    }
    work.b53 = work.b25;
    work.b56 = constants.inflation_rate;
    work.b57 = work.b29;
    work.b55 = 0;
    if (work.b57 !== null && work.b56 !== null) {
      work.b55 = (1 + work.b57) / (1 + work.b56) - 1;
    }
    work.b58 = null;
    if (work.b55 !== null && work.b53 !== null) {
      work.b58 = (Math.pow((1 + work.b55), (1 / work.b53))) - 1;
    }
    work.b59 = null;
    if (work.b56 !== null && work.b53 !== null) {
      work.b59 = (Math.pow((1 + work.b56), (1 / work.b53))) - 1;
    }
    work.b60 = null;
    if (work.b57 !== null && work.b53 !== null) {
      work.b60 = (Math.pow((1 + work.b57), (1 / work.b53))) - 1;
    }
    work.b62 = work.b34;
    work.b63 = work.b35;
    work.b65 = null;
    if (work.b51 !== null && work.b57 !== null && work.b62 !== null && work.b63 !== null) {
      work.b65 = work.b51 * (Math.pow((1 + work.b57), (work.b62 + work.b63)));
    }
    work.b66 = null;
    if (work.b52 !== null && work.b57 !== null && work.b62 !== null && work.b60 !== null) {
      work.b66 = work.b52 * (Math.pow((1 + work.b57), work.b62) - 1) / work.b60;
    }
    work.b67 = null;
    if (work.b65 !== null && work.b66 !== null) {
      work.b67 = work.b65 + work.b66;
    }
    work.b69 = null;
    if (work.b51 !== null && work.b52 !== null && work.b53 !== null && work.b62 !== null) {
      work.b69 = work.b51 + work.b52 * work.b53 * work.b62;
    }
    work.b70 = null;
    if (work.b67 !== null && work.b69 !== null) {
      work.b70 = work.b67 - work.b69;
    }
    work.b72 = null;
    if (work.span !== null && work.b34 !== null && work.b35 !== null) {
      work.b72 = (work.span.getDays() / 365.25) + (work.b62 + work.b63);
    }
    work.c65 = null;
    if (work.b51 !== null && work.b55 !== null && work.b62 !== null && work.b63 !== null) {
      work.c65 = work.b51 * (1 + (Math.pow((1 + work.b55), (work.b62 + work.b63))));
    }
    work.c66 = null;
    if (work.b66 !== null && work.b56 !== null && work.b62 !== null && work.b63 !== null) {
      work.c66 = work.b66 * (Math.pow((1 + work.b56), -(work.b62 + work.b63)));
    }
    work.c67 = null;
    if (work.c65 !== null && work.c66 !== null) {
      work.c67 = work.c65 + work.c66;
    }
    work.c69 = null;
    if (work.b52 !== null && work.b56 !== null && work.b62 !== null && work.b59 !== null && work.b63 !== null && work.b51 !== null) {
      work.c69 = ((work.b52 * (1 - (Math.pow((1 + work.b56), (-work.b62)))) / work.b59) * (Math.pow((1 + work.b59), -work.b63)) + work.b51);
    }
    work.c70 = null;
    if (work.c67 !== null && work.c69 !== null) {
      work.c70 = work.c67 - work.c69;
    }
    work.f23 = work.b23;
    work.f25 = null;
    if (obj.saving_freq !== null) {
      work.f25 = obj.saving_freq;
    }
    work.f27 = work.b27;
    work.f28 = work.b28;
    work.f30 = work.b30;
    work.f31 = work.b31;
    work.f32 = work.b32;
    work.f34 = work.b34;
    work.f35 = work.b35;
    work.f37 = work.b37;
    work.g37 = work.c37;
    work.f39 = obj.saving_amount;
    work.g39 = null;
    if (work.f39 !== null && work.f28 !== null && work.f34 !== null && work.f35 !== null) {
      work.g39 = work.f39 * Math.pow(1 + work.f28, -(work.f34 + work.f35));
    }
    work.f38 = null;
    if (this.check_vars([work.f39, work.f37], 'work.f38')) {
      work.f38 = work.f39 - work.f37;
    }
    work.f29 = obj.interest_rate / 100;
    work.g38 = null;
    if (work.g39 !== null && work.g37 !== null) {
      work.g38 = work.g39 - work.g37;
    }
    work.f24 = null;
    if (this.check_vars([work.f38, work.f29, work.f32, work.f34], 'work.f24')) {
      work.f24 = work.f38 / ((Math.pow((1 + work.f29), (work.f34)) - 1) / work.f32);
    }
    work.f41 = null;
    if (work.f23 !== null && work.f24 !== null && work.f25 !== null && work.f34 !== null) {
      work.f41 = work.f23 + work.f24 * work.f25 * work.f34;
    }
    work.g41 = null;
    if (work.f24 !== null && work.f28 !== null && work.f34 !== null && work.f31 !== null && work.f35 !== null && work.f23 !== null) {
      work.g41 = work.f24 * (1 - Math.pow(1 + work.f28, -work.f34)) / work.f31 * Math.pow(1 + work.f28, -work.f35) + work.f23;
    }
    work.f42 = null;
    if (work.f39 !== null && work.f41 !== null) {
      work.f42 = work.f39 - work.f41;
    }
    work.g42 = null;
    if (work.g39 !== null && work.g41 !== null) {
      work.g42 = this.round_negative((work.g39 - work.g41), 4);
    }
    work.b44 = null;
    if (work.span !== null && work.b34 !== null && work.b35 !== null) {
      a = Date.parse('15-' + obj.age_month + '-' + obj.age_year);
      b = Date.today();
      a.setHours(0, 0, 0);
      b.setHours(0, 0, 0);
      work.span = new TimeSpan(b - a);
      work.b44 = (work.span.getDays() / 365.25) + (work.b34 + work.b35);
    }
    work.f44 = null;
    if (work.span !== null && work.f34 !== null && work.f35 !== null) {
      a = Date.parse('15-' + obj.age_month + '-' + obj.age_year);
      b = Date.today();
      a.setHours(0, 0, 0);
      b.setHours(0, 0, 0);
      work.span = new TimeSpan(b - a);
      work.f44 = (work.span.days / 365.25) + (work.f34 + work.f35);
    }
    work.f51 = work.f23;
    work.f52 = 0;
    if (obj.nudge_dollars !== null) {
      work.f52 = obj.nudge_dollars;
    }
    work.f53 = work.f25;
    work.f56 = work.f28;
    work.f57 = work.f29;
    work.f55 = null;
    if (work.f57 !== null && work.f56 !== null) {
      work.f55 = (1 + work.f57) / (1 + work.f56) - 1;
    }
    work.f58 = null;
    if (work.f55 !== null && work.f53 !== null) {
      work.f58 = (Math.pow((1 + work.f55), (1 / work.f53))) - 1;
    }
    work.f59 = null;
    if (work.f56 !== null && work.f53 !== null) {
      work.f59 = (Math.pow((1 + work.f56), (1 / work.f53))) - 1;
    }
    work.f60 = null;
    if (work.f57 !== null && work.f53 !== null) {
      work.f60 = (Math.pow((1 + work.f57), (1 / work.f53))) - 1;
    }
    work.f67 = work.f39;
    work.f63 = work.f35;
    work.f62 = null;
    if (this.check_vars([work.f67, work.f60, work.f52, work.f51, work.f57, work.f63, work.f60], 'work.f62')) {
      work.f62 = Math.log(((work.f67 * work.f60 + work.f52) / (work.f52 + work.f51 * (Math.pow((1 + work.f57), work.f63) * work.f60)))) / Math.log(1 + work.f57);
    }
    work.f65 = null;
    if (work.f51 !== null && work.f55 !== null && work.f56 !== null && work.f62 !== null && work.f63 !== null) {
      work.f65 = work.f51 * (Math.pow(((1 + work.f55) * (1 + work.f56)), (work.f62 + work.f63)));
    }
    work.g65 = null;
    if (work.f51 !== null && work.f55 !== null && work.f62 !== null && work.f63 !== null) {
      work.g65 = work.f51 * (Math.pow((1 + work.f55), (work.f62 + work.f63)));
    }
    work.f66 = null;
    if (work.f67 !== null && work.f65 !== null) {
      work.f66 = work.f67 - work.f65;
    }
    work.g67 = null;
    if (work.f67 !== null && work.f28 !== null && work.f62 !== null && work.f63 !== null) {
      work.g67 = work.f67 * (Math.pow((1 + work.f28), -(work.f62 + work.f63)));
    }
    work.g66 = null;
    if (work.g67 !== null && work.g65 !== null) {
      work.g66 = work.g67 - work.g65;
    }
    work.f69 = null;
    if (work.f51 !== null && work.f52 !== null && work.f53 !== null && work.f62 !== null) {
      work.f69 = work.f51 + work.f52 * work.f53 * work.f62;
    }
    work.g69 = null;
    if (work.f52 !== null && work.f56 !== null && work.f62 !== null && work.f59 !== null && work.f63 !== null && work.f51 !== null) {
      work.g69 = (work.f52 * (1 - (Math.pow((1 + work.f56), -(work.f62)))) / work.f59) * (Math.pow((1 + work.f56), -(work.f63))) + work.f51;
    }
    work.f70 = null;
    if (work.f67 !== null && work.f69 !== null) {
      work.f70 = work.f67 - work.f69;
    }
    work.g70 = null;
    if (work.g67 !== null && work.g69 !== null) {
      work.g70 = work.g67 - work.g69;
    }
    work.f72 = null;
    if (work.span !== null && work.b34 !== null && work.b35 !== null) {
      a = Date.parse('15-' + obj.age_month + '-' + obj.age_year);
      b = Date.today();
      a.setHours(0, 0, 0);
      b.setHours(0, 0, 0);
      work.span = new TimeSpan(b - a);
      work.f72 = (work.span.getDays() / 365.25) + (work.f62 + work.f63);
    }
    if(debug) console.log('><<<>>><<<>>><<<>>>Workings<<<>>><<<>>><<<>>><');
    if (work.type === 0) {
      if(debug) console.log("** Regular Mode **");
      if(debug) console.log("B23: " + work.b23);
      if(debug) console.log("B24: " + work.b24);
      if(debug) console.log("B25: " + work.b25);
      if(debug) console.log("B27: " + work.b27);
      if(debug) console.log("B28: " + work.b28);
      if(debug) console.log("B29: " + work.b29);
      if(debug) console.log("B31: " + work.b31);
      if(debug) console.log("B32: " + work.b32);
      if(debug) console.log("B34: " + work.b34);
      if(debug) console.log("B35: " + work.b35);
      if(debug) console.log("B37: " + work.b37 + " C37: " + work.c37);
      if(debug) console.log("B38: " + work.b38 + " C38: " + work.c38);
      if(debug) console.log("B39: " + work.b39 + " C39: " + work.c39);
      if(debug) console.log("B41: " + work.b41 + " C41: " + work.c41);
      if(debug) console.log("B42: " + work.b42 + " C42: " + work.c42);
      if(debug) console.log("B44: " + work.b44);
      if(debug) console.log("=============Nudge======================");
      if(debug) console.log("B51: " + work.b51);
      if(debug) console.log("B52: " + work.b52);
      if(debug) console.log("B53: " + work.b53);
      if(debug) console.log("B55: " + work.b55);
      if(debug) console.log("B56: " + work.b56);
      if(debug) console.log("B57: " + work.b57);
      if(debug) console.log("B58: " + work.b58);
      if(debug) console.log("B59: " + work.b59);
      if(debug) console.log("B60: " + work.b60);
      if(debug) console.log("B62: " + work.b62);
      if(debug) console.log("B63: " + work.b63);
      if(debug) console.log("B65: " + work.b65 + " C65: " + work.c65);
      if(debug) console.log("B66: " + work.b66 + " C66: " + work.c66);
      if(debug) console.log("B67: " + work.b67 + " C67: " + work.c67);
      if(debug) console.log("B69: " + work.b69 + " C69: " + work.c69);
      if(debug) console.log("B70: " + work.b70 + " C70: " + work.c70);
      if(debug) console.log("B72: " + work.b72);
    } else if (obj.type === 1) {
      if(debug) console.log("** Goal Mode **");
      if(debug) console.log("F23: " + work.f23);
      if(debug) console.log("F24: " + work.f24);
      if(debug) console.log("F25: " + work.f25);
      if(debug) console.log("F27: " + work.f27);
      if(debug) console.log("F28: " + work.f28);
      if(debug) console.log("F29: " + work.f29);
      if(debug) console.log("F30: " + work.f30);
      if(debug) console.log("F31: " + work.f31);
      if(debug) console.log("F32: " + work.f32);
      if(debug) console.log("F34: " + work.f34);
      if(debug) console.log("F35: " + work.f35);
      if(debug) console.log("F37: " + work.f37 + " G37: " + work.g37);
      if(debug) console.log("F38: " + work.f38 + " G38: " + work.g38);
      if(debug) console.log("F39: " + work.f39 + " G39: " + work.g39);
      if(debug) console.log("F41: " + work.f41 + " G41: " + work.g41);
      if(debug) console.log("F42: " + work.f42 + " G42: " + work.g42);
      if(debug) console.log("F44: " + work.f44);
      if(debug) console.log("=============Nudge======================");
      if(debug) console.log("F51: " + work.f51);
      if(debug) console.log("F52: " + work.f52);
      if(debug) console.log("F53: " + work.f53);
      if(debug) console.log("F55: " + work.f55);
      if(debug) console.log("F56: " + work.f56);
      if(debug) console.log("F57: " + work.f57);
      if(debug) console.log("F58: " + work.f58);
      if(debug) console.log("F59: " + work.f59);
      if(debug) console.log("F60: " + work.f60);
      if(debug) console.log("F62: " + work.f62);
      if(debug) console.log("F63: " + work.f63);
      if(debug) console.log("F65: " + work.f65 + " G65: " + work.g65);
      if(debug) console.log("F66: " + work.f66 + " G66: " + work.g66);
      if(debug) console.log("F67: " + work.f67 + " G67: " + work.g67);
      if(debug) console.log("F69: " + work.f69 + " G69: " + work.g69);
      if(debug) console.log("F70: " + work.f70 + " G70: " + work.g70);
      if(debug) console.log("F72: " + work.f72);
    }
    if (work.type === 0) {
      if(debug) console.log('-----------------Regular ---------------->');
      work.total = work.b39;
      if (work.inflation_adjusted === true) {
        work.total = work.c39;
      }
      work.contributions = work.b41;
      if (work.inflation_adjusted === true) {
        work.contributions = work.c41;
      }
      work.interest = work.b42;
      work.nudge_interest = work.b70;
      work.nudge_total_saved = work.b67;
      if (work.inflation_adjusted === true) {
        work.contributions = work.c41;
        work.interest = work.c42;
        work.nudge_interest = work.c70;
        work.nudge_total_saved = work.c67;
      }
      results.total = this.round(work.total, 2);
      results.contributions = this.round(work.contributions, 2);
      results.interest = this.round(work.interest, 2);
      results.period = Math.ceil((work.b34 * 12), 2);
      results.age = this.trunc(work.b44);
      results.total_saved = null;
      results.nudge_age = this.trunc(work.b72);
      results.nudge_interest = this.round(work.nudge_interest, 2);
      results.nudge_period = this.round_negative((work.b62) * 12, 2);
      results.nudge_total = obj.nudge_dollars;
      results.nudge_total_saved = this.round(work.nudge_total_saved, 2);
    } else {
      if(debug) console.log('-----------------Goal ---------------->');
      work.total = work.f24;
      work.contributions = work.f39;
      work.interest = work.f42;
      work.nudge_interest = work.f70;
      work.nudge_total_saved = work.f67;
      if (work.inflation_adjusted === true) {
        work.contributions = work.g39;
        work.interest = work.g42;
        work.nudge_interest = work.g70;
        work.nudge_total_saved = work.g67;
      }
      results.contributions = null;
      results.total = this.round(work.total, 2);
      results.total_saved = this.round(work.contributions, 2);
      results.interest = this.round(work.interest, 2);
      results.period = Math.ceil((work.f34 + work.f35) * 12, 0);
      results.age = this.trunc(work.f44);
      results.nudge_age = this.trunc(work.f72);
      results.nudge_interest = this.round(work.nudge_interest, 2);
      results.nudge_period = this.roundUP((work.f62 + work.f63) * 12, 0);
      results.nudge_total = obj.nudge_dollars;
      results.nudge_total_saved = this.round(work.nudge_total_saved, 2);
    }
    if (results.age === 0) {
      results.age = null;
    }
    if(debug) console.log('______________Returned Output Object______________________');
    if(debug) console.dir(results);
    return results;
  }
});
var testmode = false;
var testObj1 = {
  type: "1",
  saving_amount: "5000",
  regular_amount: "",
  saving_freq: 26,
  starting: "21/12/2011",
  ending: "21/12/2015",
  initial_savings: 100,
  interest_rate: 2,
  age_month: 6,
  age_year: 1985,
  iar: 0,
  nudge_dollars: 50,
  expected: {
    age: 30,
    contributions: null,
    interest: 195.64,
    period: 37,
    total: 45.23,
    total_saved: 5000,
    nudge_age: 30,
    nudge_interest: 177.54,
    nudge_period: 32,
    nudge_total: 50,
    nudge_total_saved: 5000
  }
};
var testObj2 = {
  type: "0",
  saving_amount: "",
  regular_amount: "50.13",
  saving_freq: "52",
  starting: "28/11/2012",
  ending: "28/01/2013",
  initial_savings: "0",
  interest_rate: "2",
  age_month: "6",
  age_year: "1985",
  iar: 0,
  nudge_dollars: "60",
  expected: {
    age: 27,
    contributions: 50.13,
    interest: 0.63,
    period: 2,
    total: 435.09,
    total_saved: '',
    nudge_age: 27,
    nudge_interest: 0.76,
    nudge_period: 2,
    nudge_total: 60,
    nudge_total_saved: 520.76
  }
};
var testObj3 = {
  type: "1",
  saving_amount: "52",
  regular_amount: "",
  saving_freq: "52",
  starting: "01/01/2013",
  ending: "01/01/2014",
  initial_savings: "0",
  interest_rate: "14.7",
  age_month: "11",
  age_year: "1984",
  iar: 0,
  nudge_dollars: "300",
  expected: {
    age: 29,
    contributions: null,
    interest: 3.42,
    period: 13,
    total: 0.93,
    total_saved: 52,
    nudge_age: 28,
    nudge_interest: -0.06,
    nudge_period: 1,
    nudge_total: 300,
    nudge_total_saved: 52
  }
};
var testObj4 = {
  type: "1",
  saving_amount: "5000",
  regular_amount: "",
  saving_freq: "52",
  starting: "04/01/2013",
  ending: "13/03/2013",
  initial_savings: "200",
  interest_rate: "5.2",
  age_month: "1",
  age_year: "1913",
  iar: 1,
  nudge_dollars: 530,
  expected: {
    age: 100,
    contributions: null,
    interest: 14.25,
    period: 4,
    total: 480.15,
    total_saved: 5000,
    nudge_age: 100,
    nudge_interest: 12.83,
    nudge_period: 3,
    nudge_total: 530,
    nudge_total_saved: 4976.80
  }
};
var testObj5 = {
  type: "0",
  saving_amount: "",
  regular_amount: "1",
  saving_freq: "52",
  starting: "31/01/2020",
  ending: "31/01/2021",
  initial_savings: "",
  interest_rate: "2",
  age_month: "1",
  age_year: "2000",
  iar: 0,
  nudge_dollars: 10,
  expected: {
    age: 21,
    contributions: 1,
    interest: 0.51,
    period: 12,
    total: 52.51,
    total_saved: '',
    nudge_age: 21,
    nudge_interest: 5.08,
    nudge_period: 12,
    nudge_total: 10,
    nudge_total_saved: 525.08
  }
};
var testObj6 = {
  type: "0",
  saving_amount: "52",
  regular_amount: "100",
  saving_freq: "52",
  starting: "31/01/2020",
  ending: "31/01/2021",
  initial_savings: "",
  interest_rate: "2",
  age_month: "1",
  age_year: "2000",
  iar: 0,
  nudge_dollars: 110,
  expected: {
    age: 21,
    contributions: 100,
    interest: 50.83,
    period: 12,
    total: 5250.83,
    total_saved: '',
    nudge_age: 21,
    nudge_interest: 55.91,
    nudge_period: 12,
    nudge_total: 110,
    nudge_total_saved: 5775.91
  }
};
if (testmode === true) {
  (function ($) {
    'use strict';
    $(document).ready(function () {
      $('html').append("<h1>TESTMODE</h1>").append("<input id='calculate-test' type='button' value='test calc' />");
    });
    function testCalcLogic() {
      var test = new SortedCalculator_Savings(), candidate = testObj3, results = test.calculate(candidate), mode, i, str;
      mode = 'all';
      if (mode === 'one') {
        candidate = testObj6;
        results = test.calculate(candidate, true);
        console.debug = true;
        if(debug) console.log('><><><><> INPUT <><><><><');
        if(debug) console.dir(candidate);
        if(debug) console.log('><><><><> OUTPUT <><><><><');
        if(debug) console.dir(results);
        console.debug = false;
      } else {
        for (i = 1; i <= 9; i += 1) {
          if(debug) console.log('testing case' + i);
          candidate = window['testObj' + i];
          results[i] = test.calculate(candidate, true);
          str = "<div style='padding: 40px; background: #eee; color:#333; font-family: verdana;'><a name='testresults" + i + "'></a><h2>Test Case " + i + "</h2>";
          if (results[i].age === candidate.expected.age) {
            str += "<p>Age: <span style='color:green'>PASS</span> " + results[i].age + "</p>";
          } else {
            str += "<p>Age: <span style='color:red'>FAIL</span> " + results[i].age + ' != ' + candidate.expected.age + "</p>";
          }
          if (results[i].interest === candidate.expected.interest) {
            str += "<p>Interest: <span style='color:green'>PASS</span> " + results[i].interest + "</p>";
          } else {
            str += "<p>Interest: <span style='color:red'>FAIL</span> " + results[i].interest + ' != ' + candidate.expected.interest + "</p>";
          }
          if (results[i].period === candidate.expected.period) {
            str += "<p>Period: <span style='color:green'>PASS</span> " + results[i].period + "</p>";
          } else {
            str += "<p>Period: <span style='color:red'>FAIL</span> " + results[i].period + ' != ' + candidate.expected.period + "</p>";
          }
          if (results[i].total === candidate.expected.total) {
            str += "<p>Total: <span style='color:green'>PASS</span> " + results[i].total + "</p>";
          } else {
            str += "<p>Total: <span style='color:red'>FAIL</span> " + results[i].total + ' != ' + candidate.expected.total + "</p>";
          }
          str += "<p>Nudge</p>";
          if (results[i].nudge_age === candidate.expected.nudge_age) {
            str += "<p>nudge_Age: <span style='color:green'>PASS</span> " + results[i].nudge_age + "</p>";
          } else {
            str += "<p>nudge_Age: <span style='color:red'>FAIL</span> " + results[i].nudge_age + ' != ' + candidate.expected.nudge_age + "</p>";
          }
          if (results[i].nudge_interest === candidate.expected.nudge_interest) {
            str += "<p>nudge_Interest: <span style='color:green'>PASS</span> " + results[i].nudge_interest + "</p>";
          } else {
            str += "<p>nudge_Interest: <span style='color:red'>FAIL</span> " + results[i].nudge_interest + ' != ' + candidate.expected.nudge_interest + "</p>";
          }
          if (results[i].nudge_period === candidate.expected.nudge_period) {
            str += "<p>nudge_Period: <span style='color:green'>PASS</span> " + results[i].nudge_period + "</p>";
          } else {
            str += "<p>nudge_Period: <span style='color:red'>FAIL</span> " + results[i].nudge_period + ' != ' + candidate.expected.nudge_period + "</p>";
          }
          if (results[i].nudge_total === candidate.expected.nudge_total) {
            str += "<p>nudge_Total: <span style='color:green'>PASS</span> " + results[i].nudge_total + "</p>";
          } else {
            str += "<p>nudge_Total: <span style='color:red'>FAIL</span> " + results[i].nudge_total + ' != ' + candidate.expected.nudge_total + "</p>";
          }
          if (results[i].nudge_total_saved === candidate.expected.nudge_total_saved) {
            str += "<p>nudge_Total Saved: <span style='color:green'>PASS</span> " + results[i].nudge_total_saved + "</p>";
          } else {
            str += "<p>nudge_Total Saved: <span style='color:red'>FAIL</span> " + results[i].nudge_total_saved + ' != ' + candidate.expected.nudge_total_saved + "</p>";
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
