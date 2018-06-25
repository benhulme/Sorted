'use strict';

describe('Controller: Money Personality', function(){

  var ctrl;
  var scope;
  var serviceDeferred;

  var promiseSuccess = {
    status: 200,
    data: [
      true,
    ],
  };

  var promiseNon200 = {
    status: 500,
    data: [
      false,
    ],
  };

  var promiseFail = {
    status: 404,
    data: [
      false,
    ],
  };

  var silverStripeService = {
    get: function() {
      return serviceDeferred.promise;
    },
  };

  beforeEach(module('templates'));
  beforeEach(module('sorted', function($provide) {
    $provide.value('silverStripeService', silverStripeService);
  }));

  beforeEach(inject(function($controller, $rootScope, $q) {

    scope = $rootScope.$new();

    serviceDeferred = $q.defer();

    ctrl = $controller('MortgageToolController', {
      $scope: scope,
    });

  }));

  describe('Initialization', function() {

    it('should instantiate the controller', function() {
      expect(ctrl).not.toBe(null);
    });

    it('should set the data to the view if the service is successful', function() {
      var success = jasmine.createSpy('qPromiseSuccess');
      var fail = jasmine.createSpy('qPromiseFail');

      silverStripeService.get('mortgageTool').then(success, fail);
      serviceDeferred.resolve(promiseSuccess);
      scope.$digest();

      expect(success).toHaveBeenCalledWith(promiseSuccess);
      expect(scope.data).toBeDefined(promiseSuccess.data[0]);
    });

    it('should log an error if the service call is non 200 successful', function() {
      spyOn(console, 'error');
      var success = jasmine.createSpy('qPromiseSuccess');
      var fail = jasmine.createSpy('qPromiseFail');

      silverStripeService.get('mortgageTool').then(success, fail);
      serviceDeferred.resolve(promiseNon200);
      scope.$digest();

      expect(success).toHaveBeenCalledWith(promiseNon200);
      expect(console.error).toHaveBeenCalledWith('unexpected response status', promiseNon200);
    });

    it('should log an error if the service call is unsuccessful', function() {

      spyOn(console, 'error');
      var success = jasmine.createSpy('qPromiseSuccess');
      var fail = jasmine.createSpy('qPromiseFail');

      silverStripeService.get('mortgageTool').then(success, fail);
      serviceDeferred.reject(promiseFail);
      scope.$digest();

      expect(fail).toHaveBeenCalledWith(promiseFail);
      expect(console.error).toHaveBeenCalledWith('failure', promiseFail);
    });

  });

});
