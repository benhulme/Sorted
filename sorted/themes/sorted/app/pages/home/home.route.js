!function(){"use strict";angular.module("sorted").config(["$routeProvider","siteConfig",function(o,e){o.when("/",{templateUrl:e.APP_PATH+"app/pages/home/home.html",controller:"HomeController"}).otherwise({redirectTo:function(){window.location=location.pathname}})}])}();