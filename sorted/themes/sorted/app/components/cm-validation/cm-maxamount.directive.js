"use strict";var app=angular.module("cmValidation"),INTEGER_REGEXP=/^\-?\d+$/;app.directive("cmMaxamount",function(){return{require:"ngModel",link:function(n,t,a,i){i.$validators.maxamount=function(n,t){return!!i.$isEmpty(n)||("false"===a.cmCondition||!!(INTEGER_REGEXP.test(t)&&t<=parseInt(a.cmMaxamount)))}}}});