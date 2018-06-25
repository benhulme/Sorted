/**
 * Created by stanislavk on 3/03/2016.
 */
/**
 * Created by stanislavk on 26/02/2016.
 */
(function(){
  'use strict';
  angular.module('sorted')
    .directive('usersAvatar', ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/dashboard/usersAvatar/usersAvatar.html',
        restrict: 'E',

        controller: ['userStorage','$scope', function(userStorage,$scope){
          $scope.user = userStorage.data;
        }]
      };
    }])

  .directive('avatarFileModel',  ['$parse', 'userStorage', function ($parse,userStorage) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.avatarFileModel);
        var modelSetter = model.assign;
        var uploadFile = function () {
          var file = scope.myFile;
          userStorage.updateUsersAvatar(file).then(function(){
              userStorage.getProfile();
          });
        };

        element.bind('change', function(){
          scope.$apply(function(){
            modelSetter(scope, element[0].files[0]);
          });
          uploadFile();
        });

        scope.$watch(function(){
          return sessionStorage.getItem('userData');
        }, function(val){
          scope.user.Image = JSON.parse(val).Image;
        });

      }
    };
  }]);


}());

