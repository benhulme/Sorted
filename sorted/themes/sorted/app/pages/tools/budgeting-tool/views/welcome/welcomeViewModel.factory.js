!function(){"use strict";angular.module("budgetingTool").factory("welcomeViewModel",["$http","$log","$q","Profile","siteConfig",function(t,n,e,o,r){return function(){var u=t({method:"GET",url:r.API_PREFIX+"/page/get/budgeting-tool"}).then(function(t){return t.data[0]},function(t){return n.error(t),null}),g=o.get();return e.all([u,g]).then(function(t){return{toolPage:t[0],isLoggedIn:o.isLoggedIn()}})}}])}();