(function () {
  'use strict';
  angular.module('sorted')
    .directive('calcOutputKiwisaverFees', ['siteConfig',  function (siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH +
        'app/pages/tools/kiwisaver-fees/calc-output-kiwisaver-fees/calc-output-kiwisaver-fees.html',
        restrict: 'EA',
        scope: {
          model: '='
        },
        link: function (scope, elm) {

          scope.directions = {
            fees_till_65_dollars: 'NEUTRAL',
            scheme: 'NEUTRAL',
            active: 'NEUTRAL',
          };

          scope.mobileFilterOptions = [
            {label: 'Highest Fees Until age 65', value: 1},
            {label: 'Lowest Fees Until age 65', value: 2},
            {label: 'A-Z Scheme Name', value: 3},
            {label: 'Z-A Scheme Name', value: 4},
            {label: 'Active Fund', value: 5},
            {label: 'Passive Fund', value: 6},
          ];

          scope.mobileFilter = null;

          scope.$watch('mobileFilter', function () {

            if (scope.mobileFilter) {

              switch (scope.mobileFilter) {

                case '1':
                  scope.result = _.orderBy(scope.result, 'fees_till_65_dollars', 'desc');
                  scope.directions.fees_till_65_dollars = 'UP';
                  break;
                case '2':
                  scope.result = _.orderBy(scope.result, 'fees_till_65_dollars', 'asc');
                  scope.directions.fees_till_65_dollars = 'DOWN';
                  break;
                case '3':
                  scope.result = _.orderBy(scope.result, 'scheme', 'asc');
                  scope.directions.scheme = 'UP';
                  break;
                case '4':
                  scope.result = _.orderBy(scope.result, 'scheme', 'desc');
                  scope.directions.scheme = 'DOWN';
                  break;
                case '5':
                  scope.result = _.orderBy(scope.result, 'active', 'asc');
                  scope.directions.active = 'UP';
                  break;
                case '6':
                  scope.result = _.orderBy(scope.result, 'active', 'desc');
                  scope.directions.active = 'DOWN';
                  break;
              }

            }

          });

          /**
           * Comparison is handled by setting an attribute on the model
           * and uses a show filter in the html along with the comparing boolean flag
           */
          elm.on('click', '.btn-compare', function () {
            // switch boolean state
            scope.comparing = !scope.comparing;

            // if turned off, remove flag from models
            if(!scope.comparing){
              scope.result.forEach(function(m){
                if(m.compare){
                  m.compare = 0;
                }
              });
            }
            scope.$apply(scope.comparing);
          });

          elm.on('click', '.output-ksf-direction', function (event) {

            var sortField = angular.element(event.currentTarget).attr('data-sort-field');

            var newDirection = 'asc';

            var fieldDirection = scope.directions[sortField];

            scope.directions = {
              fees_till_65_dollars: 'NEUTRAL',
              scheme: 'NEUTRAL',
              active: 'NEUTRAL',
            };

            if (fieldDirection === 'NEUTRAL') {
              newDirection = 'asc';
              scope.directions[sortField] = 'UP';
            }

            if (fieldDirection === 'UP') {
              newDirection = 'desc';
              scope.directions[sortField] = 'DOWN';
            }

            if (fieldDirection === 'DOWN') {
              newDirection = 'asc';
              scope.directions[sortField] = 'UP';
            }

            //scope.$apply(scope.result = _.orderBy(scope.result, sortField, newDirection));
            scope.$apply(scope.result = _.orderBy(scope.result, sortField, newDirection));


          });

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

            scope.model.save(null, opts);
          });

        },
        controller: ['$scope',
          function ($scope) {

            $scope.comparing = false;

            $scope.result = [];

            $scope.$on('output:redraw', function () {

              var resultType = $scope.model.$attributes.iac === 1 ? 'todays' : 'nominal';


                $scope.result = $scope.model.result[resultType].map(function (model) {
                  return model.toJSON();
                  //return model;
                });


              $scope.$emit('cm-spinner.stop');

              $scope.$apply();

            });

          }
        ]
      };
    }
    ]);
}());
