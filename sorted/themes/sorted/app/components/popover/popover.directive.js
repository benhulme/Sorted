!function(){"use strict";angular.module("sorted").directive("popover",["siteConfig",function(e){return{restrict:"E",scope:{data:"="},link:function(e,t){e.attachTemplate(t),e.close=function(){t.find('[   data-toggle="popover"  ]').popover("hide")},t.on("click",".popover-close",e.close)},controller:["$scope","$compile","$sce","$templateRequest","$analytics",function(t,o,n,a,r){function c(e){r.eventTrack("view",{category:"glossary",action:"view"});var n=o(angular.element("<div>").html(e))(t);t.elm.find('[   data-toggle="popover"  ]').attr("data-template",n.html()),t.elm.find('[   data-toggle="popover"  ]').popover().on("click",function(e){e.preventDefault(),p||$(this).popover("show")})}var p=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;t.attachTemplate=function(o){t.elm=o;var r=n.getTrustedResourceUrl(e.APP_PATH+"app/components/popover/popover.html");a(r).then(c)}}]}}])}();