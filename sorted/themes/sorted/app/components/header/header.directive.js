!function(){"use strict";angular.module("sorted").directive("header",["siteConfig",function(e){return{templateUrl:e.APP_PATH+"app/components/header/header.html",restrict:"EA",scope:{headerEndpoint:"@header"},controller:["$scope","silverStripeService","$rootScope",function(t,r,o){function n(e){200===e.status?(t.data=e.data[0],o.$emit("newPageLoaded",{title:t.data.Title,description:t.data.MetaDescription})):console.error("unexpected response status",e)}function a(e){console.error("failure",e)}"headerHome"===t.headerEndpoint?t.headerType="HOME":t.headerType="STANDARD",r.get(t.headerEndpoint).then(n,a),t.siteConfig=e}]}}])}();