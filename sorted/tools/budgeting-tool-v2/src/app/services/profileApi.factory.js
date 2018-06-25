// (function () {
//   'use strict';
//
//   angular.module('sorted.http')
//     .factory('profileApi', [
//       '$http',
//       '$q',
//       'siteConfig',
//       function ($http, $q, siteConfig) {
//         var BASE_URL = siteConfig.API_PREFIX + '/profile/';
//
//         function get () {
//           return $http({
//             method: 'GET',
//             url: BASE_URL + 'get'
//           })
//             .then(function (response) {
//               if (response.data.success === 'false') {
//                 return $q.reject();
//               }
//               return response.data;
//             }, function (error) {
//               return $q.reject(error);
//             });
//         }
//
//         function isLoggedIn () {
//           return get()
//             .then(function () {
//               return true;
//             })
//             .catch(function () {
//               return false;
//             });
//         }
//
//         function uploadBudgetImage(image) {
//           var method = 'POST';
//           var url = BASE_URL + 'custom';
//
//           // NB: IE 10+ only
//           // TODO: fallback option for the diehards still using IE 9
//           var formData = new FormData();
//           formData.append('Image', image);
//           return $http({
//             data: formData,
//             method: method,
//             url: url,
//             transformRequest: angular.identity,
//             headers: {'Content-Type': undefined}
//           })
//           .then(function (response) {
//             return response.data;
//           }, function () {
//             return null;
//           });
//         }
//
//         return {
//           get: get,
//           uploadBudgetImage: uploadBudgetImage,
//           isLoggedIn: isLoggedIn
//         };
//       }
//     ]);
//
// })();



(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .service('profileApi', profileApi);

  /** @ngInject */
  function profileApi($log,
               $cookies,
               $q,
               $http,
               $location,
               siteConfig) {

    // var DOMAIN = ($location.host() == 'localhost') ? 'http://sorted.local' : '' ;

    var DOMAIN = setDomain();

    var BASE_URL = DOMAIN + siteConfig.API_PREFIX + '/profile/';

    var profile;


    function getProfile() {
      return profile
    }

    function setDomain()
    {
      var domain;
      console.log($location.host());
      switch($location.host()) {
        case 'localhost' :
          // domain = 'http://sorted.local/';
          domain = 'http://localhost';
          break;

        // case '192.168.178.47' :
        //   domain = 'http://192.168.33.10/';
        //   break;

        default :
          domain = '';
          break;
      }

      return domain;
    }

    function get () {


      console.log(BASE_URL + 'get');

      return $http({
        method: 'GET',
        url: BASE_URL + 'get'
      })
        .then(function (response) {
          if (response.data.success === 'false') {
            return $q.reject();
          }
          console.log(profile);
          profile = response.data;
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

    function getUploadURL() {
      return BASE_URL + 'custom';
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
      isLoggedIn: isLoggedIn,
      getUploadURL: getUploadURL,
      getProfile: getProfile,
    };
  }
})();
