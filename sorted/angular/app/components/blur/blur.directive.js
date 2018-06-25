/**
 * Created by stanislavk on 21/06/2016.
 */
(function() {
  'use strict';
  angular.module('sorted')
    .directive('blur', [
        function() {
          return {
            restrict: 'A',
            link: function(scope, elm) {
              elm.bind('keydown', function(e){
                if(e.keyCode === 13){
                  e.target.blur();
                }
              });
            },
          };
        },
      ]
    );
}());
