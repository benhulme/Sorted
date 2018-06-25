/**
 * Created by greg on 1/03/2016.
 */

(function () {
  'use strict';
  angular.module('sorted')
    .directive('kiwisaverSavingsForm', ['siteConfig', function (siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/kiwisaver-savings-calculator/kiwisaver-savings-form/index.html',
        restrict: 'EA',
        scope: false, // rely on parent scope (aka rootScope)
        link: function (scope, elm) {

          elm.on('click', '.calc-heading', function (event) {

            var selected = elm.find('.calc-input-group.selected');
            var clicked = angular.element(event.currentTarget);

            if (!clicked.parent().hasClass('selected')) {

              selected.find('.calc-input-container').slideUp();
              selected.removeClass('selected');

              clicked.parent().find('.calc-input-container').slideDown();
              clicked.parent().addClass('selected');

            }
          });

            //elm.on('click', '.has_kiwisaver .input-select-button', function () {
          //  $('.kiwisaver-savings-registered').toggleClass('_hidden');
          //  if($('.has_kiwisaver').find('button.active').data('value')){
          //    $('.ks-result').hide();
          //  }else{
          //    $('.ks-result').show();
          //  }
          //});

          //elm.on('change', 'select', function (event) {
          //  var clicked = angular.element(event.currentTarget);
          //
          //  if (clicked[0].name === 'employment_status') {
          //
          //    var
          //      relatedId = clicked.data('related'),
          //      label;
          //
          //    if (clicked.val() === "2") { // working
          //      label = _.find(scope.calculator.fields, {id: relatedId}).label;
          //      $('.ks-percent').show();
          //      $('.your-contr').hide();
          //      $('.ks-nudge').show(); //show ks % nudge
          //      $('.contrb-nudge').hide(); //hide contrib nudge
          //    }
          //    else {
          //      label = _.find(scope.calculator.fields, {id: relatedId}).label2;
          //      $('.ks-percent').hide();
          //      $('.your-contr').show();
          //      $('.ks-nudge').hide(); //hide ks %
          //      $('.contrb-nudge').show(); //show contrib nudge
          //    }
          //
          //    $('.' + relatedId).find('label').text(label);
          //  }
          //});

          elm.on('blur', '#earnings', function () {
            $('.kiwisaver-savings-section.selected').click();
          });
        }
      };

    }]);
}());
