!function(){"use strict";angular.module("sorted").directive("breadcrumbs",["$location","siteConfig",function(r,e){return{templateUrl:e.APP_PATH+"app/components/breadcrumbs/breadcrumbs.html",restrict:"E",controller:["$scope",function(e){var t=r.path().replace(/^#?\/?/g,"").split("/");e.breadcrumbs=_.map(t,function(r,e,t){var c=r.replace(/-/g," ");return r=e>0?"/"+r:r,r=t.slice(0,e).join("/")+r,{title:c,path:r}})}]}}])}();