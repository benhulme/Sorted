var SortedCalculator_RiskRecommender=SortedCalculator.extend({response:{LOW:0,MEDIUM:1,HIGH:2},init:function(){"use strict";this._parent()},calculate:function(e,r){"use strict";r===!0&&(console.debug=!0),e={age:isNaN(parseInt(e["field_rr_age[und]"],10))?null:parseInt(e["field_rr_age[und]"],10),assets:isNaN(parseInt(e["field_rr_assets[und]"],10))?null:parseInt(e["field_rr_assets[und]"],10),debt:isNaN(parseInt(e["field_rr_debt[und]"],10))?null:parseInt(e["field_rr_debt[und]"],10),important:isNaN(parseInt(e["field_rr_important[und]"],10))?null:parseInt(e["field_rr_important[und]"],10),income:isNaN(parseInt(e["field_rr_income[und]"],10))?null:parseInt(e["field_rr_income[und]"],10),job_security:isNaN(parseInt(e["field_rr_job_security[und]"],10))?null:parseInt(e["field_rr_job_security[und]"],10),length:isNaN(parseInt(e["field_rr_length[und]"],10))?null:parseInt(e["field_rr_length[und]"],10),savings:isNaN(parseInt(e["field_rr_savings[und]"],10))?null:parseInt(e["field_rr_savings[und]"],10),support:isNaN(parseInt(e["field_rr_support[und]"],10))?null:parseInt(e["field_rr_support[und]"],10),you:isNaN(parseInt(e["field_rr_you[und]"],10))?null:parseInt(e["field_rr_you[und]"],10)};var n,t=0;for(n in e)if(e.hasOwnProperty(n)&&null===e[n])return null;return t=0,t=this.sum_array([3*e.age,e.income,e.support,2*e.job_security,e.savings,e.assets,3*e.length,e.debt,2*e.you,2*e.important]),console.log("Total :: "+t),isNaN(t)?null:t<=145?this.response.LOW:t>=226?this.response.HIGH:this.response.MEDIUM}}),testmode=!1,testObj={"field_rr_age[und]":25,"field_rr_income[und]":10,"field_rr_support[und]":10,"field_rr_job_security[und]":10,"field_rr_savings[und]":10,"field_rr_assets[und]":10,"field_rr_length[und]":10,"field_rr_debt[und]":10,"field_rr_you[und]":10,"field_rr_important[und]":10};testmode===!0&&function(e){"use strict";function r(){var e=new SortedCalculator_RiskRecommender,r=e.calculate(testObj,!0);console.log("><><><><> INPUT <><><><><"),console.dir(testObj),console.log("><><><><> OUTPUT <><><><><"),console.dir(r)}e(document).ready(function(){e("html").append("<h1>TESTMODE</h1>").append("<input id='calculate-test' type='button' value='test calc' />")}),e("#calculate-test").live("click",function(){r()})}(jQuery);