(function(){
  'use strict';
  angular.module('sorted')
    .directive('glossaryFilter', ['siteConfig', function(siteConfig) {
      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/glossary/glossaryFilter/glossaryFilter.html',
        restrict: 'E',
        scope: {
          data: '=',
          search: '='
        },
        link: function(scope , element) {
          scope.alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

          scope.updateFilter = function(event) {
            scope.search.category = angular.element(event.target).attr('category');
            scope.$apply();
          };

          scope.disable = function(letter){

            if (scope.data) {

              var res =  scope.data.Terms.filter(
                function(data){
                  return data.category === letter.toLowerCase();
                }
              );
              return !res.length;

            }

          };


          element.bind("click", '.categoryLink', function(e){
            scope.updateFilter(e);
          });
        }
      };
    }]);

}());
