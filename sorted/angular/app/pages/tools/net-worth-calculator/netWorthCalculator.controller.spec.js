/**
 * Created by greg on 15/02/2016.
 */

"use strict";

describe('Controller: NetWorthTool', function () {

  var ctrl, scope, serviceDeferred,
    promiseSuccess = {
      status: 200,
      data: [
        true
      ]
    },
    promiseNon200 = {
      status: 500,
      data: [
        false
      ]
    },
    testObj = {
      business: "",
      business5: "68",
      business10: "",
      cc: "3233",
      cc5: "",
      cc10: "",
      home: "",
      home5: "",
      home10: "",
      hp: "",
      hp5: "",
      hp10: "",
      loan: "2",
      loan5: "",
      loan10: "",
      mortgages: "",
      mortgages5: "3",
      mortgages10: "",
      other: "",
      other5: "",
      other10: "",
      other_debt: "12",
      other_debt5: "",
      other_debt10: "",
      properties: "",
      properties5: "",
      properties10: "e",
      savings: "",
      savings5: "",
      savings10: "",
      shares: "",
      shares5: "r",
      shares10: "",
      sl: "",
      sl5: "",
      sl10: "",
      super_annuation: "",
      super_annuation5: "",
      super_annuation10: "",
      trust: "",
      trust5: "",
      trust10: "",
      vehicles: "",
      vehicles5: "",
      vehicles10: ""
    }
  /*promiseFail = {
   status: 404,
   data: [
   false
   ]
   }*/
  ;

  var silverStripeService = {
    get: function () {
      return serviceDeferred.promise;
    },
  };

  beforeEach(module('templates'));
  beforeEach(module('sorted', function ($provide) {
    $provide.value('silverStripeService', silverStripeService);
  }));

  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();

    serviceDeferred = $q.defer();

    ctrl = $controller('NetWorthToolController', {
      $scope: scope
    });
  }));

  describe('Initialization', function () {

    it('should instantiate the controller', function () {
      expect(ctrl).not.toBe(null);
    });

    it('should set the data to the view if the service is successful', function () {
      var success = jasmine.createSpy('qPromiseSuccess');
      var fail = jasmine.createSpy('qPromiseFail');

      silverStripeService.get('netWorthTool').then(success, fail);
      serviceDeferred.resolve(promiseSuccess);
      scope.$digest();

      expect(success).toHaveBeenCalledWith(promiseSuccess);
      expect(scope.data).toBeDefined(promiseSuccess.data[0]);
    });

    it('should log an error if the service call is non 200 successful', function () {
      spyOn(console, 'error');
      var success = jasmine.createSpy('qPromiseSuccess');
      var fail = jasmine.createSpy('qPromiseFail');

      silverStripeService.get('netWorthTool').then(success, fail);
      serviceDeferred.resolve(promiseNon200);
      scope.$digest();

      expect(success).toHaveBeenCalledWith(promiseNon200);
      expect(console.error).toHaveBeenCalledWith('unexpected response status', promiseNon200);
    });

  });

  describe('Calculate', function() {
    it('should calculate totals using params passed in', function(){
      expect(testObj).not.toBe(null);
    });
    it('should confirm calculations');
  });


});
