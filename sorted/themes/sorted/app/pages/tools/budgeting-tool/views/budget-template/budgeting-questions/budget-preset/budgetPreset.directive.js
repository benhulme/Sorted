!function(){"use strict";angular.module("budgetingTool").directive("budgetPreset",["colourGenerator","siteConfig",function(e,t){return{restrict:"E",templateUrl:t.APP_PATH+"app/pages/tools/budgeting-tool/views/budget-template/budgeting-questions/budget-preset/budgetPreset.html",link:function(t){t.getPresetBackground=function(t,n){return t.Selected?e.hexToRgba(n,.2):null}}}}])}();