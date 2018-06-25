(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('budgetingQuestions', [
      '$location', 
      'Budget',
      'budgetingToolConfig',
      'masterCategoryCompiler',
      'siteConfig', 
      function ($location, Budget, budgetingToolConfig, masterCategoryCompiler, siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/views/budget-template/budgeting-questions/budgetingQuestions.html',
        restrict: 'E',
        scope: false,
        link: function ($scope) {
          $scope.togglePresetSelect = function (preset) {
            if (!preset.Selected) {
              $scope.budget.Categories = _.union($scope.budget.Categories, preset.Categories);
            } else {
              $scope.budget.Categories = _.difference($scope.budget.Categories, preset.Categories);
            }
            preset.Selected = !preset.Selected;
          };

          // If defaults is true, the user hit the 'skip' link... only the default
          // categories should be included in the budget
          $scope.submitForm = function (defaults) {
            $scope.budget.Categories = defaults ? [] : $scope.budget.Categories;

            // Populate Categories array with category objects corresponding to the IDs it previously contained
            $scope.budget.Categories = _.flatMap($scope.data.MasterCategories, function (masterCategory) {
              return _.filter(masterCategory.Categories, function (category) {
                return _.includes($scope.budget.Categories, category.ID);
              });
            });

            // Build a list of master categories containing a combination of the default
            // categories, and those chosen during the budgeting questions
            $scope.budget.MasterCategories = masterCategoryCompiler.compile(
              _.union(
                $scope.budget.Categories, 
                _.flatMap($scope.data.MasterCategories, function (mc) {
                  return _.filter(mc.Categories, { Default: true });
                })
              ),
              $scope.data.MasterCategories
            );
            delete $scope.budget.Categories;
            return $location.path(budgetingToolConfig.BUDGETING_TOOL_PATH);
          };
        }
      };
    }]);

})();
