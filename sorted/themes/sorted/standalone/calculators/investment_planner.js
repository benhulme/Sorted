var SortedCalculator_InvestmentPlanner;!function(e){"use strict";console.debug=!0,SortedCalculator_InvestmentPlanner=SortedCalculator.extend({response:{DEFENSIVE:{MIN:0,MAX:20,CONST:0},CONSERVATIVE:{MIN:21,MAX:40,CONST:1},BALANCED:{MIN:41,MAX:60,CONST:2},GROWTH:{MIN:61,MAX:80,CONST:3},AGGRESSIVE:{MIN:81,MAX:100,CONST:4}},init:function(){this._super()},calculate:function(e,r){function n(e,r){return isNaN(parseInt(r[e+"[und]"],10))?null:parseInt(r[e+"[und]"],10)}var i,t=0,s={};s={age:n("field_ir2_age",e),investment_length:n("field_ir2_length",e),income:n("field_ir2_income",e),job_security:n("field_ir2_job_security",e),risk:n("field_ir2_risk",e),you:n("field_ir2_you",e),importance:n("field_ir2_importance",e),savings:n("field_ir2_savings",e),debit:n("field_ir2_debit",e)};for(i in s)if(s.hasOwnProperty(i)&&null===s[i])return null;if(t=this.sum_array(s),console.log("Total :: "+t),isNaN(t))return null;var l;for(l in this.response)if(this.response.hasOwnProperty(l)&&t<=this.response[l].MAX){var o={label:null,lower:!1};return o.label=this.response[l].CONST,0!==this.response[l].MIN&&t<=this.response[l].MIN+2&&(o.lower=!0),o}}})}(jQuery);