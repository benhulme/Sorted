!function(){"use strict";angular.module("budgetingTool").directive("displayDollars",["categoryValidator",function(e){return{restrict:"A",require:"ngModel",scope:{perYear:"="},link:function(r,t,i,n){var u=r.perYear||1;n.$parsers.push(function(r){if(e.cents(r))return new BigNumber(r).times(100).times(u)}),n.$formatters.push(function(e){return e?e.equals(0)?i.Placeholder:e.div(100).div(u).toNumber():i.Placeholder})}}}])}();