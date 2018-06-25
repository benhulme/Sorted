(function () {
  'use strict';
  angular.module('sorted')
    .directive('calcInputNetWorth', ['siteConfig', function (siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/net-worth-calculator/calc-input-net-worth/calc-input-net-worth.html',
        restrict: 'EA',
        scope: {
          calculator: '=',
          models: '='
        },        
        link: function (scope, elm) {

          // Accordion onClick handler
          elm.on('click', '.calc-input-net-worth-heading', function (event) {

            var selected = elm.find('.calc-input-net-worth-heading.selected');
            var clicked = angular.element(event.currentTarget);

            if (selected[0] !== clicked[0]) {

              selected.parent().find('.calc-input-container').slideToggle();
              selected.toggleClass('selected');

              clicked.parent().find('.calc-input-container').slideToggle();
              clicked.toggleClass('selected');

              // toggle first sub-heading in sub-heading
              var subhead = clicked.parent().find('.calc-input-net-worth-sub-heading').first();
              subhead.trigger('click');

            }

          });

          /**
           * handle click events for sub-heading
           *
           * behaviour is:
           * - if collapsed, it will expand the current element and collapse the
           *    corresponding expanded element,  otherwise it will just collapse
           */
          elm.on('click', '.calc-sub-heading', function (event) {
            var selected = elm.parent().find('.calc-input-net-worth-sub-heading.selected');
            var clicked = angular.element(event.currentTarget);

            if (selected[0] !== clicked[0]) {
              clicked.parent().find('.calc-input-container-child').slideToggle();
              clicked.toggleClass('selected');
              selected.parent().find('.calc-input-container-child').slideToggle();
              selected.toggleClass('selected');
            }

          });

          /**
           * Handle click event for second level sub heading
           * e.g. Other Assets
           */

          elm.on('click', '.calc-input-level-heading', function (event) {
            elm.parent().find('.second-level-item').toggleClass('_hidden');
            angular.element(event.currentTarget).toggleClass('selected');
          });

        }
      };
    }
    ]);
}());
