!function(){"use strict";angular.module("sorted").directive("calcInputButtonSelect",["siteConfig",function(e){return{templateUrl:e.APP_PATH+"app/components/calc-input-button-select/input.html",restrict:"EA",scope:{field:"=",model:"=",label:"="},link:function(e,t){e.isSelected=function(e,t){return _.isNaN(parseInt(e))||_.isNaN(parseInt(t))?e==t:parseInt(e)===parseInt(t)},t.on("click",".input-select-button",function(t){var a=angular.element(t.currentTarget);if(a.data("related")){var n=angular.element(a.data("related"));n.parent().find(a.data("toggle")).addClass("_hidden"),n.removeClass("_hidden")}a.data("result")&&$(a.data("result")).toggleClass("_hidden"),e.model&&e.$apply(e.model.set(e.field.calcModel,a.data("value")))})}}}])}();