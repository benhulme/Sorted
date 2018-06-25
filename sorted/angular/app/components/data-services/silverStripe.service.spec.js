(function() {

  'use strict';

  describe('Service: silverStripe', function(){

    var $httpBackend;
    var apiEndpoints;
    var scope;
    var silverStripeService;

    beforeEach(module('templates'));
    beforeEach(module('sorted'));

    beforeEach(inject(function(_$httpBackend_, $rootScope, _silverStripeService_, _apiEndpoints_) {

      $httpBackend = _$httpBackend_;
      apiEndpoints = _apiEndpoints_;
      silverStripeService = _silverStripeService_;

      scope = $rootScope.$new();

    }));

    it('intercept popularTools', function() {

      $httpBackend.when('GET', apiEndpoints.popularTools).respond();
      silverStripeService.get('popularTools');
      $httpBackend.flush();

    });

    it('intercept questionSelector', function() {

      $httpBackend.when('GET', apiEndpoints.questionSelector).respond();
      silverStripeService.get('questionSelector');
      $httpBackend.flush();

    });

    it('intercept campaigns', function() {

      $httpBackend.when('GET', apiEndpoints.campaigns).respond();
      silverStripeService.get('campaigns');
      $httpBackend.flush();

    });

    it('intercept mustReads', function() {

      $httpBackend.when('GET', apiEndpoints.mustReads).respond();
      silverStripeService.get('mustReads');
      $httpBackend.flush();

    });

    describe('Service Functions', function() {

      it('should return a datetime', function() {

        var testData = [
          {
            Title: 'Test page title 1',
            Created: '2015-12-09 00:34:13',
            LastEdited: '2015-12-09 00:34:13',
          },
        ];

        var formattedDates = silverStripeService.formatDates(testData, false);

        expect(typeof formattedDates[0].Created).toBe('object');

      });

      it('should return an array', function() {

        var testData = [
          {
            Title: 'Test page title 1',
            Created: '2015-12-09 00:34:13',
            LastEdited: '2015-12-09 00:34:13',
          },
        ];

        var formattedDates = silverStripeService.formatDates(testData, true);

        expect(typeof formattedDates[0].Created.time).toBeDefined();
        expect(typeof formattedDates[0].Created.date).toBeDefined();
        expect(typeof formattedDates[0].Created.month).toBeDefined();
        expect(typeof formattedDates[0].Created.year).toBeDefined();

      });

      it('should not process the dates', function() {

        var badTestData = [
          {
            Title: 'Test page title 2',
          },
        ];

        var formattedDates = silverStripeService.formatDates(badTestData, true);
        expect(formattedDates).toBe(false);
      });

    });

  });

}());
