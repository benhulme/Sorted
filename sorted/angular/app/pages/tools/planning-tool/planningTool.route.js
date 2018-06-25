/**
 * Created by stanislavk on 9/08/2016.
 */
(function () {

  'use strict';

  angular.module('sorted')
    .config(['$routeProvider', 'siteConfig', 'silverStripeServiceProvider', 'planningDataProvider', 'profileApiProvider', function($routeProvider,siteConfig,silverStripeServiceProvider,planningDataProvider, profileApiProvider) {

        var calcName = 'goalPlanner';
        var resolve = {
          isLoggedIn: function () {
            return profileApiProvider.$get().isLoggedIn();
          },
          pageData: function () {
            return silverStripeServiceProvider.$get().get(calcName);
          },
          defaultData: function () {
            return planningDataProvider.$get().getDefaultGoals();
          },
          usersGoals: function () {
            return planningDataProvider.$get().getUserGoals();
          }
        };

        $routeProvider
          .when('/tools/goal-planner', {
            templateUrl: siteConfig.APP_PATH + 'app/pages/tools/planning-tool/planningTool.html',
            controller: 'PlanningToolController',
            resolve: resolve
          })
          .when('/tools/goal-planner/results', {
            templateUrl: siteConfig.APP_PATH + 'app/pages/tools/planning-tool/components/goal-result/goalResult.html',
            controller: 'PlanningResultsController'
          })
          .when('/tools/goal-planner/welcome', {
            templateUrl: siteConfig.APP_PATH + 'app/pages/tools/planning-tool/components/goal-welcome/goalWelcome.html',
            controller: 'GoalWelcomeController',
            resolve: resolve
          })
          .when('/tools/goal-planner/:id', {
            templateUrl: siteConfig.APP_PATH + 'app/pages/tools/planning-tool/planningTool.html',
            controller: 'PlanningToolController',
            resolve: resolve
          })
        ;

      }
    ]);

}());
