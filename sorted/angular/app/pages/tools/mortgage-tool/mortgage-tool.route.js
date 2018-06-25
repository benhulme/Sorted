(function() {

  'use strict';

  angular.module('sorted')
    .config(['$routeProvider', 'siteConfig', 'profileApiProvider', 'silverStripeServiceProvider', 'calcInputServiceProvider',
      function ($routeProvider, siteConfig, profileApiProvider, silverStripeServiceProvider, calcInputServiceProvider) {

      var
        calcName = 'mortgageTool',
        templateUrl = siteConfig.APP_PATH + 'app/pages/tools/mortgage-tool/mortgage-tool.html',
        controller = 'MortgageToolController',
        resolve = {
          isLoggedIn: function () {
            return profileApiProvider.$get().isLoggedIn();
          },
          pageData: function () {
            return silverStripeServiceProvider.$get().get(calcName);
          },
          calcData: function () {
            return calcInputServiceProvider.$get().get(calcName);
          },
        };

      $routeProvider
        .when('/tools/mortgage-calculator', {
          templateUrl: templateUrl,
          controller: controller,
          resolve: resolve
        })
        .when('/tools/mortgage-calculator/:id', {
          templateUrl: templateUrl,
          controller: controller,
          resolve: resolve
        });
    }
  ]);

}());
