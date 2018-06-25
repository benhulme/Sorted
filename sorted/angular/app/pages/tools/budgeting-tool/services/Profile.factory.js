(function () {
  'use strict';

  angular.module('budgetingTool')
    .factory('Profile', [
      '$log',
      '$q',
      '$window',
      'Budget',
      'budgetModal',
      'budgetingToolConfig',
      'profileApi',
      '$rootScope',
      function ($log, $q, $window, Budget, budgetModal, budgetingToolConfig, profileApi,$rootScope) {
        var _profile = {};
        var _loginModalTriggered = false;

        function updateFromSession() {
          angular.copy(angular.fromJson($window.sessionStorage.getItem('userData')), _profile);
        }

        function get (checkServer) {
          if (!_.isEmpty(_profile) && !checkServer) {
            return _profile;
          }

          return profileApi.get()
            .then(function (profile) {
              _profile = profile;
              return _profile;
            })
            .catch(function () {
              //clear local login
              $window.sessionStorage.clear();
              $rootScope.userLogged = false;
             
              return {};
            });
        }

        function isLoggedIn () {
          updateFromSession();
          return !$rootScope.userLogged ? $q.reject({ loggedIn: false }) : $q.resolve({ loggedIn: true });
        }

        function checkLogin () {
          isLoggedIn()
            .then(function () {
              _loginModalTriggered = false;
            })
            .catch(function () {
              angular.element('#login-modal').modal('show');
              _loginModalTriggered = true;
              return $q.reject({ loginModalTriggered: true });
            });
        }

        function uploadBudgetImage (image) {
          return profileApi.uploadBudgetImage(image);
        }

        return {
          checkLogin: checkLogin,
          get: get,
          isLoggedIn: isLoggedIn,
          loginModalTriggered: function () { return _loginModalTriggered; },
          updateFromSession: updateFromSession,
          uploadBudgetImage: uploadBudgetImage
        };
      }
    ]);

})();
