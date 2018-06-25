(function(){
  'use strict';

  describe('Service: Tools View Model', function () {

    var silverStripeService, deferred, rootScope, mockData;

    beforeEach(function () {
      module(function ($provide) {
        $provide.factory('silverStripeService', function ($q) {
          return {
            get: function () {
              deferred = $q.defer();
              return deferred.promise;
            }
          };
        });

        mockData = [{
          
        }];
      });

      inject(function ($injector) {
        silverStripeService = $injector.get('silverStripeService');
        rootScope = $injector.get('$rootScope');
      });
    });

    it('should work', function () {
      var result;
      silverStripeService.get().then(function (data) {
        result = data;
      });
      deferred.resolve(mockData);
      rootScope.$apply();
      expect(result).toEqual([{}]);
    });

  });

}());
