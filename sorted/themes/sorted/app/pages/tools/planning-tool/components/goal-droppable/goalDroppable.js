!function(){"use strict";angular.module("sorted").directive("goalDroppable",["siteConfig","$uibModal",function(o){return{templateUrl:o.APP_PATH+"app/pages/tools/planning-tool/components/goal-droppable/goalDroppable.html",restrict:"E",scope:{data:"="},controller:["$scope",function(e){e.siteConfig=o,e.over=function(){},e.overdose=function(){}}]}}])}();