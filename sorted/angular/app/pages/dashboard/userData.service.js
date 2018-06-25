/**
 * Created by stanislavk on 2/03/2016.
 */
/**
 * Created by stanislavk on 28/01/2016.
 */

(function(){
  'use strict';

  angular.module('sorted')
    .service('userStorage', ['$http', function($http){

      var user = {};

      user.isLoggedIn = function(){
        return null !== sessionStorage.getItem('userData');
      };
      user.data =  JSON.parse(sessionStorage.getItem('userData'));

      user.getProfile = function() {

        return $http({
          method: 'GET',
          header: {
            "X-Csrf-Token" : window.$_gah2Anoh
          },
          url: '/api/v0.1/profile/get'
        })
        .then(function (response) {
          sessionStorage.setItem('userData', JSON.stringify(response.data));
        },
        function () {
          console.error('Failed to retrieve profile.');
        });
      };

      user.saveProfile = function(userData){
        return $http({
          method: 'PUT',
          headers: {
            'X-Csrf-Token': window.$_gah2Anoh
          },
          url: '/api/v0.1/profile/update',
          data: userData
        }).then(function(){
          sessionStorage.setItem('userData', userData);
        },
        function(){
          console.error('Failed to retrieve profile.');
        });
      };

      user.updateUsersAvatar  = function(file){
        var fd = new FormData();
        fd.append('Image', file);
        var avatarPromise = $http.post('/api/v0.1/profile/upload', fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined,"X-Csrf-Token" : window.$_gah2Anoh}
        });

        return avatarPromise;
      };

      return user;
    }]);

}());
