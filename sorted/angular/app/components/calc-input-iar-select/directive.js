/**
 * Created by greg on 19/02/2016.
 */


(function () {
  'use strict';
  angular.module('sorted')
    .directive('calcInputIarSelect', ['siteConfig', function (siteConfig) {

      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/calc-input-iar-select/input.html',
        restrict: 'EA',
        scope: {
          field: '=',
          model: '='
        },
        link: function ($scope, el) {

          el.on('click', '.calc-input-btn-select-group button', function (event) {

            var clicked = angular.element(event.currentTarget);

            // bootstrap requires a 2nd btn-group for justified btns
            clicked.closest('.btn-container').find('button.active').removeClass('selected');

            // now add active to clicked
            clicked.addClass('selected');

            // if data-related attribute defined, trigger visibility
            // hide other all toggle
            if(clicked.data('related')){

              var related = angular.element(clicked.data('related'));

              related.parent().find(clicked.data('toggle')).addClass('_hidden');

              // show related
              related.removeClass('_hidden');
            }

            if(clicked.data('result')){
              $(clicked.data('result')).toggleClass('_hidden');
            }

            // manually set the value of the newly selected button
            $scope.$apply($scope.model.set($scope.field.calcModel, clicked.data('value')));

          });
        }
      };
    }]);
}());