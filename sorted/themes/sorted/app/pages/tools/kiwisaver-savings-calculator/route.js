!function(){"use strict";angular.module("sorted").config(["$routeProvider","siteConfig","profileApiProvider","silverStripeServiceProvider","calcInputServiceProvider",function(e,r,i,a,t){var o={isLoggedIn:function(){return i.$get().isLoggedIn()},pageData:function(){return a.$get().get("kiwisaverSavingsCalculator")},calcData:function(){return t.$get().get("kiwisaverSavingsCalculator")}};e.when("/tools/kiwisaver-savings-calculator",{templateUrl:r.APP_PATH+"app/pages/tools/kiwisaver-savings-calculator/index.html",controller:"KiwisaverSavingsController",resolve:o}).when("/tools/kiwisaver-savings-calculator/:id/",{templateUrl:r.APP_PATH+"app/pages/tools/kiwisaver-savings-calculator/index.html",controller:"KiwisaverSavingsController",resolve:o})}])}();