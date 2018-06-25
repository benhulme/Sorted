(function(){
    'use strict';

    angular.module('sorted')
    .directive('notSureBox', ['siteConfig',
        function(siteConfig) {
            return {
                templateUrl: siteConfig.APP_PATH + 'app/components/not-sure-box/not-sure-box.html',
                restrict: 'E',
                scope: {},
                controller: ['$scope',
                    function($scope) {
                        $scope.siteConfig = siteConfig;
                    },
                ],
                link: function() {}
            };
        }]);

}());
