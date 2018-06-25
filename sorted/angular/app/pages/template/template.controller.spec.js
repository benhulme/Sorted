'use strict';

describe('Controller: Template', function(){

  var ctrl;
  var scope;

  beforeEach(module('templates'));
  beforeEach(module('sorted'));

  beforeEach(inject(function($controller, $rootScope) {

    scope = $rootScope.$new();

    ctrl = $controller('TemplateController', {
      $scope: scope
    });

  }));

  describe('Initialization', function(){

    it('should instantiate the controller', function(){
      expect(ctrl).not.toBe(null);
    });

  });

});
