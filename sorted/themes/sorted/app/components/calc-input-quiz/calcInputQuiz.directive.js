!function(){"use strict";angular.module("sorted").directive("calcInputQuiz",["siteConfig",function(e){return{templateUrl:e.APP_PATH+"app/components/calc-input-quiz/calc-input-quiz.html",restrict:"EA",scope:{calculator:"=",models:"=",updateParent:"&updateCurrentModel",digestCalc:"&"},link:function(e,t){t.on("click",".calc-heading",function(n){var c=t.find(".calc-input-group.selected"),a=angular.element(n.currentTarget);if(!a.parent().hasClass("selected")){c.find(".calc-input-container").slideUp(),c.removeClass("selected"),a.parent().find(".calc-input-container").slideDown(),a.parent().addClass("selected");var i=a.attr("data-form-type"),r=a.attr("data-unique");e.updateParent({formType:i,unique:r})}}),e.digestCalcInput=function(){e.$digest(),e.digestCalc()}},controller:["$scope","calcStaticValues",function(t,n){t.calcStaticValues=n,t.currentGroup="creditCard",t.currentIndex=0,t.siteConfig=e,t.slider={options:{floor:1,ceil:3e7,showSelectionBar:!0}}}]}}])}();