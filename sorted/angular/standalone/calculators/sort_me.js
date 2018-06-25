/*! sort_me.js */
console.debug=false;var testMode=false;var SortedCalculator_SortMe=SortedCalculator.extend({init:function(){'use strict';console.log('SortedCalculator_SortMe.init');this._parent();},q1:function(obj){'use strict';if(obj.goals===null){return null;}
if(obj.goals===2){return 2;}
return 1;},q2:function(obj){'use strict';if(obj.how_far===null||obj.income_satisfaction===null||obj.prepared===null){return null;}
this.level1=3;this.level2=2;this.level3=3;if(obj.how_far===1||obj.how_far===2){this.level1=1;}
if(obj.how_far===3){this.level1=2;}
if(obj.income_satisfaction===1){this.level2=1;}
if(obj.prepared===1){this.level3=1;}
if(obj.prepared===2||obj.prepared===3){this.level3=2;}
return Math.max(this.level1,this.level2,this.level3);},q3:function(obj){'use strict';if(obj.mortgage===null||obj.other_debts===null){return null;}
this.level2=3;this.level3=3;if(obj.mortgage===1&&obj.mortgage_payments===null){return null;}else if(obj.mortgage===1){if(obj.mortgage_payments===3){this.level2=2;}
if(obj.mortgage_payments===1||obj.mortgage_payments===2){this.level2=1;}
if(obj.other_debts===3){this.level3=2;}
if(obj.other_debts===1||obj.other_debts===2){this.level3=1;}
return Math.max(this.level2,this.level3);}else{if(obj.other_debts===3){this.level3=2;}
if(obj.other_debts===1||obj.other_debts===2){this.level3=1;}
return this.level3;}},q4:function(obj){'use strict';this.level1=2;this.level2=2;this.level3=1;this.level4=2;this.level5=2;this.level6=2;if(obj.net_worth===null||obj.regular_savings===null||obj.kiwisaver===null||obj.investments===null){return null;}
if(obj.investments===1&&(obj.portfolio===null||obj.overseas_funds===null)){return null;}else if(obj.investments===1){this.level1=(obj.net_worth===1)?1:2;this.level2=(obj.regular_savings===1)?1:2;this.level4=1;this.level5=(obj.portfolio===1)?1:2;this.level6=(obj.overseas_funds===1)?1:2;}else{this.level1=(obj.net_worth===1)?1:2;this.level2=(obj.regular_savings===1)?1:2;this.level4=1;this.level5=1;this.level6=1;}
return Math.max(this.level1,this.level2,this.level3,this.level4,this.level5,this.level6);},q5:function(obj){'use strict';if(obj.home_insured===null||obj.contents_insured===null||obj.car_insured===null||obj.death===null||obj.unable===null){return null;}
this.level1=3;this.level2=2;this.level3=3;this.level4=3;this.level5=3;this.level1=(obj.home_insured===1)?1:3;this.level2=(obj.contents_insured===1)?1:2;this.level3=(obj.car_insured===2)?3:1;this.level4=(obj.death===3)?3:1;this.level5=(obj.unable===1)?1:3;return Math.max(this.level1,this.level2,this.level3,this.level4,this.level5);},q6:function(obj){'use strict';if(obj.will===null||obj.power_of_attorney===null||obj.safe_docs===null){return null;}
this.level1=2;this.level2=2;this.level3=2;this.level1=(obj.will===1)?1:2;this.level2=(obj.power_of_attorney===1)?1:2;this.level3=(obj.safe_docs===1)?1:2;return Math.max(this.level1,this.level2,this.level3);},q7:function(obj){'use strict';if(obj.life_changes===null||obj.ends_meet===null||obj.reviewed_savings===null||obj.will_current===null||obj.insurance_value===null){return null;}
if(obj.life_changes===1&&obj.reviewed_finances===null){return null;}
this.level1=1;this.level2=3;this.level3=2;this.level4=2;this.level5=3;this.level6=2;if(obj.life_changes===1){this.level3=(obj.reviewed_finances===1)?1:2;}else{this.level3=1;}
this.level2=(obj.ends_meet===1)?1:3;this.level4=(obj.reviewed_savings===1)?1:2;this.level5=(obj.will_current===1)?1:3;this.level6=(obj.insurance_value===1)?1:2;return Math.max(this.level1,this.level2,this.level3,this.level4,this.level5,this.level6);},q8:function(obj){'use strict';if(obj.retirement===null||(obj.retirement===1&&obj.super_annuation===null)){return null;}
this.level1=1;this.level2=2;if(obj.retirement===1){this.level2=(obj.super_annuation===1)?1:2;}else{this.level2=1;}
return Math.max(this.level1,this.level2);},calculate:function(obj){'use strict';console.debug=false;console.log("><><><>< Calculating ><><><><");$.each(obj,function(i,v){obj[i]=(isNaN(parseInt(v,10))?null:parseInt(v,10));});this.results={q1:this.q1(obj),q2:this.q2(obj),q3:this.q3(obj),q4:this.q4(obj),q5:this.q5(obj),q6:this.q6(obj),q7:this.q7(obj),q8:this.q8(obj),inputs:obj};$.each(obj,function(i,v){});return this.results;}});var testObj={goals:1,how_far:1,income_satisfaction:1,prepared:1,mortgage:1,mortgage_payments:2,other_debts:2,net_worth:1,regular_savings:1,kiwisaver:1,investments:2,portfolio:'',overseas_funds:'',home_insured:1,contents_insured:1,car_insured:3,death:2,unable:1,will:1,power_of_attorney:1,safe_docs:1,life_changes:1,ends_meet:1,reviewed_finances:1,reviewed_savings:1,will_current:1,insurance_value:2,retirement:2,super_annuation:2};testMode=false;if(testMode===true){(function($){'use strict';$(document).ready(function(){$('html').append("<h1>TESTMODE</h1>").append("<input id='calculate-test' type='button' value='test calc' />");});function testCalcLogic(){var test=new SortedCalculator_SortMe(),results=test.calculate(testObj,true);console.log('><><><><> INPUT <><><><><');console.log('><><><><> OUTPUT <><><><><');}
$('#calculate-test').live("click",function(){testCalcLogic();});}(jQuery));}
