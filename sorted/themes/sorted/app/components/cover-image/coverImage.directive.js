!function(){"use strict";angular.module("sorted").directive("coverImage",function(){return{restrict:"A",scope:{},link:function(e,r,c){e.setCoverImage=function(){return!!c.coverImage&&(r.css({backgroundImage:"url("+c.coverImage+")"}),c.coverImage)},r.addClass("cover-image"),e.setCoverImage()}}})}();