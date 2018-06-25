(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('budgetInputAmount', [
      'budgetingToolConfig',
      'siteConfig',
      function (budgetingToolConfig, siteConfig) {
        return {
          restrict: 'E',
          scope: {
            amount: '=',
            perYear: '=',
            placeholder: '@',
            toggleEditable: '&'
          },
          templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/components/budget-input-amount/budgetInputAmount.html',
          controller: ['$scope', function ($scope) {
            $scope.maxInt = Math.floor((Number.MAX_SAFE_INTEGER || budgetingToolConfig.IE_MAX_SAFE_INTEGER) / 100);
          }],
          link: function (scope, element) {
            element.on('click',  function(event) {
              event.stopImmediatePropagation();
            });
          }
        };
      }
    ]);

})();
