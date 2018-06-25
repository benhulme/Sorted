/*! investment_planner.js */
var SortedCalculator_InvestmentPlanner;
(function($) {
    'use strict';
    console.debug = true;
    SortedCalculator_InvestmentPlanner = SortedCalculator.extend({
        response: {
            DEFENSIVE: {
                MIN: 0,
                MAX: 20,
                CONST: 0,
            },
            CONSERVATIVE: {
                MIN: 21,
                MAX: 40,
                CONST: 1,
            },
            BALANCED: {
                MIN: 41,
                MAX: 60,
                CONST: 2,
            },
            GROWTH: {
                MIN: 61,
                MAX: 80,
                CONST: 3,
            },
            AGGRESSIVE: {
                MIN: 81,
                MAX: 100,
                CONST: 4,
            }
        },
        init: function() {
            this._super();
        },
        calculate: function(obj, testMode) {
            function cleanField(v, obj) {
                return (isNaN(parseInt(obj[v + '[und]'], 10)) ? null : parseInt(obj[v + '[und]'], 10));
            }
            var THRESHHOLD = 2,
                i, t = 0,
                fields = {};
            fields = {
                age: cleanField('field_ir2_age', obj),
                investment_length: cleanField('field_ir2_length', obj),
                income: cleanField('field_ir2_income', obj),
                job_security: cleanField('field_ir2_job_security', obj),
                risk: cleanField('field_ir2_risk', obj),
                you: cleanField('field_ir2_you', obj),
                importance: cleanField('field_ir2_importance', obj),
                savings: cleanField('field_ir2_savings', obj),
                debit: cleanField('field_ir2_debit', obj)
            };
            for (i in fields) {
                if (fields.hasOwnProperty(i)) {
                    if (fields[i] === null) {
                        return null;
                    }
                }
            }
            t = this.sum_array(fields);
            console.log('Total :: ' + t);
            if (isNaN(t)) {
                return null;
            } else {
                var key;
                for (key in this.response) {
                    if (this.response.hasOwnProperty(key)) {
                        if (t <= this.response[key].MAX) {
                            var investor = {
                                'label': null,
                                'lower': false
                            };
                            investor.label = this.response[key].CONST;
                            if (this.response[key].MIN !== 0 && t <= (this.response[key].MIN + THRESHHOLD)) {
                                investor.lower = true;
                            }
                            return investor;
                        }
                    }
                }
            }
        }
    });
})(jQuery);