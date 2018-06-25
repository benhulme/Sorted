(function () {
  'use strict';

  angular.module('budgetingTool')
    .factory('budgetModal', [
      '$location',
      '$log',
      '$q',
      '$uibModal',
      'Budget',
      'Category',
      'siteConfig',
      function ($location, $log, $q, $uibModal, Budget, Category, siteConfig) {
        function areYouSureModal () {
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/modals/areYouSure.html',
            controller: 'AreYouSureModalCtrl',
            size: 'md',
            windowClass: 'budget-are-you-sure-modal'
          });

          return modalInstance.result
            .then(function (confirm) {
              return confirm;
            });
        }

        function headerModal (profile) {
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/modals/headerModal.html',
            controller: 'HeaderModalCtrl',
            resolve: {
              profile: function () { return angular.copy(profile); },
            },
            size: 'lg',
            windowClass: 'budget-header-modal'
          });

          modalInstance.result.then(Budget.updateHeaderFields);
        }

        function categoryModal (category, masterCategory) {
          if (!category) {
            category = Category.create();
          }
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/modals/categoryModal.html',
            controller: 'CategoryModalCtrl',
            resolve: {
              categoryModel: function () { return angular.copy(category); },
              masterCategoryModel: function () { return angular.copy(masterCategory); }
            },
            size: 'lg',
            windowClass: 'budget-category-modal'
          });

          modalInstance.result
            .then(function (mc) {
              Budget.updateMasterCategory(mc);
            });
        }

        function locationChangeWarningModal (nextUrl, unbindLocationWarning) {
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/modals/locationChangeWarningModal.html',
            controller: 'LocationChangeWarningModalCtrl',
            size: 'md',
            windowClass: 'budget-location-change-warning-modal'
          });

          modalInstance.result
            .then(function (reallyLeave) {
              if (reallyLeave) {
                unbindLocationWarning();
                Budget.clear();
                $location.path(nextUrl.substring($location.absUrl().length - $location.url().length));
              }
            });
        }

        function logoutWarningModal () {
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/modals/logoutWarningModal.html',
            controller: 'LogoutWarningModalCtrl',
            size: 'md',
            windowClass: 'budget-logout-warning-modal'
          });

          return modalInstance.result
            .then(function (reallyLeave) {
              return reallyLeave ? $q.resolve() : $q.reject();
            });
        }

        function loginReminderModal () {
          $uibModal.open({
            animation: true,
            templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/modals/loginReminderModal.html',
            controller: 'LoginReminderModalCtrl',
            size: 'md',
            windowClass: 'budget-login-reminder-modal'
          });
        }

        function safariModal () {
          $uibModal.open({
            animation: true,
            templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/modals/safariModal.html',
            controller: 'safariModalCtrl',
            size: 'md',
            windowClass: 'budget-logout-warning-modal'
          });
        }

        function masterCategoryModal (masterCategory) {
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/modals/masterCategoryModal.html',
            controller: 'MasterCategoryModalCtrl',
            resolve: {
              masterCategoryModel: function () { return angular.copy(masterCategory); }
            },
            size: 'md',
            windowClass: 'budget-master-category-modal'
          });

          modalInstance.result
            .then(function (mc) {
              Budget.updateMasterCategory(mc);
            });
        }

        function overwriteConfirmModal (existingBudget) {
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/modals/overwriteConfirmModal.html',
            controller: 'OverwriteConfirmModalCtrl',
            resolve: {
              existingBudget: function () { return angular.copy(existingBudget); }
            },
            size: 'lg',
            windowClass: 'budget-overwrite-confirm-modal'
          });

          return modalInstance.result
            .then(function (overwrite) {
              if (overwrite) {
                return Budget.overwrite(existingBudget);
              }
              return Budget.keepCurrent();
            });
        }

        return {
          areYouSureModal: areYouSureModal,
          categoryModal: categoryModal,
          headerModal: headerModal,
          locationChangeWarningModal: locationChangeWarningModal,
          loginReminderModal: loginReminderModal,
          logoutWarningModal: logoutWarningModal,
          masterCategoryModal: masterCategoryModal,
          overwriteConfirmModal: overwriteConfirmModal,
          safariModal: safariModal
        };
      }
    ]);

})();
