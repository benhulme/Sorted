!function(){"use strict";angular.module("budgetingTool").factory("budgetTemplateViewModel",["$http","$log","$q","$resource","Budget","siteConfig",function(e,t,n,r,u,o){return function(){var g=e({method:"GET",url:o.API_PREFIX+"/page/get/budgeting-tool"}).then(function(e){return e.data[0]},function(e){return t.error(e),null}),a=r(o.APP_PATH+"/json/budget-master-categories.json").get().$promise,d=u.get();return n.all([g,a,d]).then(function(e){var t=e[1];return e[0]&&(t.BackgroundImage=e[0].BackgroundImage?e[0].BackgroundImage:t.BackgroundImage),{data:t,budget:d}})}}])}();