/**
 * Created by stanislavk on 24/08/2016.
 */

(function () {
  'use strict';

  angular.module('sorted')
    .controller('GoalWelcomeController', ['$scope', 'pageData', 'siteConfig',  function($scope, pageData,siteConfig) {
      $scope.appPath = siteConfig.APP_PATH;
      $scope.data = pageData.data[0];
      $scope.data.Link = '/tools/goal-planner/welcome';

    }]);

}());
