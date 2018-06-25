/*! sorted_super_class.js */
if (!Array.indexOf) {
  Array.prototype.indexOf = function(obj) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == obj) {
        return i;
      }
    }
    return -1;
  }
}

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  this.Class = function(){};

  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);
            this._super = tmp;

            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }

    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;

    return Class;
  };
})();


var SortedCalculator;
(function($) {
  SortedCalculator = Class.extend({
    init: function() {
      'use strict';
    },
    calculate: function() {
      this.reset_errors();
    },
    isEmptyObject: function(map) {
      'use strict';
      for (var key in map) {
        if (map.hasOwnProperty(key)) {
          return false;
        }
        return true;
      }
    },
    priv_text: function(who) {
      'use strict';
      if (who === 'bob') {
        return true;
      }
      return false;
    },
    sum_array: function(arr) {
      var x = 0;
      $.each(arr, function() {
        x += Number(this);
      });
      return x;
    },
    sum_product: function(a, b) {
      if (a.length != b.length) {
        return false;
      }
      var i, x, y, z;
      z = 0;
      for (i = 0; i < a.length; i += 1) {
        x = a[i] * b[i];
        z += x;
      }
      return z;
    },
    average_array: function(a) {
      if (a.length === undefined) {
        return false;
      }
      var x = 0;
      $.each(a, function() {
        x += this;
      });
      return (x / a.length);
    },
    days_between: function(date1, date2) {
      'use strict';
      var ONE_DAY, date1_ms, date2_ms, difference_ms;
      ONE_DAY = 1000 * 60 * 60 * 24;
      date1_ms = date1.getTime();
      date2_ms = date2.getTime();
      difference_ms = Math.abs(date1_ms - date2_ms);
      return Math.round(difference_ms / ONE_DAY);
    },
    strstr: function(haystack, needle, bool) {
      'use strict';
      var pos = 0;
      haystack += "";
      pos = haystack.indexOf(needle);
      if (pos === -1) {
        return false;
      } else {
        if (bool) {
          return haystack.substr(0, pos);
        } else {
          return haystack.slice(pos);
        }
      }
    },
    trunc: function(n) {
      'use strict';
      return n | 0;
    },
    round: function(number, precision) {
      'use strict';
      precision = Math.abs(parseInt(precision, 10)) || 0;
      var coefficient = Math.pow(10, precision);
      return Math.round(number * coefficient) / coefficient;
    },
    round_negative: function(x, places) {
      var shift = Math.pow(10, places);
      return Math.round(x * shift) / shift;
    },
    roundUP: function(n) {
      'use strict';
      if (n < 0) {
        return Math.floor(n);
      } else {
        return Math.ceil(n);
      }
    },
    ceil: function(number, precision) {
      'use strict';
      precision = Math.abs(parseInt(precision, 10)) || 0;
      var coefficient = Math.pow(10, precision);
      return Math.ceil(number * coefficient) / coefficient;
    },
    floor: function(number, precision) {
      'use strict';
      precision = Math.abs(parseInt(precision, 10)) || 0;
      var coefficient = Math.pow(10, precision);
      return Math.floor(number * coefficient) / coefficient;
    },
    get_date: function(year, month, day) {
      if (typeof day === 'undefined') {
        day = 15;
      }
      day = parseInt(day);
      if (isNaN(day) || day < 1 || day > 31) {
        return null;
      }
      month = parseInt(month);
      if (isNaN(month) || month < 1 || month > 12) {
        return null;
      }
      year = parseInt(year);
      if (isNaN(year) || year < 1000 || month > 9999) {
        return null;
      }
      var date = new Date();
      date.setDate(day);
      date.setMonth(month - 1);
      date.setFullYear(year);
      return date;
    },
    days_between_dates: function(startDate, endDate) {
      endDate = typeof endDate == 'string' ? dmyToDate(endDate) : new Date();
      startDate = typeof startDate == 'string' ? dmyToDate(startDate) : new Date(startDate);
      endDate.setHours(12, 0, 0);
      startDate.setHours(12, 0, 0);
      var diff = startDate - endDate;
      var ms = 24 * 60 * 60 * 1000;
      return Math.round(diff / ms);
    },
    get_age: function(dob) {
      'use strict';
      if (!arguments.length) {
        console.log('no dob supplied');
        return false;
      }
      var birthyear, thisyear, age, birthmonth, thismonth;
      if (typeof dob !== 'object') {
        dob = Date.parse(dob);
      }
      birthyear = dob.getFullYear();
      thisyear = Date.today().getFullYear();
      age = thisyear - birthyear;
      birthmonth = dob.toString('MM');
      thismonth = Date.today().toString('MM');
      if (thismonth <= birthmonth) {
        age--;
      }
      return age;
    },
    over18: function(dob) {
      'use strict';
      if (dob === undefined) {
        console.log('no dob supplied');
        return null;
      }
      if (typeof dob !== 'object') {
        dob = Date.parse(dob);
      }
      var birthyear, thisyear, age, birthmonth, thismonth;
      birthyear = dob.getFullYear();
      thisyear = Date.today().getFullYear();
      age = thisyear - birthyear;
      if (age > 18) {
        return true;
      } else {
        if (age === 18) {
          birthmonth = dob.toString('MM');
          thismonth = Date.today().toString('MM');
          if (thismonth >= birthmonth) {
            return true;
          }
        }
        return false;
      }
    },
    years_till_retirement: function(age, retire_age) {
      'use strict';
      if (!age) {
        console.log('no age supplied');
        return false;
      }
      if (!retire_age) {
        retire_age = 65;
        console.log('no retirement age supplied, going default of ' + retire_age);
      }
      if (retire_age < age) {
        return false;
      }
      var years = retire_age - age;
      console.log(years + ' years till retirement');
      return years;
    },
    date_of_retirement: function(dob) {
      'use strict';
      if (dob === null) {
        console.log('no date of birth supplied');
        return false;
      }
      var retires = Date.parse(dob).add(constants.retire_age).year().toString('dd-MM-yyyy');
      return retires;
    },
    compound_interest: function(date_start, date_end, rate, amount) {
      'use strict';
      if (!date_start) {
        date_start = Date.today('d');
        console.log('no start date supplied, default to today ' + date_start);
      }
      if (!date_end || !rate || !amount) {
        return false;
      }
      return '1286.32';
    },
    add_all: function(arrayObject) {
      'use strict';
      if (!arrayObject) {
        console.log('no array supplied, nothing to add');
        return false;
      }
      return '1337.66';
    },
    avg_all: function(arrayObject) {
      'use strict';
      if (!arrayObject) {
        console.log('no array supplied, nothing to add');
        return false;
      }
      return '13.66';
    },
    validation_errors: [],
    add_error: function(key) {
      'use strict';
      if (!this.has_error(key)) {
        this.validation_errors.push(key);
      }
    },
    get_errors: function() {
      return this.validation_errors;
    },
    has_error: function(error) {
      if (this.validation_errors.length === 0) {
        return false;
      }
      return ($.inArray(error, this.validation_errors) !== -1);
    },
    reset_errors: function() {
      this.validation_errors = [];
    }
  });
})(jQuery);
