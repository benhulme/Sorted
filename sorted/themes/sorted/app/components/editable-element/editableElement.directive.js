!function(){"use strict";angular.module("sorted").directive("editableElement",function(e){return{restrict:"A",require:"ngModel",link:function(t,n,i,r){function u(e,t){var n=parseInt(t),i=n>3?"...":"";return n<e.length?e.substr(0,n-i.length)+i:e}var l=n,a=angular.element('<input type="text" class="budget-title-edit form-control">');r.$render=function(){a.val(r.$viewValue)},l.bind("click",function(){n.replaceWith(e(a)(t)),a[0].focus()}),a.bind("blur keyup",function(n){var c=a.val(),o=_.some([13,27],function(e){return e===n.which});("keyup"!==n.type||o)&&(i.editableMaxLength&&(c=u(c,i.editableMaxLength)),r.$setViewValue(c),a.replaceWith(e(l)(t)))})}}})}();