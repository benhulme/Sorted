/**
 * Created by stanislavk on 19/08/2016.
 */

(function () {
  'use strict';

  angular.module('sorted')
    .controller('ModalInstanceAdd', ['$scope','$uibModalInstance', 'planningData',  function ($scope, $modalInstance, planningData) {
      $scope.random = function () {
        return Math.round(Math.random() * (7 - 1) + 1);
      };

      $scope.newGoal = {};


      $scope.ok = function () {
        var goal = {
          "Title": $scope.newGoal.name,
          "Type": "",
          "Price": $scope.newGoal.amount,
          "Draggable": "true",
          "Color": "color-" + $scope.random()
        };
        planningData.goals.allGoals.GoalList.push(goal);
        $modalInstance.close();


      };
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

    }]);

})();
