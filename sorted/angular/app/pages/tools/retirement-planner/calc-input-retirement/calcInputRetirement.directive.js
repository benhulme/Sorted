(function() {
  'use strict';
  angular.module('sorted')
    .directive('calcInputRetirement',  ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH +
          'app/pages/tools/retirement-planner/calc-input-retirement/calc-input-retirement.html',
        restrict: 'EA',
        scope: {
          calculator: '=',
          model: '='
        },
        link: function(scope, elm) {

          elm.on('click', '.calc-heading', function (event) {

            var selected = elm.find('.calc-input-group.selected');
            var clicked = angular.element(event.currentTarget);

            if (clicked[0].attributes['data-form-type'].value === 'whereMoney') {
              scope.$apply(function() {
                scope.model.$attributes.tab_viewed = 1;
              });

            }

            if (!clicked.parent().hasClass('selected')) {

              selected.find('.calc-input-container').slideUp();
              selected.removeClass('selected');

              clicked.parent().find('.calc-input-container').slideDown();
              clicked.parent().addClass('selected');

            }

          });

          scope.partnerSliding = false;

          elm.on('click', '.calc-add-partners', function () {

            if (scope.partnerSliding === false) {
              if (elm.find('.addPartnerSection').css('display') === 'none') {
                scope.partnerSliding = true;
                elm.find('.addPartnerSection').slideDown(function () {
                  scope.partnerSliding = false;
                });
              } else {
                scope.partnerSliding = true;
                elm.find('.addPartnerSection').slideUp(function () {
                  scope.partnerSliding = false;
                });
              }
            }
          });
        },
      };
    },
  ]);
}());
