/**
 * Created by greg on 12/02/2016.
 */

"use strict";

describe('Controller: Order', function () {

  var ctrl;
  var scope;

  //beforeEach(module('templates'));
  beforeEach(module('sorted'));

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();

    ctrl = $controller('OrderController', {
        $scope: scope
    });

  }));

  describe('Initialization', function () {

    it('should instantiate the controller', function () {
      expect(ctrl).not.toBe(null);
    });

    it('should have loaded siteConfig into scope', function () {
      expect(scope.siteConfig).not.toBe(null);
    });

    it('should have loaded Order into scope', function () {
      expect(scope.Order).not.toBe(null);
      expect(scope.Order.Items).not.toBe(null);
      expect(scope.Order.User).not.toBe(null);
      expect(scope.Order.Organisation).not.toBe(null);
      expect(scope.Order.DeliverTo).not.toBe(null);
    });

    it('should have loaded \'data\' into scope', function () {
      expect(scope.data).not.toBe(null);
      expect(scope.data.organisationTypes).not.toBe(null);
      expect(scope.data.organisationTypes.length).toBe(4);

      expect(scope.data.organisationSizes).not.toBe(null);
      expect(scope.data.organisationSizes.length).toBe(7);
    });

    it('should populate the Model with data from JSON file'/*, function () {

      // TODO need to understand how to test the promise call (private)
      // inside the Controller

      //expect(scope.data.Categories.length).toBe(3);
    }*/);

    it('should return an \'input\' element from a form using the item.id');

    it('should return the OrderItemCount');
  });
});
