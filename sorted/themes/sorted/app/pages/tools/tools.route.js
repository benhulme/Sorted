!function(){"use strict";angular.module("sorted").config(["$routeProvider","siteConfig",function(o,l){o.when("/tools",{templateUrl:l.APP_PATH+"app/pages/tools/tools.html",controller:"ToolsController"}).when("/tools/?category",{templateUrl:l.APP_PATH+"app/pages/tools/tools.html",controller:"ToolsController"})}])}();