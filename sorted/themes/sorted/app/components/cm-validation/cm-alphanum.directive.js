"use strict";var app=angular.module("cmValidation"),ALPHANUM_REGEXP=/^[a-z0-9]+$/i;app.directive("cmAlphanum",function(){return{require:"ngModel",link:function(n,i,a,t){t.$validators.alphanum=function(n,i){return!!t.$isEmpty(n)||("false"===a.cmCondition||!!ALPHANUM_REGEXP.test(i))}}}});