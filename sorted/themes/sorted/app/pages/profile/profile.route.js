!function(){"use strict";angular.module("sorted").config(["$routeProvider","siteConfig",function(e,o){e.when("/profile",{templateUrl:o.APP_PATH+"app/pages/profile/profile.html",controller:"ProfileController",resolve:{check:["$location","userStorage",function(e,o){o.isLoggedIn()||e.path("/")}]}})}])}();