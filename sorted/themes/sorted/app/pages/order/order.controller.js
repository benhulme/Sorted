!function(){"use strict";angular.module("sorted").controller("OrderController",["$scope","siteConfig","orderViewModel","$http","$log",function(e,r,n,t){function a(e,r){for(var n,t=0;t<e.length;t++){var a=e[t];if(parseInt(a.ID)===parseInt(r)){n=a;break}}return n}function o(e,r){var n=[];for(var t in e.Seminar)if(e.Seminar.hasOwnProperty(t)){var o={};if(e.Seminar[t]){var i=a(r,t);o.ID=t,o.Dl=i.PDF.Filename,o.Title=i.Title,o.ShortCopy=i.ShortCopy,n.push(o)}}return n}e.siteConfig=r,e.seminarSend=!1,e.bookletSend=!1,e.Order=_.merge({},{Items:{},User:{},Organisation:{},DeliverTo:{},Seminar:{}}),e.data={organisationTypes:[{id:"1",name:"Workplace"},{id:"2",name:"School"},{id:"3",name:"Community Group"},{id:"4",name:"Both"},{id:"5",name:"Other"}],organisationSizes:[{id:"1",name:"less than 10"},{id:"2",name:"10 to 30"},{id:"3",name:"30 to 50"},{id:"4",name:"50 to 100"},{id:"5",name:"100 to 500"},{id:"6",name:"500 to 1000"},{id:"7",name:"more than 1000"}]},e.data.Title="Order Sorted Collateral",n.build().then(function(r){_.merge(e.data,r)}),e.getInput=function(e,r){return e[r.ID]},e.getOrderItemCount=function(){return _.keys(e.Order.Items).length},e.save=function(){if(angular.element(".orderForm").hasClass("ng-valid")&&(_.keys(e.Order.Items).length>0&&t.post("/api/v0.1/order/save",e.Order).then(function(){e.formSend=!0}),_.keys(e.Order.Seminar).length>0)){var r=angular.copy(e.Order),n=angular.copy(e.data),a=r.User,i=o(r,n.Seminars),d={Seminar:i,User:a,raw:e.Order};t.post("/api/v0.1/order/seminars",d).then(function(r){e.formSend=!0},function(e){console.log(e)})}}}])}();