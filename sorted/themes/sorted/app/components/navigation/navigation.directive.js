!function(){"use strict";angular.module("sorted").directive("navigation",["siteConfig","$window","$route","$rootScope",function(e,n,t,a){return{templateUrl:e.APP_PATH+"app/components/navigation/navigation.html",restrict:"E",scope:{},controller:["$scope",function(n){n.siteConfig=e}],link:function(e,t){e.selectNav=function(){var e=n.location.pathname+n.location.hash,a=t.find(".nav-link");"/"===e?angular.element('.nav-link[href="/"]').addClass("selected"):angular.forEach(a,function(n){"/"!==angular.element(n).attr("href")&&(e.search(angular.element(n).attr("href"))!==-1?angular.element(n).addClass("selected"):angular.element(n).removeClass("selected"))})},a.$on("$routeChangeSuccess",e.selectNav),e.selectNav()}}}])}();