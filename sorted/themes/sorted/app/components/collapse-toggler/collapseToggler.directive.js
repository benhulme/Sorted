!function(){"use strict";angular.module("sorted").directive("collapseToggler",function(){return{restrict:"A",link:function(i,n){n.on("click",function(){$(this).toggleClass("in").siblings(".collapse").toggleClass("in")})}}})}();