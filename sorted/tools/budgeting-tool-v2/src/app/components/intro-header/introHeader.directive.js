(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .directive('introHeader', introHeader);

  /** @ngInject */
  function introHeader(siteConfig) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/intro-header/introHeader.html',
      scope: {
        data:'=',
        breadcrumbs: '='
      },
      controller: IntroheaderController,
      controllerAs: 'vm'
    };

    return directive;

    /** @ngInject */
    function IntroheaderController(moment) {
      var vm = this;

      vm.TOOL_ASSETS = siteConfig.TOOL_ASSETS;
    }
  }

})();
