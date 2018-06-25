(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('budgetViewChooser', [
      'budgetingToolConfig',
      'budgetView',
      'siteConfig',
      '$analytics',
      function (budgetingToolConfig, budgetView, siteConfig,$analytics) {
        return {
          restrict: 'E',
          templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/components/budget-view-chooser/budgetViewChooser.html',
          scope: true,
          controller: ['$scope', function ($scope) {
            $scope.viewTemplates = budgetingToolConfig.VIEW_TEMPLATES;
            $scope.setView = function(view){
              $analytics.pageTrack( '/tools/budgeting-tool/'+view);
              budgetView.set(view);
            };


            $scope.getTemplateIconPath = function (icon) {
              return siteConfig.APP_PATH + budgetingToolConfig.BUDGETING_TOOL_IMAGE_PATH + '/' + icon;
            };

            $scope.isViewSelected = function (view) {
              return view === budgetView.get();
            };
          }]
        };
      }
    ]);

})();
