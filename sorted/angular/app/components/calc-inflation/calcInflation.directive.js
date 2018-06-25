(function() {
  'use strict';
  angular.module('sorted')
    .directive('calcInflation',  ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/calc-inflation/calc-inflation.html',
        restrict: 'EA',
        scope: {
          field: '=',
          model: '=',
          label: '=',
        },
        link: function (scope, el) {

          el.on('click', '.input-select-button', function (event) {

            var clicked = angular.element(event.currentTarget);

            // if data-related attribute defined, trigger visibility
            // hide other all toggle
            if (clicked.data('related')) {
              var related = angular.element(clicked.data('related'));

              related.parent().find(clicked.data('toggle')).addClass('_hidden');

              // show related
              related.removeClass('_hidden');
            }

            if (clicked.data('result')) {
              $(clicked.data('result')).toggleClass('_hidden');
            }

            // manually set the value of the newly selected button -> not a pretty hack ;)
            // wrap in $apply to ensure change is propagated to all directives
            if (scope.model) {
              scope.$apply(scope.model.set(scope.field.calcModel, clicked.data('value')));
            }

          });
        }
      };
    }]);
}());
