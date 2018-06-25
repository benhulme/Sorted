(function(){

  'use strict';

  describe('Directive: Signup Prompt', function(){

    var element;
    var scope;
    var $compile;

    var serviceDeferred;

    var promiseSuccess = {
      status: 200,
      data: [true],
    };

    var promiseNon200 = {
      status: 500,
      data: [false],
    };

    var promiseFail = {
      status: 404,
      data: [false],
    };

    var silverStripeService = {
      get: function() {
        return serviceDeferred.promise;
      },
    };

    function compileDirective() {
      element = angular.element('<signup-prompt></signup-prompt>');
      var compiledElement = $compile(element)(scope);
      scope.$digest();
      return compiledElement;
    }

    beforeEach(module('templates'));
    beforeEach(module('sorted', function($provide) {
      $provide.value('silverStripeService', silverStripeService);
    }));

    beforeEach(inject(function(_$compile_, $rootScope, $q) {
      scope = $rootScope.$new();
      $compile = _$compile_;
      serviceDeferred = $q.defer();

    }));

    describe('Initialization', function(){

      it('should compile without throwing any errors', function() {
        var success = jasmine.createSpy('qPromiseSuccess');
        var fail = jasmine.createSpy('qPromiseFail');

        var directive = compileDirective();
        silverStripeService.get('signupPrompt').then(success, fail);
        serviceDeferred.resolve();

        expect(directive).not.toBe(null);
      });

      it('should set the data to the view if the service is successful', function() {
        var success = jasmine.createSpy('qPromiseSuccess');
        var fail = jasmine.createSpy('qPromiseFail');

        compileDirective();
        silverStripeService.get('signupPrompt').then(success, fail);
        serviceDeferred.resolve(promiseSuccess);
        scope.$digest();

        expect(success).toHaveBeenCalledWith(promiseSuccess);
        expect(scope.signupPrompt).toBeDefined(promiseSuccess.data);
      });

      it('should set the data to the view if the service is successful', function() {
        var success = jasmine.createSpy('qPromiseSuccess');
        var fail = jasmine.createSpy('qPromiseFail');

        compileDirective();
        silverStripeService.get('signupPrompt').then(success, fail);
        serviceDeferred.resolve(promiseSuccess);
        scope.$digest();

        expect(success).toHaveBeenCalledWith(promiseSuccess);
        expect(scope.signupPrompt).toBeDefined(promiseSuccess.data);
      });

      it('should log an error if the service call is non 200 successful', function() {

        spyOn(console, 'error');
        var success = jasmine.createSpy('qPromiseSuccess');
        var fail = jasmine.createSpy('qPromiseFail');

        compileDirective();
        silverStripeService.get('signupPrompt').then(success, fail);
        serviceDeferred.resolve(promiseNon200);
        scope.$digest();

        expect(success).toHaveBeenCalledWith(promiseNon200);
        expect(console.error).toHaveBeenCalledWith('unexpected response status',promiseNon200);
      });

      it('should log an error if the service call is unsuccessful', function() {

        spyOn(console, 'error');
        var success = jasmine.createSpy('qPromiseSuccess');
        var fail = jasmine.createSpy('qPromiseFail');

        compileDirective();
        silverStripeService.get('signupPrompt').then(success, fail);
        serviceDeferred.reject(promiseFail);
        scope.$digest();

        expect(fail).toHaveBeenCalledWith(promiseFail);
        expect(console.error).toHaveBeenCalledWith('failure',promiseFail);
      });

    });

  });

}());
