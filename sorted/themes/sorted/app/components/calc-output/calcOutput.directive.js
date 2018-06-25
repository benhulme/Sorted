!function(){"use strict";angular.module("sorted").directive("calcOutput",["siteConfig",function(e){return{templateUrl:e.APP_PATH+"app/components/calc-output/calc-output.html",restrict:"EA",scope:{calculator:"=",model:"=",sliderOptions:"=",formType:"=",floor:"=",save:"&"},link:function(e,o){o.on("click",".calc-output-birthdate",function(o){o.preventDefault(),e.ageFormHidden=!1,e.$digest()}),o.on("click",".calc-output-save",function(){e.save()}),e.$watch("model.fields.nudgeInverseTerm.value",function(){if(e.model.fields.nudgeInverseTerm&&e.model.fields.totalTerm.value){var o=60-e.model.fields.nudgeInverseTerm.value;e.model.fields.totalTerm.value=o}}),e.$watch("model.fields.totalTerm.value",function(){if(e.model.fields.totalTerm){var o=60-e.model.fields.totalTerm.value;e.model.fields.nudgeInverseTerm.value=o}})},controller:["$scope","calcStaticValues","$timeout",function(e,o,l){console.log(e.model.fields[e.model.nudge.model],"result value"),e.ageFormHidden=!0,e.calcOutputConsts=o,e.$watch("model",function(){e.model&&(e.model.fields.monthBorn&&(e.model.fields.monthBorn.value||e.model.fields.yearBorn.value)?e.ageFormHidden=!1:e.ageFormHidden=!0,e.model.nudge&&(isNaN(e.model.nudge.options.ceil)?e.sliderOptions.ceil=e.model.fields[e.model.nudge.options.ceil].value:e.sliderOptions.ceil=e.model.nudge.options.ceil,angular.isDefined(e.model.fields.interestFreePeriod)&&(e.sliderOptions.ceil-=e.model.fields.interestFreePeriod.value),angular.isDefined(e.model.fields.deferredPaymentPeriod)&&(e.sliderOptions.ceil-=e.model.fields.deferredPaymentPeriod.value),e.model.nudge.options.ceilFactor&&(e.sliderOptions.ceil=e.sliderOptions.ceil/e.model.nudge.options.ceilFactor),isNaN(e.model.nudge.options.floor)&&e.model.nudge.options.floor!==!1?e.sliderOptions.floor=e.model.fields[e.model.nudge.options.floor].value:e.model.nudge.options.floor!==!1&&"repaymentAmount"===e.model.nudge.model?e.sliderOptions.floor=.02*e.model.fields.amountOwed.value:e.sliderOptions.floor=e.model.nudge.options.floor),console.log(e.model.fields[e.model.nudge.model],"updated value"),e.refreshSlider())},!0),e.$watch("floor",function(){e.sliderOptions.floor=e.floor}),e.$watch("sliderOptions",function(){e.sliderOptions.interval=10,console.log(e.sliderOptions),e.sliderOptions&&(e.slider={options:e.sliderOptions})}),e.refreshSlider=function(){l(function(){e.$broadcast("rzSliderForceRender")})}}]}}])}();