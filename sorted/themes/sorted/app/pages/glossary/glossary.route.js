!function(){"use strict";angular.module("sorted").config(["$routeProvider","siteConfig",function(o,r){o.when("/glossary",{templateUrl:r.APP_PATH+"app/pages/glossary/glossary.html",controller:"GlossaryController"}).when("/glossary/?category",{templateUrl:r.APP_PATH+"app/pages/glossary/glossary.html",controller:"GlossaryController"})}])}();