/**
 * Created by greg on 19/02/2016.
 */


(function () {
  'use strict';
  angular.module('sorted')
    .directive('calcInputButtonSelect', ['siteConfig', function (siteConfig) {

      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/calc-input-button-select/input.html',
        restrict: 'EA',
        scope: {
          field: '=',
          model: '=',
          label: '='
        },
        link: function (scope, el) {

          scope.isSelected = function(buttonVal, modelVal) {

            // test input values for numbers
            if(!_.isNaN(parseInt(buttonVal)) && !_.isNaN(parseInt(modelVal))){
              return (parseInt(buttonVal) === parseInt(modelVal));
            }
            // otherwise do string comparison
            else {
              return (buttonVal == modelVal); // jshint ignore:line
            }
          };

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
