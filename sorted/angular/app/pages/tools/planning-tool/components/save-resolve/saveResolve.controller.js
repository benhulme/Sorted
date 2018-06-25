/**
 * Created by stanislavk on 25/08/2016.
 */



(function () {
  'use strict';

  angular.module('sorted')
    .controller('ModalInstanceSaveResolve', ['$scope','$uibModalInstance', 'planningData',  function ($scope, $modalInstance,planningData) {

      $scope.title = '';


      $scope.ok = function () {
        planningData.setTitle($scope.title);
        $modalInstance.close();
      };
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

    }]);

})();
