(function() {
  'use strict';
  angular.module('sorted')
    .directive('calcOutputRetirement',  ['siteConfig',  function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH +
          'app/pages/tools/retirement-planner/calc-output-retirement/calc-output-retirement.html',
        restrict: 'EA',
        scope: {
          model: '=',
          calculator: '=',
        },
        link: function(scope) {

          scope.sliderOptions = {
            floor: 0,
            ceil: 100000,
            showSelectionBar: true,
          };

          scope.slider = {
            options: scope.sliderOptions,
          };

          scope.getWeekly = function(liveon, shortfall) {

            return parseInt(liveon) + parseInt(shortfall);

          };

          scope.$watch('model.$attributes', function(newVal, oldVal) {
            if (newVal.your_other_schemes === oldVal.your_other_schemes) {
              scope.sliderOptions.ceil = scope.model.result.$attributes.amount_total;
            }
          }, true);
          /**
           * Broadcast listener triggered from Modal form
           */
          scope.$on('save:calc', function (event, title) {

            // call save on the model
            var
              opts = {
                success: function () {
                  angular.element('#save-as-modal').modal('hide');
                },
                error: function () {
                },
                silent: true,
                parse: true // flag to pass response through parse for cleanings and storing
              };
            scope.model.$attributes.Title = title;

            scope.model.save(null,  opts);
          });


        },
      };
    },
  ]);
}());
