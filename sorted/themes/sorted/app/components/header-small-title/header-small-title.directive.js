!function(){"use strict";angular.module("sorted").directive("headerSmallTitle",["siteConfig",function(t){return{templateUrl:t.APP_PATH+"app/components/header-small-title/header-small-title.html",restrict:"EA",scope:{data:"="},controller:["$scope","$rootScope",function(e,a){e.siteConfig=t;var i=e.$watch("data",function(){e.data&&(a.$emit("newPageLoaded",{title:e.data.Title,description:e.data.MetaDescription}),i())})}]}}])}();