!function(){"use strict";angular.module("budgetingTool").directive("budgetMasterCategoryListview",["periodAmount","siteConfig",function(t,e){return{restrict:"E",templateUrl:e.APP_PATH+"app/pages/tools/budgeting-tool/components/budget-master-category-listview/budgetMasterCategoryListview.html",controller:["$scope",function(e){e.masterCategoryDisplayTotal=function(e){return t.displayDollars(e.Cents)}}]}}])}();