!function(){"use strict";angular.module("sorted").factory("bookletsViewModel",["silverStripeService",function(e){function t(e){var t=e.data;return _.merge({},{Categories:t.Categories,Booklets:_.filter(t.Collateral,{Category:"1"}),Seminars:_.filter(t.Collateral,{Category:"2"}),Posters:_.filter(t.Collateral,{Category:"3"})})}function r(e){return console.log("Failed to load collateral",e),null}function l(){return e.get("sortedCollateral").then(t,r)}return{build:l}}])}();