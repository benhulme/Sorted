"use strict";$(document).ready(function(){var t=function(){var t=$(this).width(),r=$(this).attr("aspect-ratio").split(":");if(2!==r.length)return!1;var i=parseInt(r[0]),a=parseInt(r[1]);if(isNaN(i)||isNaN(a))return!1;if(i<=0||a<=0)return!1;var e=t/i*a;return $(this).css({height:e+"px"}),e},r=$("[aspect-ratio]");r.each(t),$(window).on("resize",function(){r=$("[aspect-ratio]"),r.each(t)})});