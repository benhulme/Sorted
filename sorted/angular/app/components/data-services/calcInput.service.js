(function() {
  'use strict';

  angular.module('sorted')
    .service('calcInputService', ['$http', 'calcInputs',
      function($http, calcInputs) {

        return {
          get: function(endpoint, params) {

            var req = {
              method: 'GET',
              url: calcInputs[endpoint],
              params: params,
            };

            return $http(req)
              .success(function() {
              });
          },
        };
      },
    ]
  );
}());
