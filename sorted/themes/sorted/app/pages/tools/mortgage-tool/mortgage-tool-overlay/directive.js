!function(){"use strict";angular.module("sorted").directive("mortgageToolOverlay",["siteConfig",function(o){return{templateUrl:o.APP_PATH+"app/pages/tools/mortgage-tool/mortgage-tool-overlay/overlay.html",restrict:"EA",scope:{model:"=",calculator:"="},controller:["$scope",function(o){o.currentModel=o.model.collection.at(0),o.$on("output:update",function(t,e){o.currentModel=o.model.collection.at(e)})}]}}])}();