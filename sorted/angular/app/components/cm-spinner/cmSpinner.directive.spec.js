(function(){

  'use strict';

  describe('Directive: Navigation', function(){

    var element;
    var scope;
    var $compile;

    function compileDirective() {
      element = angular.element('<spinner></spinner>');
      var compiledElement = $compile(element)(scope);
      scope.$digest();
      return compiledElement;
    }

    beforeEach(module('templates'));
    beforeEach(module('sorted'));

    beforeEach(inject(function(_$compile_, $rootScope) {
      scope = $rootScope.$new();
      $compile = _$compile_;
    }));

    describe('Initialization', function(){

      it('should compile without throwing any errors', function(){
        var directive = compileDirective();
        expect(directive).not.toBe(null);
      });

    });

  });

}());
