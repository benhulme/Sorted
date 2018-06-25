(function(){
  'use strict';
  angular.module('sorted')
    .directive('glossaryList', ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/glossary/glossaryList/glossaryList.html',
        restrict: 'EA',
        scope: {
          data: '=',
          search: '=',
        },
        link: function() {
        }        
      };
    }]);

}());
