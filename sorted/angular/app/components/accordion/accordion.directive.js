(function() {
  'use strict';
  angular.module('sorted')
    .directive('accordion', [function() {
      return {
        restrict: 'A',
        scope: {},
        link: function(scope, elm) {

          elm.on('click', '.accordion-heading', function(event) {

            var selected = elm.find('.accordion-item.selected');
            var clicked = angular.element(event.currentTarget);

            if (!clicked.parent().hasClass('selected')) {

              selected.find('.accordion-content').slideUp();
              selected.removeClass('selected');

              clicked.parent().find('.accordion-content').slideDown();
              clicked.parent().addClass('selected');

            }

          });

        },
      };
    }]);

}());
