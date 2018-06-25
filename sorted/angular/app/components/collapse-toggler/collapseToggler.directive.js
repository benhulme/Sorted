/**
 * Created by greg on 11/02/2016.
 */

(function(){
  "use strict";
  angular.module('sorted')
    .directive('collapseToggler', function(){
      return {
        restrict: 'A',
        link: function (scope, elem) {
          elem.on('click', function () {
            $(this).toggleClass('in').siblings('.collapse').toggleClass('in');
          });
        }
      };
    });
}());
