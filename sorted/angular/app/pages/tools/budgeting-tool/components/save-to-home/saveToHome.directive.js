(function () {
  'use strict';

  angular.module('budgetingTool')
    .directive('saveToHome', [
      '$document',
      '$window',
      'deviceDetector',
      'siteConfig',
      function ($document, $window, deviceDetector, siteConfig) {
        return {
          templateUrl: siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/components/save-to-home/saveToHome.html',
          restrict: 'E',
          controller: ['$scope', function ($scope) {
            $scope.saveToHomePopover = siteConfig.APP_PATH + 'app/pages/tools/budgeting-tool/components/save-to-home/saveToHomePopover.html';
            $scope.saveToHomePopoverOpen = false;
          }],
          link: function (scope) {
            scope.isMobile = function () {
              switch (deviceDetector.device) {
                case 'iphone':
                case 'ipad':
                case 'android':
                case 'windows-phone':
                  return true;
                default:
                  return false;
              }
            };

            scope.isIOS = function () {
              return deviceDetector.device === 'iphone' || deviceDetector.device === 'ipad';
            };

            scope.isAndroid = function () {
              return deviceDetector.device === 'android';
            };

            scope.isWindowsPhone = function () {
              return deviceDetector.device === 'windows-phone';
            };

            scope.isSafari = function () {
              return deviceDetector.browser === 'safari';
            };

            scope.isUnknown = function () {
              return (!scope.isIOS() && !scope.isSafari()) && !scope.isAndroid() && !scope.isWindowsPhone();
            };

            scope.closeSaveToHome = function () {
              scope.saveToHomePopoverOpen = false;
            };
          }
        };
      }
    ]);

})();
