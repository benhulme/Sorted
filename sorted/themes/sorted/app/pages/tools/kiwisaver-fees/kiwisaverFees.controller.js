!function(){"use strict";angular.module("sorted").controller("KiwisaverFeesController",["$scope","siteConfig","KiwisaverFeesModel","$timeout","$window","$routeParams","isLoggedIn","pageData","calcData","$analytics",function(a,t,e,c,l,o,n,r,i,u){a.siteConfig=t,a.data=r.data[0],a.calculator=i.data,a.resultsInteraction=!1,a.interaction=!1,a.model=function(){var t={},c=new l.SortedCalculator_KiwiSaver_Fees;return _.forEach(a.calculator.fields,function(e){_.has(e,"calcModel")&&(t[e.calcModel]=e.value),_.merge(t,_.pick(a.calculator,["CalcID"]))}),new e(t,{calculator:c,parse:!0})}(),a.model.on("change",function(t){a.interaction||(u.eventTrack("startinteraction",{category:"calculators",label:"KS fees"}),a.interaction=!0),t.isValid()&&(a.$emit("cm-spinner.start"),t.calculating=!0,t.calculate().then(function(){c(function(){a.resultsInteraction||(u.eventTrack("resultscalculated",{category:"calculators",label:"KS fees"}),a.resultsInteraction=!0),0===a.model.result.nominal.length&&0===a.model.result.todays.length?$.when(a.model.loadDummyData(a.calculator.dummyData)).then(function(){t.calculating=!0,a.$broadcast("output:redraw")}):a.$broadcast("output:redraw")},0)}))}),_.has(o,"id")?n&&a.model.set("ID",o.id).fetch({parse:!0}):(a.$emit("cm-spinner.start"),$.when(a.model.loadDummyData(a.calculator.dummyData)).then(function(){a.$broadcast("output:redraw")}))}])}();