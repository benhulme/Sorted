(function(){

  'use strict';

  describe('Directive: Calc Preview', function(){

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

    var formForwardService = {
      forward: function(){},
    };

    var calcPreviewModel = {
      prepare: function(){},
    };

    function compileDirective() {
      element = angular.element('<calc-preview></calc-preview>');
      var compiledElement = $compile(element)(scope);
      scope.$digest();
      return compiledElement;
    }

    beforeEach(module('templates'));
    beforeEach(module('sorted', function($provide) {
      $provide.value('silverStripeService', silverStripeService);
      $provide.value('calcPreviewModel', calcPreviewModel);
      $provide.value('formForwardService', formForwardService);
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
        silverStripeService.get('calcPreview').then(success, fail);
        serviceDeferred.resolve();

        expect(directive).not.toBe(null);
      });

      it('should set the data to the view if the service is successful', function() {
        var success = jasmine.createSpy('qPromiseSuccess');
        var fail = jasmine.createSpy('qPromiseFail');

        compileDirective();
        silverStripeService.get('calcPreview').then(success, fail);
        serviceDeferred.resolve(promiseSuccess);
        scope.$digest();

        expect(success).toHaveBeenCalledWith(promiseSuccess);
        expect(scope.calcPreview).toBeDefined(promiseSuccess.data);
      });

      it('should set the data to the view if the service is successful', function() {
        var success = jasmine.createSpy('qPromiseSuccess');
        var fail = jasmine.createSpy('qPromiseFail');

        compileDirective();
        silverStripeService.get('calcPreview').then(success, fail);
        serviceDeferred.resolve(promiseSuccess);
        scope.$digest();

        expect(success).toHaveBeenCalledWith(promiseSuccess);
        expect(scope.calcPreview).toBeDefined(promiseSuccess.data);
      });

      it('should log an error if the service call is non 200 successful', function() {

        spyOn(console, 'error');
        var success = jasmine.createSpy('qPromiseSuccess');
        var fail = jasmine.createSpy('qPromiseFail');

        compileDirective();
        silverStripeService.get('calcPreview').then(success, fail);
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
        silverStripeService.get('calcPreview').then(success, fail);
        serviceDeferred.reject(promiseFail);
        scope.$digest();

        expect(fail).toHaveBeenCalledWith(promiseFail);
        expect(console.error).toHaveBeenCalledWith('failure',promiseFail);
      });

    });

    describe('Form Submission', function() {

      it('should prepare and forward the data when the rootScope event triggers', function() {
        compileDirective();
        spyOn(calcPreviewModel, 'prepare');
        spyOn(formForwardService, 'forward');

        scope.calcPreModel = {
          salary: 1000,
          expense: 9000,
        };

        scope.$emit('cmForm.submit', {formName: 'calcPreviewForm'});

        expect(calcPreviewModel.prepare).toHaveBeenCalled();
        expect(formForwardService.forward).toHaveBeenCalled();
      });

      it('should not process the data if the form doesnt exist', function() {
        compileDirective();
        spyOn(calcPreviewModel, 'prepare');
        spyOn(formForwardService, 'forward');

        scope.calcPreModel = {
          salary: 1000,
          expense: 9000,
        };

        scope.$emit('cmForm.submit', {formName: 'wrongForm'});

        expect(calcPreviewModel.prepare).not.toHaveBeenCalled();
        expect(formForwardService.forward).not.toHaveBeenCalled();
      });

    });

  });

}());
