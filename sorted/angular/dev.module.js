var $_gah2Anoh = ''; // CSRF token, will be set in VM but not localhost

(function () {
  'use strict';

  angular.module('dev', ['sorted', 'ngMockE2E', 'ngResource'])
    .run(function ($httpBackend, $log, $resource) {

      var calculators = $resource('/json/calculator-query-calcid.json').query();
      var budgetingTool = $resource('/json/budgeting-tool-page.json').query();
      var profile = $resource('/json/profile-get.json').get();
      var budgetImages = $resource('/json/profile-post-custom.json').get();

      $httpBackend
        .whenGET('/api/v0.1/calculator/query?calcid=2')
        //.respond(calculators);
        .respond(function () {
          return [404];
        });

      $httpBackend
        .whenPOST('/api/v0.1/profile/custom')
        .respond(budgetImages);

      $httpBackend
        .whenGET('/api/v0.1/profile/get')
        //.respond(profile);
        .respond(function () {
          return [404];
        });

      $httpBackend
        .whenGET('/api/v0.1/page/get/budgeting-tool')
        .respond(budgetingTool);

      $httpBackend
        .whenPUT('/api/v0.1/calculator/update/24')
        .respond(function (method, url, data) {
          var before = _.find(calculators, { ID: 24 });
          _.find(calculators, { ID: 24 }).Data = JSON.parse(data).Data;
          $log.info('BEFORE', JSON.parse(before.Data), 'AFTER', JSON.parse(_.find(calculators, { ID: 24 }).Data));
          return [200, { status: 'success' }, {}];
        });

      $httpBackend
        .whenPOST('/api/v0.1/calculator/save')
        .respond(function (method, url, data) {
          calculators.push(data);
          $log.info('POST', JSON.parse(data));
          return [200, { status: 'success' }, {}];
        });

      $httpBackend
        .whenDELETE('/api/v0.1/calculator/delete/24')
        .respond(function (method, url, data) {
          calculators = _.reject(calculators, { ID: 24 });
          return [200, { status: 'success' }, {}];
        });

      $httpBackend
        .whenGET()
        .passThrough();
    });

})();
