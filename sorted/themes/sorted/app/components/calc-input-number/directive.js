!function(){"use strict";angular.module("sorted").directive("calcInputNumber",["siteConfig",function(t){return{templateUrl:t.APP_PATH+"app/components/calc-input-number/input.html",restrict:"EA",scope:{field:"=",model:"="},link:function(t,n){n.on("focus","input",function(t){angular.element(t.currentTarget).select()})},controller:["$scope",function(t){t.doBlur=function(t){t.target.blur()}}]}}])}();