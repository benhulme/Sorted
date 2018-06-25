/**
 * Created by stanislavk on 10/08/2016.
 */
(function() {
  'use strict';

  angular.module('sorted')
    .directive('goalDraggable', ['siteConfig', function(siteConfig) {

      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/planning-tool/components/goal-draggable/goalDraggable.html',
        restrict: 'E',
        scope: {
          data: '='
        },
        controller: ['$scope', 'planningData', function($scope,planningData) {

          $scope.siteConfig = siteConfig;
          $scope.test = function(e,ui,data,item){
            //console.log('stop', e, ui);
            //console.log($(ui.helper[0]));
            //$(ui.helper[0]).addClass('over');
            planningData.tempCategory = data.Category;
            planningData.tempItem = item;
          };
        }
        ]
      };

    }]);

}());
