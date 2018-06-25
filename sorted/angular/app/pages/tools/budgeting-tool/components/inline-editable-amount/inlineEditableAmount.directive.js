/* global BigNumber */
(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('inlineEditableAmount', [
      '$timeout',
      'siteConfig', 
      function ($timeout, siteConfig) {
        return {
          restrict: 'E',
          templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/components/inline-editable-amount/inlineEditableAmount.html',
          controller: ['$scope', 'Budget', 'budgetingToolConfig', function ($scope, Budget, budgetingToolConfig) {
            $scope.toggleEditable = function (category) {
              if (!category.editing) {
                angular.copy(category.Cents, $scope.inlineEditValue);
              } else {
                if ($scope.inlineEditValue !== undefined &&
                    !$scope.inlineEditValue.lessThan(0) &&
                    $scope.inlineEditValue.lessThan(Number.MAX_SAFE_INTEGER || budgetingToolConfig.IE_MAX_SAFE_INTEGER) &&
                    !$scope.inlineEditValue.eq(category.Cents)) {
                  angular.copy($scope.inlineEditValue, category.Cents);
                  Budget.setDirty();
                }
                $scope.inlineEditValue = new BigNumber(0);
              }
              category.editing = !category.editing;
            };
          }]
        };
      }
    ]);

})();
