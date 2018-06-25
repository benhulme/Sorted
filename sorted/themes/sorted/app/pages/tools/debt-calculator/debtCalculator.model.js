"use strict";angular.module("sorted").factory("debtCalculatorModel",[function(){function e(e,r){var a=!1;return e&&("string"==typeof e&&(e=e.replace("$","").replace(",","")),a=parseFloat(e).toFixed(r)),!(!a||isNaN(a))&&a}function r(e){var r=!1;return e&&("string"==typeof e&&(e=e.replace("$","").replace(",","")),r=parseInt(e)),!(!r||isNaN(r))&&r}var a=function(e){return JSON.parse(JSON.stringify(e))},t=function(t){this.fields={},this.result={},this.nudge=t.nudge,this.graphic=t.graphic,this.modelName=t.model;for(var i in t.fields)t.fields.hasOwnProperty(i)&&(this.fields[i]={calcModel:a(t.fields[i].calcModel),format:a(t.fields[i].format),required:a(t.fields[i].required),value:a(t.fields[i].value)});this.prepare=function(a){var t={},i=!0;for(var n in a)if(a.hasOwnProperty(n)){var s=a[n].value;if(a[n].format)switch(a[n].format.type){case"INTEGER":s=r(a[n].value);break;case"FLOAT":s=e(a[n].value,a[n].format.decimals)}s||0===s||a[n].required!==!0||(i=!1),t[a[n].calcModel]=s}return{ready:i,data:t}}};return{getInstance:function(e){return new t(e)}}}]);