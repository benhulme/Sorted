!function(){"use strict";angular.module("budgetingTool").directive("budgetBreakdown",["Budget","budgetingToolConfig","periodAmount","siteConfig",function(e,o,d,n){return{restrict:"E",templateUrl:n.APP_PATH+"app/pages/tools/budgeting-tool/components/budget-breakdown/budgetBreakdown.html",controller:["$scope","totalValues",function(e,n){e.breakdownChartOptions=o.BREAKDOWN_CHART_OPTIONS,e.breakdownChartOptions.dataSource=e.breakdownChartSource,e.breakdownDesktopExpanded=e.budget.BreakdownExpanded,e.breakdownMobileExpanded=e.budget.BreakdownExpanded,e.breakdownToggleDesktop=function(){e.breakdownDesktopExpanded=!e.breakdownDesktopExpanded,e.BreakdownExpanded=!e.BreakdownExpanded},e.breakdownToggleMobile=function(){e.breakdownMobileExpanded=!e.breakdownMobileExpanded,e.BreakdownExpanded=!e.BreakdownExpanded},e.subtotalDisplay=function(){return d.displayDollars(n.getSubtotal())}}]}}])}();