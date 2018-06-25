(function() {
  'use strict';
  angular.module('sorted')
    .directive('coverImage', function() {
      return {
        restrict: 'A',
        scope: {},
        link: function(scope, elm, attrs) {

          scope.setCoverImage = function() {
            if (attrs.coverImage) {
              elm.css({backgroundImage: 'url(' + attrs.coverImage + ')'});
              return attrs.coverImage;
            } else {
              return false;
            }
          };

          elm.addClass('cover-image');
          scope.setCoverImage();
        },
      };
    });
}());
