(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('guaranteeViewport', [
      '$timeout', 
      '$window', 
      'budgetingToolConfig', 
      function ($timeout, $window, budgetingToolConfig) {
        return {
          restrict: 'A',
          link: function (scope, element) {
            function isVisible (rect) {
              return rect.bottom > 0 &&
                     rect.right > 0 &&
                     rect.left < ($window.innerWidth || document.documentElement.clientWidth) &&
                     rect.top < ($window.innerHeight || document.documentElement.clientHeight);
            }

            element.on('focus', function () {
              var rect = element[0].getBoundingClientRect();

              if ($window.innerWidth < budgetingToolConfig.TABLET_VIEWPORT_WIDTH) {
                // Fairly rough solution to iOS scrolling issues. This addresses the problem where
                // iOS Safari and Chrome inappropriately scroll the input out of viewport if the 
                // mobile breakdown is open.
                if (!isVisible(rect)) {
                  $timeout(function () {
                    // We can get away with this because full jQuery is available
                    angular.element(element).parents('.budget-category-copy-container')[0].scrollIntoView();
                  }, 0);
                }

                // Prevent sticky nav from obscuring input elements if they scroll beneath it
                angular.element('navigation').hide();
              }
            });

            element.on('blur', function () {
              if ($window.innerWidth < budgetingToolConfig.TABLET_VIEWPORT_WIDTH) {
                angular.element('navigation').show();
              }
            });
          }
        };
      }
    ]);

})();
