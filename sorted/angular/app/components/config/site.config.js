(function() {

    'use strict';

    var configModule = angular.module('sorted.config', []);

    var configData = {
        siteConfig: {
            APP_NAME: 'Sorted',
            APP_VERSION: '0.1',
            APP_PATH: '',
            DATE_FORMAT: 'DD/MM/YYYY',
            API_PREFIX: '/api/v0.1',
            GTM_PAGEVIEW_VARIABLE: 'vPageUrl',
            GTM_CUSTOM_EVENT_NAME: 'VirtualPageView'
        },
    };

    angular.forEach(configData, function(key, value) {
        configModule.constant(value, key);
    });

}());
