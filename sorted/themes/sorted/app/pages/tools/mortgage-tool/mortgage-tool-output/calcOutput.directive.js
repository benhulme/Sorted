!function(){"use strict";angular.module("sorted").directive("mortgageToolOutput",["siteConfig",function(e){return{templateUrl:e.APP_PATH+"app/pages/tools/mortgage-tool/mortgage-tool-output/calc-output.html",restrict:"EA",scope:{calculator:"=",model:"="},link:function(e,o){e.ageFormHidden=!0,o.on("click",".calc-output-birthdate",function(o){o.preventDefault(),e.ageFormHidden=!1,e.$apply()}),e.$on("save:calc",function(o,t){var n={success:function(e,o,t){console.info("SUCCESS: ",e,o,t),angular.element("#save-as-modal").modal("hide")},error:function(e,o,t){console.error("ERROR: ",e,o,t)},wait:!0,parse:!0};e.currentModel.collection.parent.set({Title:t},{silent:!0}),e.currentModel.collection.parent.save(null,n)})},controller:["$scope",function(e){e.currentModel=e.model.collection.at(0),e.nudgeOptions=[{floor:0,ceil:5e5,showSelectionBar:!0},{floor:0,ceil:2e5,showSelectionBar:!0},{floor:0,ceil:1e5,showSelectionBar:!0}],e.nudge=e.calculator.nudge,e.nudge.options=e.nudgeOptions[0],e.$on("output:update",function(o,t){e.currentModel=e.model.collection.at(t),e.nudge.options=e.nudgeOptions[t]}),e.model.collection.on("change",function(o){(o.hasChanged("loan1")||o.hasChanged("interest1")||o.hasChanged("freq1")||o.hasChanged("lump_sum_repayment"))&&(e.nudgeOptions[e.currentModel.id].floor=Math.ceil(e.currentModel.calculateSlider(30)),e.nudgeOptions[e.currentModel.id].ceil=Math.ceil(e.currentModel.calculateSlider(1)))})}]}}])}();