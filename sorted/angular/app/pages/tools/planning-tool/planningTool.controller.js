/**
 * Created by stanislavk on 9/08/2016.
 */
(function () {
  'use strict';

  angular.module('sorted')
    .controller('PlanningToolController', ['$scope', '$rootScope', '$q', '$uibModal', 'planningData', 'siteConfig', 'defaultData', 'pageData', 'isLoggedIn', 'usersGoals', 'profileApi', '$window', '$routeParams', function ($scope, $rootScope, $q, $modal, planningData, siteConfig, defaultData, pageData, isLoggedIn, usersGoals, profileApi, $window, $routeParams) {


      var saving = false;
      $scope.target = 'goals';
      $scope.notChanged = true;
      $scope.editGoal = planningData.goalEditable;
      $scope.small = function () {
        return ($window.innerWidth < 768);
      };

      if ($.isEmptyObject(planningData.goals)) {
        planningData.goals = defaultData.data.data[0].Data;
        $scope.default = defaultData.data.data[0].Data;
      }

      $scope.goals = planningData.goals;

      if (isLoggedIn && $routeParams.id) {
        var goals = usersGoals.data.filter(function (obj) {
          return (obj.ID.toString() === $routeParams.id.toString());
        });
        planningData.id = $routeParams.id;
        planningData.goals = goals[0].Data;
        $scope.goals = planningData.goals;
      }


      //=========== OUT OF SCOPE (USER DATA CHECK)=========
      //if(!usersGoals){
      //  planningData.goals = defaultData.data.data[0].Data;
      //  $scope.goals = planningData.goals;
      //}else{
      //  planningData.goals = usersGoals.data[0].Data;
      //  $scope.goals = planningData.goals;
      //}


      $scope.changeFlow = function (data) {
        if ($scope.target === data) {
          $scope.target = 'goals';
        } else {
          $scope.target = data;
        }
      };


      //var save = function(){
      //  planningData.getUserGoals().then(function(response){
      //    resolveSave().then(function(){
      //      planningData.save(response.data[0].Data);
      //      planningData.goals = response.data[0].Data;
      //      $scope.goals = planningData.goals;
      //      saving = false;
      //    },function(){
      //      planningData.save($scope.goals);
      //      saving = false;
      //    });
      //  },function(){
      //    planningData.save($scope.goals);
      //    saving = false;
      //  });
      //};


      var resolveSave = function () {
        var modalInstance = $modal.open({
          templateUrl: siteConfig.APP_PATH + "app/pages/tools/planning-tool/components/save-resolve/saveResolve.html",
          controller: 'ModalInstanceSaveResolve'
        });
        return modalInstance.result;
      };


      var save = function () {
        resolveSave().then(function () {
          if (isLoggedIn && $routeParams.id) {
            planningData.update($scope.goals, $routeParams.id);
          } else {
            planningData.save($scope.goals);
          }
          saving = false;
        });
      };

      $scope.saveGoals = function () {
        saving = true;
        profileApi.isLoggedIn().then(function (data) {
          if (data) {
            save();
          } else {
            $('#login-modal').modal('show');
          }
        });
      };


      $scope.beforeAdd = function () {
        var modalInstance = $modal.open({
          templateUrl: siteConfig.APP_PATH + "app/pages/tools/planning-tool/components/add-modal/addModal.html",
          controller: 'ModalInstanceAdd'
        });
        return modalInstance.result;
      };


      $scope.beforeEdit = function () {
        var modalInstance = $modal.open({
          templateUrl: siteConfig.APP_PATH + "app/pages/tools/planning-tool/components/edit-modal/editModal.html",
          controller: 'ModalInstanceEdit'
        });
        return modalInstance.result;
      };

      $scope.beforeDelete = function () {
        var modalInstance = $modal.open({
          templateUrl: siteConfig.APP_PATH + "app/pages/tools/planning-tool/components/delete-modal/deleteModal.html",
          controller: 'ModalInstanceDelete'
        });
        return modalInstance.result;
      };


      angular.element($window).bind('resize', function () {
        $scope.target = 'goals';

        // manuall $digest required as resize event
        // is outside of angular
        $scope.$digest();
      });


      $rootScope.$watch('userLogged', function () {
        if ($rootScope.userLogged && saving) {
          save();
        } else {
          saving = false;
        }
      });

      $scope.$watch('goals', function (newVal,oldVal) {
        if(angular.equals(newVal,oldVal)){
          return;
        }
        $scope.notChanged = false;
      }, true);


    }]);

}());
