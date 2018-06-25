(function() {
    'use strict';
    angular.module('sorted')
    .directive('editorPicks',  ['siteConfig', function(siteConfig) {

        return {
            templateUrl: siteConfig.APP_PATH + 'app/components/editor-picks/editor-picks.html',
            restrict: 'E',
            scope: {
              data: '=',
              title: '@'
            },
            controller: ['$scope', 'silverStripeService',
            function() {

            }
            ],
        };

    }]);

}());
