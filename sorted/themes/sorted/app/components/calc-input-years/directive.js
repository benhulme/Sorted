!function(){"use strict";angular.module("sorted").directive("calcInputYears",["siteConfig",function(t){return{templateUrl:t.APP_PATH+"app/components/calc-input-years/input.html",restrict:"EA",scope:{field:"=",model:"="},controller:["$scope",function(t){t.allowDecimal=!1,t.doBlur=function(t){t.target.blur()}}],link:function(t,e){e.on("focus","input",function(t){angular.element(t.currentTarget).select()})}}}])}();