(function() {
  'use strict';
  angular.module('sorted')
    .directive('relatedContent',  ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/related-content/related-content.html',
        restrict: 'E',
        scope: {
          data: '=',
          title: '@'
        },
        controller: ['$scope',
          function($scope) {
            $scope.Title = $scope.title || 'Related';
            $scope.siteConfig = siteConfig;
              
            $scope.showLink = function(post){
              switch(post.ClassName){
                  case "SortedBlogPost":
                  case "CampaignPage":
                  case "ToolPage":
                      return false;                      
                  default:
                    return true;     
              }
            };

          },  
        ],
      };
    }]);

}());
