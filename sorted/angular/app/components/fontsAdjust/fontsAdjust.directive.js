/**
 * Created by stanislavk on 28/01/2016.
 */
(function(){
  'use strict';
  angular.module('sorted')
    .directive('fontsAdjust', ['siteConfig', 'fontStorage', function(siteConfig, fontStorage) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/fontsAdjust/fontsAdjust.html',
        restrict: 'E',
        link: function(scope) {
          scope.decrease = function(){
            if(fontStorage.getFont().fontSize > 18) {
              fontStorage.decFontSize();
            }
          };
          scope.increase = function(){
            if(fontStorage.getFont().fontSize < 25) {
              fontStorage.incFontSize();
            }
          };
        }
      };
    }])
    .directive('adjustableFont',['fontStorage', function(fontStorage){
      return{
        restrict: 'A',
        link: function(scope,element){
          var size = parseInt(element.css("font-size"),10);
          var height = parseInt(element.css("line-height"),10);
          fontStorage.setFont(size,height);
          element.addClass('adjustable-font');

          var setFont = function(){
            element.css("font-size", fontStorage.getFont().fontSize + "px");
            element.css("line-height", fontStorage.getFont().lineHeight + "px");
          };
          scope.$watch(function(){return fontStorage.getFont().fontSize;}, setFont);
        }
      };
    }]);

}());
