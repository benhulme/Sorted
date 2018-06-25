/*! money_planner.js */
var SortedCalculator_MoneyPlanner=SortedCalculator.extend({init:function(){'use strict';this._parent();},calculate:function(obj,testMode){'use strict';console.debug=false;if(testMode===true){console.debug=true;}
var totalIncome=this.sum_section(obj.income);var totalDebt=this.sum_section(obj.debt);var totalSavings=this.sum_section(obj.savings);var totalRE=this.sum_section(obj.regular_expenses);var totalOE=this.sum_section(obj.other_expenses);var result=(totalIncome-(totalDebt+totalSavings+totalRE+totalOE));return{chart:{income:totalIncome,outgoings:{debt:totalDebt,savings:totalSavings,regular_expenses:totalRE,other_expenses:totalOE},results:result}};},sum_section:function(val_array){var total=0;for(var i=0;i<val_array.length;i++){var parsedValue=parseInt(val_array[i].replace(",","").replace("$",""),10);if(!isNaN(parsedValue)){total+=parsedValue;}}
return total;}});var testmode=false;var testObj={income:["1,000","2000"],debt:["$50","10","20"],savings:["5"],regular_expenses:["17"],other_expenses:["45","100","100"]};if(testmode===true){(function($){'use strict';$(document).ready(function(){$('html').append("<h1>TESTMODE</h1>").append("<input id='calculate-test' type='button' value='test calc' />");});function testCalcLogic(){var test=new SortedCalculator_MoneyPlanner(),candidate=testObj,results=test.calculate(candidate,'true');console.log('><><><><> INPUT <><><><><');console.dir(candidate);console.log('><><><><> OUTPUT <><><><><');console.dir(results);}
$('#calculate-test').live("click",function(){testCalcLogic();});}(jQuery));}