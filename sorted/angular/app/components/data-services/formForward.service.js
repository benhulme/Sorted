(function(){
  'use strict';

  angular.module('sorted')
    .service('formForwardService', ['apiEndpoints', '$location', function(apiEndpoints, $location) {
      return {
        forward: function(endpoint, params) {
          $location.path(apiEndpoints[endpoint]).search(params);
        },
      };
    }]);
}());
