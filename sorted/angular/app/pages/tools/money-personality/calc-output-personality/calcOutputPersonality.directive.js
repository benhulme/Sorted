(function() {
  'use strict';
  angular.module('sorted')
    .directive('calcOutputPersonality',  ['siteConfig',  function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH +
          'app/pages/tools/money-personality/calc-output-personality/calc-output-personality.html',
        restrict: 'EA',
        scope: {
          model: '=',
          result: '=',
          dropdown: '=',
          resultData: '=',
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



        },
        controller: ['$scope',
          function($scope) {

            $scope.siteConfig = siteConfig;

            var resultMap = {
              OImSD: 'money-mentor',
              OImSF: 'visual-stylist',
              OImLD: 'financial-controller',
              OImLF: 'entrepreneur',
              ORSD: 'money-organiser',
              ORSF: 'hedonist',
              ORLD: 'money-surgeon',
              ORLF: 'money-maestro',
              InImSD: 'insightful-investor',
              InImSF: 'authentic-dreamer',
              InImLD: 'adviser-speculator',
              InImLF: 'system-innovator',
              InRSD: 'practical-domestic',
              InRSF: 'sensible-drifter',
              InRLD: 'sound-controller',
              InRLF: 'money-mechanic',
            };

            $scope.$watch('result', function() {

              if ($scope.result) {
                var urlSegment = resultMap[$scope.result];
                $scope.currentResult = _.find($scope.resultData, {URLSegment: urlSegment});
                $scope.quizResultTitle = $scope.currentResult.Title;
                $scope.quizResult = true;
              }

            });

            $scope.$watch('dropdown.value', function() {
              if ($scope.dropdown && $scope.dropdown.value) {
                var urlSegment = $scope.dropdown.value;
                $scope.currentResult = _.find($scope.resultData, {URLSegment: urlSegment});
                //$scope.quizResult = false;
              }

            });
            /*
            $scope.$watch('resultData', function() {
              if ($scope.resultData) {
                $scope.currentResult = _.find($scope.resultData, { URLSegment: 'adviser-speculator' });
              }
            });
            */
          },
        ],
      };
    },
  ]);
}());
