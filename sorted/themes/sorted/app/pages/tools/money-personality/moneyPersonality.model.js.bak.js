"use strict";angular.module("sorted").factory("moneyPersonalityModel",[function(){function e(e,t){var i=!1;return(e||0===e)&&("string"==typeof e&&(e=e.replace("$","").replace(",","")),i=parseFloat(e).toFixed(t)),!i&&0!==i||isNaN(i)?!1:i}function t(e){var t=!1;return(e||0===e)&&("string"==typeof e&&(e=e.replace("$","").replace(",","")),t=parseInt(e)),!t&&0!==t||isNaN(t)?!1:t}var i=function(e){return JSON.parse(JSON.stringify(e))},s=function(s){this.fields={},this.result={},s.nudge&&(this.nudge=i(s.nudge)),s.graphic&&(this.graphic=i(s.graphic)),s.outputs&&(this.outputs=i(s.outputs)),this.modelName=s.model,this.fields=s.fields,this.prepare=function(){var i={},s=!0;for(var r in this.fields)if(this.fields.hasOwnProperty(r)){var a=this.fields[r].value;if(this.fields[r].format)switch(this.fields[r].format.type){case"INTEGER":a=t(this.fields[r].value);break;case"FLOAT":a=e(this.fields[r].value,this.fields[r].format.decimals)}a||0===a||this.fields[r].required!==!0||(s=!1),i[this.fields[r].calcModel]=a}return s?i:!1}},r={getInstance:function(e){return new s(e)}};return r}]);