!function(){"use strict";angular.module("sorted").directive("calcInputQuizInv",["siteConfig","$window",function(e,t){return{templateUrl:e.APP_PATH+"app/components/calc-input-quiz-inv/calc-input-quiz-inv.html",restrict:"EA",scope:{calculator:"=",model:"=",updateParent:"&updateCurrentModel",digestCalc:"&"},link:function(n,c){n.siteConfig=e,c.on("click",".ui-results-link",function(e){e.preventDefault();var n=angular.element(".calc-output"),c=n.offset().top-80;t.scrollTo(0,c)}),c.on("click",".calc-heading",function(e){var t=c.find(".calc-input-group.selected"),n=angular.element(e.currentTarget);n.parent().hasClass("selected")||(t.find(".calc-input-container").slideUp(),t.removeClass("selected"),n.parent().find(".calc-input-container").slideDown(),n.parent().addClass("selected"))}),n.digestCalcInput=function(){n.$digest(),n.digestCalc()}}}}])}();