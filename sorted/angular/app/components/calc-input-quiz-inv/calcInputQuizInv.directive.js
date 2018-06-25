(function() {
  'use strict';
  angular.module('sorted')
    .directive('calcInputQuizInv',  ['siteConfig', '$window', function(siteConfig, $window) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/calc-input-quiz-inv/calc-input-quiz-inv.html',
        restrict: 'EA',
        scope: {
          calculator: '=',
          model: '=',
          updateParent: '&updateCurrentModel',
          digestCalc: '&',
        },
        link: function(scope, elm) {

          scope.siteConfig = siteConfig;

          elm.on('click', '.ui-results-link', function(e) {
            e.preventDefault();
            var output = angular.element('.calc-output');
            var top = output.offset().top - 80;
            $window.scrollTo(0, top);
          });

          elm.on('click', '.calc-heading', function(event) {

            var selected = elm.find('.calc-input-group.selected');
            var clicked = angular.element(event.currentTarget);

            if (!clicked.parent().hasClass('selected')) {

              selected.find('.calc-input-container').slideUp();
              selected.removeClass('selected');

              clicked.parent().find('.calc-input-container').slideDown();
              clicked.parent().addClass('selected');
            }

          });

          scope.digestCalcInput = function() {
            scope.$digest();
            scope.digestCalc();
          };

        }
      };
    },
  ]);
}());
