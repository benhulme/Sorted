!function(){"use strict";angular.module("sorted").directive("signupPrompt",["siteConfig",function(t){return{templateUrl:t.APP_PATH+"app/pages/home/signup-prompt/signup-prompt.html",restrict:"E",link:function(){},controller:["$scope","silverStripeService",function(t,e){function n(e){200===e.status?t.signupPrompt=e.data[0]:console.error("unexpected response status",e)}function r(t){console.error("failure",t)}e.get("signupPrompt").then(n,r)}]}}])}();