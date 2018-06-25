/**
 * Created by stanislavk on 17/08/2016.
 */
(function () {
  'use strict';
  angular.module('sorted')
    .filter('withTitle', function(){
      return function (arr){
        var checkTitle = function(item){
          if (item.Title){
            return item;
          }
        };
        return arr.filter(checkTitle);
      };
    });
}
)();
