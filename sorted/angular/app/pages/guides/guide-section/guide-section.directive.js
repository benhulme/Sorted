(function(){
  'use strict';
  angular.module('sorted')
    .directive('guideSection', ['siteConfig', '$sce', '$compile',  function(siteConfig, $sce, $compile) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/guides/guide-section/guide-section.html',
        restrict: 'E',
        scope: {
          data: '='
        },
        link: function($scope){

          $scope.$watch('data', function() {
            if($scope.data && _.has($scope.data, 'Content')){

              var newContent = $compile($sce.trustAsHtml($scope.data.Content).valueOf())($scope)[0];


              angular.element('.sections-content').contents().remove();
              angular.element('.sections-content').append(newContent);
            }
          });

        },
        controller: ['$scope','$location', '$anchorScroll',


          function($scope, $location, $anchorScroll) {

            $scope.siteConfig = siteConfig;

            $scope.scrollTo = function (id) {
              var old = $location.hash();
              $location.hash(id);
              $anchorScroll();
              $location.hash(old);
            };

          },
        ],
      };
    }]);

}());
