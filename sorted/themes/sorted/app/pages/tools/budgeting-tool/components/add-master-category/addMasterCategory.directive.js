!function(){"use strict";angular.module("budgetingTool").directive("addMasterCategory",["Budget","budgetingToolConfig","colourGenerator","MasterCategory","siteConfig",function(e,t,o,r,a){return{restrict:"E",templateUrl:a.APP_PATH+"app/pages/tools/budgeting-tool/components/add-master-category/addMasterCategory.html",controller:["$scope",function(e){e.addMasterCategoryPopover=a.APP_PATH+"app/pages/tools/budgeting-tool/components/add-master-category/addMasterCategoryPopover.html",e.masterCategoryPopoverOpen=!1}],link:function(t,o){t.saveMasterCategory=function(){var a=o.find("input")[0].value;if(o.find("input")[0].value.trim()){var n=r.create();n.Title=a,t.budget.MasterCategories.push(n),e.setDirty(),t.masterCategoryPopoverOpen=!1}},t.cancelMasterCategory=function(){t.masterCategoryPopoverOpen=!1}}}}])}();