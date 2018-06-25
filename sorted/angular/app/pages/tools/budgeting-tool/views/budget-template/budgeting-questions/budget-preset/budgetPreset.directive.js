(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('budgetPreset', ['colourGenerator', 'siteConfig', function (colourGenerator, siteConfig) {
      return {
        restrict: 'E',
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/views/budget-template/budgeting-questions/budget-preset/budgetPreset.html',
        link: function (scope) {
          // TODO: more efficient solution...
          // sadly, this gets called far too many times on the view
          // (once for each icon background and border).
          scope.getPresetBackground = function (preset, colour) {
            return preset.Selected ? colourGenerator.hexToRgba(colour, 0.2) : null;
          };
        }
      };
    }]);

})();
