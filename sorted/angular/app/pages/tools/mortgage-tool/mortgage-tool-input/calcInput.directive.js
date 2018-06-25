(function () {
  'use strict';
  angular.module('sorted')
    .directive('mortgageToolInput', ['siteConfig', '$window', function (siteConfig, $window) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/mortgage-tool/mortgage-tool-input/calc-input.html',
        restrict: 'EA',
        scope: {
          calculator: '=',
          model: '=',
          validation: '=',
        },
        link: function (scope, elm) {

          elm.on('click', '.calc-heading', function (event) {

            var selected = elm.find('.calc-input-group.selected');
            var clicked = angular.element(event.currentTarget);

            if (!clicked.parent().hasClass('selected')) {

              selected.find('.calc-input-container').slideUp();
              selected.removeClass('selected');

              clicked.parent().find('.calc-input-container').slideDown();
              clicked.parent().addClass('selected');

              // emit a notification with the new model id
              scope.$apply(scope.$emit('input:changed', clicked.data('model-id')));
            }

          });

          elm.on('click', '.ui-results-link', function (e) {
            e.preventDefault();
            var output = angular.element('.calc-output');
            var top = output.offset().top - 80;
            $window.scrollTo(0, top);
          });

          /**
           * listen for changes in result and if a change in
           * the loan amt returns an invalid result, then
           * visually notify user
           */
          scope.currentModel.on('result:change', function (model) {

            var errorClass = 'form-input-error',
              elements = ['#loan1', '#repayments1', '#term1'];

            if (!model.hasResult() && model.get('repayments1') > 0){
              elements.forEach(function (e) {
                  var ae = angular.element(e);
                ae.addClass(errorClass);
                ae.parent().parent().find('label').addClass('font-red');
              });
            }
            else {
              elements.forEach(function (e) {
                var ae = angular.element(e);
                ae.removeClass(errorClass);
                ae.parent().parent().find('label').removeClass('font-red');
              });
            }
          });

          scope.calcTotal = function() {

            var loan1 = parseInt(scope.model.collection.at(0).$attributes.loan1);
            var loan2 = parseInt(scope.model.collection.at(1).$attributes.loan1);
            var loan3 = parseInt(scope.model.collection.at(2).$attributes.loan1);

            if (isNaN(loan1)){
              loan1 = 0;
            } 
            if (isNaN(loan2)){
              loan2 = 0;
            } 
            if (isNaN(loan3)){
              loan3 = 0;
            } 

            return loan1 + loan2 + loan3;
          };

        },
        controller: ['$scope', function ($scope) {

          // Initially, assign the first model to the 'watched model'
          $scope.currentModel = $scope.model.collection.at(0);

          // View Helper methods
          $scope.$on('output:update', function (event, modelIndex) {
            // assign currentModel
            $scope.currentModel = $scope.model.collection.at(modelIndex);
          });

        }
        ]
      };
    }
    ]);
}());
