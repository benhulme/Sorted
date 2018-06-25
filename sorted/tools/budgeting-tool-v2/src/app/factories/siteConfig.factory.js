(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .factory('siteConfig', siteConfig);

  /** @ngInject */
  function siteConfig($log, $http, $location) {

    var factory = {
      APP_NAME: 'Sorted',
      APP_VERSION: '0.1',
      APP_PATH: '',
      DATE_FORMAT: 'DD/MM/YYYY',
      API_PREFIX: '/api/v0.1',
      GTM_PAGEVIEW_VARIABLE: 'vPageUrl',
      GTM_CUSTOM_EVENT_NAME: 'VirtualPageView',

      TOOL_ASSETS : 'themes/sorted/standalone/tools/budget-calculator/'
    }

    return factory;
  }
})();
