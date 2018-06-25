/**
 * Created by stanislavk on 1/09/2016.
 */
/**
 * Created by stanislavk on 19/08/2016.
 */

(function () {
  'use strict';

  angular.module('sorted')
    .controller('ModalInstanceOverdose', ['$scope','$uibModalInstance',  function ($scope, $modalInstance) {

      $scope.ok = function () {
        $modalInstance.close();
      };
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

    }]);

})();
