!function(){"use strict";angular.module("sorted").service("saveCalcService",["$http","apiEndpoints",function(a,e){return{save:function(n){var t={method:"POST",url:e.calcSave,data:n,headers:{"Content-Type":"application/json"}};return a(t)},update:function(n){var t={method:"PUT",url:e.calcSave,data:n,headers:{"Content-Type":"application/json"}};return a(t)},prepare:function(a){var e={};return angular.forEach(a,function(a,n){var t={};angular.forEach(a.fields,function(a,e){t[e]=a.value}),t.result=a.result,e[n]=t}),e}}}])}();