(function() {

  'use strict';

  describe('Service: formForward', function () {

    var formForwardService;
    var scope;
    var apiEndpoints;
    var $location;

    beforeEach(module('templates'));
    beforeEach(module('sorted'));

    beforeEach(inject(function (_$location_, $rootScope, _apiEndpoints_, _formForwardService_) {

      $location = _$location_;
      apiEndpoints = _apiEndpoints_;
      formForwardService = _formForwardService_;
      scope = $rootScope.$new();

    }));

    describe('Initialization', function () {

      it('should post the data to the specified url', function() {

        formForwardService.forward('test', {data: 'test'});

      });

    });
  });
}());
