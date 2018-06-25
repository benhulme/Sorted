(function(){
  'use strict';
  angular.module('sorted')
    .directive('categoryFilter', ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/components/category-filter/categoryFilter.html',
        restrict: 'E',
        scope: {
          data: '=',
          search: '=',
          prefix: '=',
          type: '='
        },
        link: function(scope, element) {

          scope.updateFilter = function(event) {            
            scope.search = angular.element(event.target).attr('category') || '';
            scope.$apply();
          };
          
          element.bind("click", '.category-filter-link', function(event){
            if (angular.element(event.target)[0].nodeName === 'BUTTON') {
              return;
            }
            scope.updateFilter(event);
          });
        }
      };
    }]);

}());
