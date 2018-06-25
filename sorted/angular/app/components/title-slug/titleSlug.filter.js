(function(){
  'use strict';

  angular.module('sorted')
    .filter('titleSlug', [function() {
      return function (input) {
        return input.replace(/[\W]+/g, '-').toLowerCase();
      };
    }]);

}());
