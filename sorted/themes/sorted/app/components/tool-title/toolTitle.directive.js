!function(){"use strict";angular.module("sorted").directive("toolTitle",["siteConfig",function(t){return{templateUrl:t.APP_PATH+"app/components/tool-title/tool-title.html",restrict:"E",scope:{data:"="},controller:["$scope","$location",function(o,e){o.siteConfig=t,o.url=e.absUrl()}]}}])}();