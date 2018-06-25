'use strict';

describe('Controller: Welcome', function(){

  var ctrl;
  var scope;

  beforeEach(module('templates'));
  beforeEach(module('sorted'));

  beforeEach(inject(function($controller, $rootScope) {

    scope = $rootScope.$new();

    ctrl = $controller('WelcomeCtrl', {
      $scope: scope,
      viewModel: {
        toolPage: {},
        isLoggedIn: true,
        salary: 1
      }
    });

  }));

  describe('Initialization', function(){

    it('should instantiate the controller', function(){
      expect(ctrl).not.toBe(null);
    });

  });

});
