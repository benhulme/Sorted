(function() {
  'use strict';
  angular.module('sorted')


    .directive('calcInput',  ['siteConfig', '$window', function(siteConfig, $window) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/calc-input/calc-input.html',
        restrict: 'EA',
        scope: {
          calculator: '=',
          models: '=',
          updateParent: '&updateCurrentModel',
          digestCalc: '&',
        },
        link: function(scope, elm) {

          elm.on('click', '.calc-input-add', function(event) {

            var formType = angular.element(event.currentTarget).attr('data-form-type');
            var forms = elm.find('.calc-input-group[data-form-type="' + formType + '"]');

            var shown = false;

            angular.forEach(forms, function(form) {

              angular.element(event.currentTarget).addClass('_hidden');

              if (angular.element(form).hasClass('selected')) {
                angular.element(form).removeClass('selected');
                angular.element(form).find('.calc-input-container').slideUp();
              }

              if (!shown && angular.element(form).hasClass('_hidden')) {
                angular.element(form).removeClass('_hidden').addClass('selected');
                angular.element(form).find('.calc-input-container').css('display', 'none').slideDown();

                var unique = angular.element(form).find('.calc-heading').attr('data-unique');
                scope.updateParent({
                  formType: formType,
                  unique: unique,
                });
                shown = true;
              }

            });

          });

          elm.on('click', '.calc-heading', function(event) {

            var selected = elm.find('.calc-input-group.selected');
            var clicked = angular.element(event.currentTarget);

            if (!clicked.parent().hasClass('selected')) {

              selected.find('.calc-input-container').slideUp();
              selected.removeClass('selected');

              clicked.parent().find('.calc-input-container').slideDown();
              clicked.parent().addClass('selected');

              var formType = clicked.attr('data-form-type');
              var unique = clicked.attr('data-unique');

              scope.updateParent({
                formType: formType,
                unique: unique,
              });

            }

          });

          elm.on('click', '.ui-results-link', function(e) {
            e.preventDefault();
            var output = angular.element('.calc-output');
            var top = output.offset().top - 80;
            $window.scrollTo(0, top);
          });

          scope.digestCalcInput = function() {
            scope.$digest();
            scope.digestCalc();
          };

        },
        controller: ['$scope',
          function($scope) {

            $scope.currentGroup = 'creditCard';
            $scope.currentIndex = 0;

            $scope.siteConfig = siteConfig;

            $scope.slider = {
              options: {
                floor: 1,
                ceil: 30000000,
                showSelectionBar: true,
              },
            };

            // on enter press blur field
            $scope.doBlur = function($event){
              var target = $event.target;
              target.blur();
            };

          },
        ],
      };
    },
  ]).
  directive('noCommas', function () {

    return {
      restrict: 'A',
      require: '?ngModel',
      link: function (scope, element, attrs, ngModel) {

        ngModel.$parsers.unshift(function (inputValue) {
          var temp;
          temp = angular.copy(inputValue);
          temp = temp.replace(/,/g,'');

          ngModel.$viewValue = temp;
          ngModel.$render();
          ngModel.$commitViewValue();

          return temp;


        });
      }
    };
  }).
  directive('ngEnter', function() {
    // add and enter bind event
    return function(scope, element, attrs) {
      console.log('enter');
        element.bind("keydown keypress", function(event) {          
            if(event.which === 13) {
              
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {$event: event});
                });

                event.preventDefault();
            }
        });
    };
});
}());
