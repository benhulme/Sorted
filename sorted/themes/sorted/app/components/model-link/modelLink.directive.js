!function(){"use strict";angular.module("sorted").directive("modelLink",[function(){return{restrict:"A",scope:{modelLink:"=",ngModel:"="},link:function(n){n.linkToModel=function(){0===n.modelLink?n.ngModel=null:n.ngModel=n.modelLink},n.modelToLink=function(){n.modelLink=n.ngModel},n.$watch("modelLink",n.linkToModel,!0),n.$watch("ngModel",n.modelToLink)}}}])}();