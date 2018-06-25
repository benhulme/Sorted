(function () {
  'use strict';

  angular.module('sorted.http')
    .factory('profileApi', [
      '$http', 
      '$q',
      'siteConfig',
      function ($http, $q, siteConfig) {
        var BASE_URL = siteConfig.API_PREFIX + '/profile/';

        function get () {
          return $http({
            method: 'GET',
            url: BASE_URL + 'get'
          })
            .then(function (response) {
              if (response.data.success === 'false') {
                return $q.reject();
              }
              return response.data;
            }, function (error) {
              return $q.reject(error);
            });
        }

        function isLoggedIn () {
          return get()
            .then(function () {
              return true;
            })
            .catch(function () {
              return false;
            });
        }

        function uploadBudgetImage(image) {
          var method = 'POST';
          var url = BASE_URL + 'custom';

          // NB: IE 10+ only 
          // TODO: fallback option for the diehards still using IE 9
          var formData = new FormData();
          formData.append('Image', image);
          return $http({
            data: formData,
            method: method,
            url: url,
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
          })
          .then(function (response) {
            return response.data;
          }, function () {
            return null;
          });
        }

        return {
          get: get,
          uploadBudgetImage: uploadBudgetImage,
          isLoggedIn: isLoggedIn
        };
      }
    ]);

})();
