/**
 * Created by stanislavk on 20/06/2016.
 */
(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('budgetViewPlate', [ 'siteConfig','budgetView','budgetingToolConfig', function (siteConfig,budgetView,budgetingToolConfig) {
      return {
        restrict: 'E',
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/views/budget-template/budgeting-questions/budget-view/budgetViewPlate.html',
        link: function () {

        },
        controller: ['$scope', function ($scope) {
          $scope.viewTemplates = budgetingToolConfig.VIEW_TEMPLATES;
          $scope.setView = budgetView.set;

          $scope.getTemplateIconPath = function (plateIcon) {
            return siteConfig.APP_PATH + budgetingToolConfig.BUDGETING_TOOL_IMAGE_PATH + '/' + plateIcon;
          };

          $scope.isViewSelected = function (view) {
            return view === budgetView.get();
          };


        }]
      };
    }]);

})();
