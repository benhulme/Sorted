!function(){"use strict";angular.module("sorted").config(["$routeProvider","siteConfig","profileApiProvider","silverStripeServiceProvider","calcInputServiceProvider",function(e,t,n,r,o){var i=t.APP_PATH+"app/pages/tools/investment-planner/investment-planner.html",l={isLoggedIn:function(){return n.$get().isLoggedIn()},pageData:function(){return r.$get().get("investmentPlanner")},calcData:function(){return o.$get().get("investmentPlanner")}};e.when("/tools/investor-kickstarter",{templateUrl:i,controller:"InvestmentPlannerController",resolve:l}).when("/tools/investor-kickstarter/:id",{templateUrl:i,controller:"InvestmentPlannerController",resolve:l})}])}();