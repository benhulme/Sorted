!function(){"use strict";angular.module("sorted").directive("calcOutputPersonality",["siteConfig",function(e){return{templateUrl:e.APP_PATH+"app/pages/tools/money-personality/calc-output-personality/calc-output-personality.html",restrict:"EA",scope:{model:"=",result:"=",dropdown:"=",resultData:"="},link:function(e){e.$on("save:calc",function(t,n){var o={success:function(e,t,n){console.info("SUCCESS: ",e,t,n),angular.element("#save-as-modal").modal("hide")},error:function(e,t,n){console.error("ERROR: ",e,t,n)},silent:!0,parse:!0};e.model.$attributes.Title=n,e.model.save(null,o)})},controller:["$scope",function(t){t.siteConfig=e;var n={OImSD:"money-mentor",OImSF:"visual-stylist",OImLD:"financial-controller",OImLF:"entrepreneur",ORSD:"money-organiser",ORSF:"hedonist",ORLD:"money-surgeon",ORLF:"money-maestro",InImSD:"insightful-investor",InImSF:"authentic-dreamer",InImLD:"adviser-speculator",InImLF:"system-innovator",InRSD:"practical-domestic",InRSF:"sensible-drifter",InRLD:"sound-controller",InRLF:"money-mechanic"};t.$watch("result",function(){if(t.result){var e=n[t.result];t.currentResult=_.find(t.resultData,{URLSegment:e}),t.quizResultTitle=t.currentResult.Title,t.quizResult=!0}}),t.$watch("dropdown.value",function(){if(t.dropdown&&t.dropdown.value){var e=t.dropdown.value;t.currentResult=_.find(t.resultData,{URLSegment:e})}})}]}}])}();