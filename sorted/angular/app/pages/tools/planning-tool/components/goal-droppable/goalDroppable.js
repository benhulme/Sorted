/**
 * Created by stanislavk on 10/08/2016.
 */
(function() {
  'use strict';

  angular.module('sorted')
    .directive('goalDroppable',  ['siteConfig', '$uibModal', function(siteConfig) {

      return {
        templateUrl: siteConfig.APP_PATH + 'app/pages/tools/planning-tool/components/goal-droppable/goalDroppable.html',
        restrict: 'E',
        scope: {
          data: '='
        },
        controller: ['$scope', function($scope) {

          $scope.siteConfig = siteConfig;

          $scope.over = function(){
            //e.target.classList.add('over');
          };
          $scope.overdose = function(){
            //if($scope.data.GoalList.length>6){
            //
            //}
            //var modalInstance = $modal.open({
            //  templateUrl: siteConfig.APP_PATH + "app/pages/tools/planning-tool/components/overdose-modal/overdoseModal.html",
            //  controller: 'ModalInstanceOverdose'
            //});
            //modalInstance.result.then(function(data){
            //  console.log('success',data);
            //},function(data){
            //  console.log('error',data);
            //});
            //
            //return modalInstance.result;
          };


        }

        ]

      };

    }]);

}());
