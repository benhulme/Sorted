!function(){"use strict";angular.module("sorted").factory("planningData",["$http",function(t){function n(){return s}function a(t){s=t}function e(){return t.get("/api/v0.1/goal/get")}function r(){return t.get("/api/v0.1/calculator/query?calcid="+f).then(function(t){return t},function(){return!1})}function i(a){var e={CalcID:f,Title:n(),Data:a};t.post("/api/v0.1/rest/tool/"+f,JSON.stringify(e))}function o(a,e){var r={CalcID:f,Title:n(),Data:a};t.put("/api/v0.1/rest/tool/"+e,JSON.stringify(r))}var u=[],l=[],c={},f="12",s="Goal Planner";return{id:"",goals:c,title:s,tempItem:u,tempCategory:"",goalEditable:l,setTitle:a,getUserGoals:r,getDefaultGoals:e,save:i,update:o}}])}();