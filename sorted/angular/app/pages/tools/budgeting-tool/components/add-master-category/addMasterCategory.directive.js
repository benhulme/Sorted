(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('addMasterCategory', [
      'Budget',
      'budgetingToolConfig', 
      'colourGenerator', 
      'MasterCategory',
      'siteConfig', 
      function (Budget, budgetingToolConfig, colourGenerator, MasterCategory, siteConfig) {
        return {
          restrict: 'E',
          templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/components/add-master-category/addMasterCategory.html',
          controller: ['$scope', function ($scope) {
            $scope.addMasterCategoryPopover = siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/components/add-master-category/addMasterCategoryPopover.html';
            $scope.masterCategoryPopoverOpen = false;
          }],
          link: function (scope, element) {
            scope.saveMasterCategory = function () {
              var title = element.find('input')[0].value;
              if (!element.find('input')[0].value.trim()) {
                return;
              }
              var mc = MasterCategory.create() ;
              mc.Title = title;
              scope.budget.MasterCategories.push(mc);
              Budget.setDirty();
              scope.masterCategoryPopoverOpen = false;
            };
              
            scope.cancelMasterCategory = function () {
              scope.masterCategoryPopoverOpen = false;
            };
          }
        };
      }]);

})();
