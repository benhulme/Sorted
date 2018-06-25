!function(){"use strict";angular.module("sorted").directive("conveyor",["$window",function(e){return{restrict:"A",scope:{},link:function(t,o){t.animating=!1,t.startX=0,t.startLeft=0;o.addClass("conveyor-outer");var n=o.find("[conveyor-mask]");n.addClass("conveyor-mask"),t.conveyorBelt=o.find("[conveyor-belt]"),t.conveyorBelt.addClass("conveyor-belt");var i=angular.element("<button>");i.addClass("conveyor-left disabled"),o.prepend(i);var r=angular.element("<button>");r.addClass("conveyor-right"),o.append(r),t.unlockAnimation=function(){t.animating=!1},t.leftClick=function(){var e=o.find("[conveyor-items]").width();if(r.removeClass("disabled"),t.conveyorBelt.prop("offsetLeft")>=-e){return t.animating=!0,TweenMax.to(t.conveyorBelt,1,{left:"0px",onComplete:t.unlockAnimation}),i.addClass("disabled"),0}return t.animating=!0,TweenMax.to(t.conveyorBelt,1,{left:"+="+e+"px",onComplete:t.unlockAnimation}),e},t.rightClick=function(){var e=o.find("[conveyor-items]").width(),a=o.find("[conveyor-items]").length,l=e*a,s=l-n.width();return i.removeClass("disabled"),t.conveyorBelt.prop("offsetLeft")<=-(s-e)?(t.animating=!0,TweenMax.to(t.conveyorBelt,1,{left:"-"+s+"px",onComplete:t.unlockAnimation}),r.addClass("disabled"),s):(t.animating=!0,TweenMax.to(t.conveyorBelt,1,{left:"-="+e+"px",onComplete:t.unlockAnimation}),e)},t.windowResize=function(){var e=o.find("[conveyor-items]").width(),i=o.find("[conveyor-items]").length,a=e*i,l=a-n.width();return t.conveyorBelt.prop("offsetLeft")<=-l&&t.conveyorBelt.css({left:"-"+l+"px"}),t.conveyorBelt.prop("offsetLeft")>-l&&r.removeClass("disabled"),l},t.touchStart=function(e){return t.startX=e.originalEvent.touches[0].clientX,t.startLeft=o.find(".conveyor-belt").prop("offsetLeft"),t.startX},t.touchMove=function(e){var a=e.originalEvent.touches[0].clientX,l=a-t.startX,s=t.startLeft+l,c=o.find("[conveyor-items]").width(),d=o.find("[conveyor-items]").length,f=c*d,v=f-n.width();return s<=0&&s>=-v&&o.find(".conveyor-belt").css({left:s+"px"}),s>=0?i.addClass("disabled"):i.removeClass("disabled"),s<=-v?r.addClass("disabled"):r.removeClass("disabled"),s},o.on("touchstart",t.touchStart),o.on("touchmove",t.touchMove),o.on("click",".conveyor-left",t.leftClick),o.on("click",".conveyor-right",t.rightClick),angular.element(e).on("resize",t.windowResize)}}}])}();