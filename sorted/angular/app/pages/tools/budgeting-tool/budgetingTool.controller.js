/* global kendo */
/* global logoutProfile */
/* global globalState */
/* global BigNumber */
(function () {
  'use strict';

  angular.module('budgetingTool')
    .controller('BudgetingToolCtrl', [
      '$document',
      '$log',
      '$scope',
      '$timeout',
      '$window',
      'Alert',
      'Budget',
      'budgetingToolConfig',
      'budgetEvents',
      'budgetModal',
      'budgetHandler',
      'budgetView',
      'Category',
      'chartValues',
      'periodAmount',
      'Profile',
      'siteConfig',
      'totalValues',
      'deviceDetector',      
      function ($document, $log, $scope, $timeout, $window, Alert, Budget,
                budgetingToolConfig, budgetEvents, budgetModal, budgetHandler, budgetView,
                Category, chartValues, periodAmount, Profile, siteConfig, totalValues, deviceDetector) {

        $scope.siteConfig = siteConfig;
        $scope.breakdownChartSource = new kendo.data.DataSource({
          data: chartValues.update()
        });

        // NOTE: I struggle with this approach somewhat, but I just can't think of a strong
        // enough reason not to expose service functions on scope apart from "it feels weird".
        // See also http://www.bennadel.com/blog/2744-exposing-a-service-directly-on-the-scope-in-angularjs.htm
        $scope.budget = Budget.budget;

        $scope.alert = Alert.alert;
        $scope.closeAlert = Alert.close;
        $scope.getBudgetTemplate = budgetView.getTemplate;
        $scope.dirty = Budget.isDirty;
        $scope.getIconPath = Category.getIconPath;
        $scope.getRemainingDisplay = totalValues.getRemainingDisplay;
        $scope.inlineEditCategory = {};
        $scope.inlineEditValue = new BigNumber(0);
        $scope.openHeaderModal = budgetModal.headerModal;
        $scope.openCategoryModal = budgetModal.categoryModal;
        $scope.openMasterCategoryModal = budgetModal.masterCategoryModal;
        $scope.profile = Profile.get();

        $scope.save = function () {
          Budget.startSaveAttempt();
          Profile.get(true)
            .then(Profile.checkLogin)
            .then(budgetHandler.save);
        };

        // var updateObj = totalValues.updateTotals();
        // console.log(updateObj);

        // To avoid triggering the watch multiple times, it is disabled while
        // various parts of the budget object are updated.
        function addBudgetWatch() {
          var unwatch = $scope.$watch('budget', function (newVal, oldVal) {
            if (!angular.equals(newVal, oldVal)) {
              unwatch();

              // updateObj = angular.copy(updateObj);

              // updateObj = totalValues.updateTotals();
              // // console.log(updateObj);
              // console.log(updateObj);
              // $scope.budget.MasterCategories = updateObj;

              angular.copy(
                totalValues.updateTotals(),
                $scope.budget.MasterCategories
              );
              $scope.breakdownChartSource.data(
                chartValues.update()
              );
              addBudgetWatch();
            }
          }, true);
        }

        addBudgetWatch();


        if (deviceDetector.browser === 'safari'){
          budgetModal.safariModal();
        }


        // Scope events that can't easily be moved to a service:
        var unbindLocationWarning = $scope.$on('$locationChangeStart', function (e, nextUrl) {
          budgetEvents.changeLocationWarning(e, nextUrl, unbindLocationWarning);
        });
        $timeout(function () {
          angular.element('.logout-button').on('click', function (e) {
            e.preventDefault();
            if (Budget.isDirty()) {
              budgetModal.logoutWarningModal().then(function () {
                $scope.$destroy();
                globalState.dirty = false;
                logoutProfile();
              });
            } else {
              $scope.$destroy();
            }
          });
        }, 0);
        $scope.$on('$destroy', function () {
          budgetEvents.onDestroy(unbindLocationWarning);
        });
        $scope.$on('closeMobileBreakdown', function () {
          $scope.breakdownMobileExpanded = false;
        });
      }
    ]);

})();
