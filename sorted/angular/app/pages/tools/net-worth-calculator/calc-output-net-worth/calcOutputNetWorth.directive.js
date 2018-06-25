(function () {
  'use strict';
  angular.module('sorted')
    .directive('calcOutputNetWorth', ['siteConfig',  function (siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/net-worth-calculator/calc-output-net-worth/calc-output-net-worth.html',
        restrict: 'EA',
        scope: {
          calculator: '=',
          model: '=',
          models: '='
        },
        link: function (scope) {

          /**
           * Broadcast listener triggered from Modal form
           */
          scope.$on('save:calc', function (event, title) {

            // call save on the model
            var
              opts = {
                success: function (model, response, options) {
                  console.info('SUCCESS: ', model, response, options);

                  angular.element('#save-as-modal').modal('hide');
                },
                error: function (model, response, options) {
                  console.error('ERROR: ', model, response, options);

                },
                silent: true,
                parse: true // flag to pass response through parse for cleanings and storing
              };
            scope.model.$attributes.Title = title;

            scope.model.save(null,  opts);
          });


        }
      };
    }
    ]);
}());
