!function(){"use strict";angular.module("sorted").directive("toolsArticles",["siteConfig",function(t){return{templateUrl:t.APP_PATH+"app/pages/tools/tools-articles/toolsArticles.html",restrict:"E",scope:!1,controller:["$scope","silverStripeService",function(t,e){function o(e){200===e.status?t.blankPlatesCustom=e.data:console.error("unexpected response status",e)}function s(t){console.error("failure",t)}e.get("blankCalculatorsDefaults").then(o,s)}]}}])}();