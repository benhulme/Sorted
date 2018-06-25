/**
 * Created by stanislavk on 28/01/2016.
 */

(function(){
  'use strict';
  angular.module('sorted')
    .service('fontStorage', function(){
      var foot = 3;
      var fontSize = 0;
      var lineHeight = 0;


      return{
        incFontSize: function(){
          fontSize  += foot;
          lineHeight += foot;
        },
        decFontSize: function(){
          fontSize  -= foot;
          lineHeight -= foot;
        },
        getFont: function(){
          return {
            "fontSize" : fontSize,
            "lineHeight" : lineHeight
          };
        },
        setFont : function(size,height){
          fontSize = size;
          lineHeight = height;
        }
      };

    });


}());
