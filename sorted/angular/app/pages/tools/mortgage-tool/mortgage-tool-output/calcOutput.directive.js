(function () {
  'use strict';
  angular.module('sorted')
    .directive('mortgageToolOutput', ['siteConfig',  function (siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/mortgage-tool/mortgage-tool-output/calc-output.html',
        restrict: 'EA',
        scope: {
          calculator: '=',
          model: '='
        },
        link: function (scope, elm) {

          //scope.$on('slideEnded', function () {
          //  scope.$apply(scope.currentModel.set('repayments1', scope.nudgeModel), {nudge: true});
          //});

          scope.ageFormHidden = true;


          elm.on('click', '.calc-output-birthdate', function(event) {
            event.preventDefault();
            scope.ageFormHidden = false;
            scope.$apply();
          });

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
                wait:true, // wait for server response
                parse: true // flag to pass response through parse for cleanings and storing
              };

            // navigate back up to the top level MortgageModel object
            scope.currentModel.collection.parent.set({Title: title}, {silent:true});
            scope.currentModel.collection.parent.save(null, opts);

          });


        },
        controller: ['$scope', function ($scope) {

          // Initially, assign the first model to the 'watched model'
          $scope.currentModel = $scope.model.collection.at(0);

          $scope.nudgeOptions = [
            {
              floor: 0,
              ceil: 500000,
              showSelectionBar: true,
            },
            {
              floor: 0,
              ceil: 200000,
              showSelectionBar: true,
            },
            {
              floor: 0,
              ceil: 100000,
              showSelectionBar: true,
            },
          ];

          $scope.nudge = $scope.calculator.nudge;
          $scope.nudge.options = $scope.nudgeOptions[0];

          // View Helper methods
          $scope.$on('output:update', function (event, modelIndex) {
            $scope.currentModel = $scope.model.collection.at(modelIndex);
            $scope.nudge.options = $scope.nudgeOptions[modelIndex];
          });

          $scope.model.collection.on('change', function (model) {
            if (model.hasChanged('loan1') || model.hasChanged('interest1') || model.hasChanged('freq1')  || model.hasChanged('lump_sum_repayment')) {
              $scope.nudgeOptions[$scope.currentModel.id].floor = Math.ceil($scope.currentModel.calculateSlider(30));
              $scope.nudgeOptions[$scope.currentModel.id].ceil = Math.ceil($scope.currentModel.calculateSlider(1));
            }
          });
        },
        ],
      };
    }
    ]);
}());
