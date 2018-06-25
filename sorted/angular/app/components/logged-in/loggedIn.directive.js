(function () {
  'use strict';

  angular.module('sorted')
    .directive('loggedIn', ['siteConfig', function () {
      return {
        restrict: 'A',
        link: function(scope){
          window.checkLogin();

          scope.$watch(function(){
            return sessionStorage.getItem('userData');
          }, function(){
            if(sessionStorage.getItem('userData')){
              window.fillLogged();
            }
          });
        }
      };
    }]);

})();
