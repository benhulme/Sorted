!function(){"use strict";angular.module("budgetingTool").factory("budgetingToolResolver",["$location","$q","Budget","budgetingToolConfig","Profile",function(e,t,o,n,r){return function(){return t.all([o.get(),r.get(!0)]).then(function(o){return _.isEmpty(o[0])||!o[0].hasOwnProperty("MasterCategories")?(e.path(n.BUDGETING_TOOL_PATH+"/welcome"),t.reject("No stored budget yet.")):(_.isEmpty(o[1])?(o[0].Title=n.DEFAULT_BUDGET_TITLE,o[0].BreakdownExpanded=!0):o[0].Title||(o[0].Title=o[1].FirstName+"'s budget",o[0].BreakdownExpanded=!0),!0)})}}])}();