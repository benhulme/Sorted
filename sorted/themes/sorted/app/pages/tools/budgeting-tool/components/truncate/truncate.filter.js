!function(){"use strict";angular.module("budgetingTool").filter("truncate",function(){return function(n,t){return n.length<t?n:n.substring(0,t-3)+"..."}})}();