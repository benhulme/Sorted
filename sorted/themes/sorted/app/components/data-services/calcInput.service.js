!function(){"use strict";angular.module("sorted").service("calcInputService",["$http","calcInputs",function(t,c){return{get:function(n,u){var e={method:"GET",url:c[n],params:u};return t(e).success(function(){})}}}])}();