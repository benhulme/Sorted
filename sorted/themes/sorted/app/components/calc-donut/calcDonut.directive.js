!function(){"use strict";angular.module("sorted").directive("calcDonut",["siteConfig","$window",function(e,t){return{templateUrl:e.APP_PATH+"app/components/calc-donut/calc-donut.html",restrict:"EA",scope:{calculator:"=",model:"="},link:function(o){o.siteConfig=e,o.$watch("model",function(){o.model&&o.drawChart()},!0),o.drawChart=function(){var e=100,t=10;o.model.ready&&o.model.result[o.model.graphic.interest.model]&&(e=o.model.fields[o.model.graphic.amountOwed.model].value,t=parseFloat(o.model.result[o.model.graphic.interest.model]).toFixed(2)),o.chartConfig={transitions:!1,legend:{visible:!1},chartArea:{background:""},seriesDefaults:{type:"donut",startAngle:180},series:[{name:"Result",overlay:{gradient:"none"},padding:20,data:[{category:"Amount you owe",value:e,color:o.model.graphic.amountOwed.color},{category:"Interest you'll pay",value:t,color:o.model.graphic.interest.color}],labels:{visible:!1}}],legendItemClick:function(e){e.preventDefault()},legendItemHover:function(e){e.preventDefault()},tooltip:{visible:!0,template:"#= category # (#= series.name #): $#= value #"}},angular.element(".donut-chart").kendoChart(o.chartConfig)},angular.element(t).bind("resize",o.drawChart)}}}])}();