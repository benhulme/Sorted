"use strict";var app=angular.module("cmValidation");app.directive("cmNotempty",function(){return{require:"ngModel",link:function(n,t,i,e){e.$validators.notempty=function(n){return"false"===i.cmCondition||!((e.$isEmpty(n)||null===n)&&!t.hasClass("ng-pristine"))}}}});