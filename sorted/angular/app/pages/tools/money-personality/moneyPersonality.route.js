(function() {

  'use strict';

  angular.module('sorted')
   .config(['$routeProvider', 'siteConfig', 'profileApiProvider', 'silverStripeServiceProvider', 'calcInputServiceProvider',
      function($routeProvider, siteConfig, profileApiProvider, silverStripeServiceProvider, calcInputServiceProvider) {      
    
      var
        calcName = 'moneyPersonality',
        templateUrl = siteConfig.APP_PATH + 'app/pages/tools/money-personality/money-personality.html',
        controller = 'MoneyPersonalityController',
        resolve = {
          isLoggedIn: function () {
            return profileApiProvider.$get().isLoggedIn();
          },
          pageData: function () {
            return silverStripeServiceProvider.$get().get(calcName);
          },
          calcData: function () {
            return calcInputServiceProvider.$get().get(calcName);
          }
        }; 

      $routeProvider
        .when('/tools/money-personality-quiz', {
          templateUrl: templateUrl,
          controller: controller,
          resolve: resolve
        })
         .when('/tools/money-personality-quiz/:id', {
          templateUrl: templateUrl,
          controller: controller,
          resolve: resolve
        });
    
    },
  ]);

}());
