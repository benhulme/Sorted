/**
 * Created by stanislavk on 18/08/2016.
 */
(function () {
  'use strict';

  angular.module('sorted')
    .controller('ModalInstanceEdit', ['$scope','$uibModalInstance', 'planningData', function ($scope, $modalInstance, planningData) {


      $scope.name = planningData.tempItem.Title;
      if(isNaN(planningData.tempItem.Price)){
        $scope.price = '';
      }else{
        $scope.price = planningData.tempItem.Price;
      }


      $scope.ok = function () {
        planningData.tempItem.Title = $scope.name;
        planningData.tempItem.Price = $scope.price;
        planningData.goals[planningData.tempCategory].GoalList.push(planningData.tempItem);
        planningData.goalEditable = [];
        $modalInstance.close();

      };
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

    }]);

})();
