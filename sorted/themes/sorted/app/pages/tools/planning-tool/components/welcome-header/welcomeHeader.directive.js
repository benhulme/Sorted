!function(){"use strict";angular.module("sorted").directive("welcomeHeader",["siteConfig",function(e){return{templateUrl:e.APP_PATH+"app/pages/tools/planning-tool/components/welcome-header/welcomeHeader.html",restrict:"E",scope:{data:"="},controller:["$scope","$rootScope",function(t,o){t.breadcrumbs=[{title:"tools",path:"tools"},{title:"Goal planner",path:"tools/goal-planner/welcome"}],t.siteConfig=e,void 0!==t.data&&o.$emit("newPageLoaded",{title:t.data.Title,description:t.data.MetaDescription})}]}}])}();