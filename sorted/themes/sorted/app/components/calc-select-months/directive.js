!function(){"use strict";angular.module("sorted").directive("calcSelectMonths",["siteConfig",function(e){return{templateUrl:e.APP_PATH+"app/components/calc-select-months/select.html",restrict:"EA",scope:{field:"=",model:"="},controller:["$scope",function(e){e.options=[{label:"January",value:1},{label:"February",value:2},{label:"March",value:3},{label:"April",value:4},{label:"May",value:5},{label:"June",value:6},{label:"July",value:7},{label:"August",value:8},{label:"September",value:9},{label:"October",value:10},{label:"November",value:11},{label:"December",value:12}],e.months=["January","February","March","April","May","June","July","August","September","October","November","December"]}]}}])}();