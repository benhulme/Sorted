/**
 * Created by greg on 19/02/2016.
 */

"use strict";

describe('Controller: SavingsCalculator', function () {

  var ctrl, scope, serviceDeferred,
    promiseSuccess = {
      status: 200,
      data: [true]
    },
    promiseNon200 = {
      status: 500,
      data: [
        false
      ]
    },
    tests =
      [
        {
          type: "1",
          saving_amount: "5000",
          regular_amount: "",
          saving_freq: 26,
          starting: "21/12/2011",
          ending: "21/12/2015",
          initial_savings: 100,
          interest_rate: 2,
          age_month: 6,
          age_year: 1985,
          iar: 0,
          nudge_dollars: 50,
          expected: {
            age: 30,
            contributions: null,
            interest: 195.64,
            period: 37,
            total: 45.23,
            total_saved: 5000,
            nudge_age: 30,
            nudge_interest: 177.54,
            nudge_period: 32,
            nudge_total: 50,
            nudge_total_saved: 5000
          }
        },
        {
          type: "0",
          saving_amount: "",
          regular_amount: "50.13",
          saving_freq: "52",
          starting: "28/11/2012",
          ending: "28/01/2013",
          initial_savings: "0",
          interest_rate: "2",
          age_month: "6",
          age_year: "1985",
          iar: 0,
          nudge_dollars: "60",
          expected: {
            age: 27,
            contributions: 50.13,
            interest: 0.63,
            period: 2,
            total: 435.09,
            total_saved: '',
            nudge_age: 27,
            nudge_interest: 0.76,
            nudge_period: 2,
            nudge_total: 60,
            nudge_total_saved: 520.76
          }
        },
        {
          type: "1",
          saving_amount: "52",
          regular_amount: "",
          saving_freq: "52",
          starting: "01/01/2013",
          ending: "01/01/2014",
          initial_savings: "0",
          interest_rate: "14.7",
          age_month: "11",
          age_year: "1984",
          iar: 0,
          nudge_dollars: "300",
          expected: {
            age: 29,
            contributions: null,
            interest: 3.42,
            period: 13,
            total: 0.93,
            total_saved: 52,
            nudge_age: 28,
            nudge_interest: -0.06,
            nudge_period: 1,
            nudge_total: 300,
            nudge_total_saved: 52
          }
        },
        {
          type: "1",
          saving_amount: "5000",
          regular_amount: "",
          saving_freq: "52",
          starting: "04/01/2013",
          ending: "13/03/2013",
          initial_savings: "200",
          interest_rate: "5.2",
          age_month: "1",
          age_year: "1913",
          iar: 1,
          nudge_dollars: 530,
          expected: {
            age: 100,
            contributions: null,
            interest: 14.25,
            period: 4,
            total: 480.15,
            total_saved: 5000,
            nudge_age: 100,
            nudge_interest: 12.83,
            nudge_period: 3,
            nudge_total: 530,
            nudge_total_saved: 4976.80
          }
        },
        {
          type: "0",
          saving_amount: "",
          regular_amount: "1",
          saving_freq: "52",
          starting: "31/01/2020",
          ending: "31/01/2021",
          initial_savings: "",
          interest_rate: "2",
          age_month: "1",
          age_year: "2000",
          iar: 0,
          nudge_dollars: 10,
          expected: {
            age: 21,
            contributions: 1,
            interest: 0.51,
            period: 12,
            total: 52.51,
            total_saved: '',
            nudge_age: 21,
            nudge_interest: 5.08,
            nudge_period: 12,
            nudge_total: 10,
            nudge_total_saved: 525.08
          }
        },
        {
          type: "0",
          saving_amount: "52",
          regular_amount: "100",
          saving_freq: "52",
          starting: "31/01/2020",
          ending: "31/01/2021",
          initial_savings: "",
          interest_rate: "2",
          age_month: "1",
          age_year: "2000",
          iar: 0,
          nudge_dollars: 110,
          expected: {
            age: 21,
            contributions: 100,
            interest: 50.83,
            period: 12,
            total: 5250.83,
            total_saved: '',
            nudge_age: 21,
            nudge_interest: 55.91,
            nudge_period: 12,
            nudge_total: 110,
            nudge_total_saved: 5775.91
          }
        }
      ];

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

    ctrl = $controller('SavingsCalculatorController', {
      $scope: scope
    });
  }));

  describe('Initialization', function () {

    it('should instantiate the controller', function () {
      expect(ctrl).not.toBe(null);
    });

    it('should set the data to the view if the service is successful', function () {
      var success = jasmine.createSpy('qSSSuccess');
      var fail = jasmine.createSpy('qFail');

      silverStripeService.get('savingsCalculator').then(success, fail);
      serviceDeferred.resolve(promiseSuccess);
      scope.$digest();

      expect(success).toHaveBeenCalledWith(promiseSuccess);
      expect(scope.data).toBeDefined(promiseSuccess.data[0]);
    });

    it('should log an error if the service call is non 200 successful', function () {
      spyOn(console, 'error');
      var success = jasmine.createSpy('qCalcSuccess');
      var fail = jasmine.createSpy('qFail');

      silverStripeService.get('savingsCalculator').then(success, fail);
      serviceDeferred.resolve(promiseNon200);
      scope.$digest();

      expect(success).toHaveBeenCalledWith(promiseNon200);
      expect(console.error).toHaveBeenCalledWith('unexpected response status', promiseNon200);
    });

  });

  describe('Calculate', function() {
    it('should calculate totals using params passed in', function(){
      expect(tests[0]).not.toBe(null);
    });
    it('should confirm calculations');
  });

});
