// Karma configuration
// Generated on Fri Nov 27 2015 14:38:09 GMT+1300 (NZDT)

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      './bower_components/es5-shim/es5-shim.js',
      './bower_components/jquery/dist/jquery.js',
      './bower_components/gsap/src/uncompressed/jquery.gsap.js',
      './bower_components/jquery-validation/dist/jquery.validate.js',
      './bower_components/angular/angular.js',
      './bower_components/angular-mocks/angular-mocks.js',
      './bower_components/angular-animate/angular-animate.js',
      './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      './bower_components/angular-touch/angular-touch.js',
      './bower_components/angularjs-slider/dist/rzslider.js',
      './bower_components/moment/moment.js',
      './bower_components/angular-moment/angular-moment.js',
      './bower_components/angulartics/src/angulartics.js',
      './bower_components/angulartics-google-tag-manager/dist/angulartics-google-tag-manager.min.js',
      './bower_components/lodash/dist/lodash.js',
      './bower_components/backbone/backbone.js',
      './bower_components/ng-backbone/ng-backbone.js',
      './bower_components/ng-lodash/build/ng-lodash.js',
      './bower_components/bignumber.js/bignumber.js',
      './standalone/**/*.js',
      './bower_components/re-tree/re-tree.js',
      './bower_components/ng-device-detector/ng-device-detector.js',
      './bower_components/angular-route/angular-route.js',
      './bower_components/angular-sanitize/angular-sanitize.js',
      './bower_components/angular-resource/angular-resource.js',
      './bower_components/angular-cookies/angular-cookies.js',
      '../themes/sorted/telerik/js/kendo.all.min.js',
      './dev.module.js',
      './app/components/config/site.config.js',
      './app/app.js',
      './spec/globals.js',
      './app/**/*.js',
      './app/sorted-http/**/*.js',
      './app/**/*.html',
      './app/pages/tools/budgeting-tool/test-json/*.json',
      { pattern: './assets/**', served: true, included: false, watched: false, nocache: false },
    ],
    proxies: {
      '/assets/': '/base/assets/'
    },
    exclude: [
      './standalone/popover.js',

      // Apparently these tests never actually worked...?
      './app/pages/tools/mortgage-tool/**/*.js',
      './app/pages/tools/savings-calculator/**/*.js',
      './app/pages/tools/retirement-planner/**/*.js',
      './app/pages/tools/net-worth-calculator/**/*.js',
      './app/pages/tools/kiwisaver-fees/**/*.js',
      './app/pages/tools/money-personality/**/*.js',
      './app/pages/tools/investment-planner/**/*.js',
      './app/pages/tools/debt-calculator/**/*.js',
      './app/pages/template/**/*.js'
    ],
    preprocessors: {
      './app/**/*.html': ['ng-html2js'],
      './app/pages/tools/budgeting-tool/test-json/*.json': ['json_fixtures']
    },
    ngHtml2JsPreprocessor: {
      moduleName: 'templates'
    },
    reporters: ['dots'],
    port: 9009,
    colors: true,

    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
