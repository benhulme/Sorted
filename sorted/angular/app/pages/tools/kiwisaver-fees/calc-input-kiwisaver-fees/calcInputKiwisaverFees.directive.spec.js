(function(){

  'use strict';

  describe('Directive: Header Small', function(){

    var element;
    var scope;
    var $compile;

    function compileDirective() {
      element = angular.element('<calc-input-kiwisaver-fees model="model" input="calcInput"></calc-input-kiwisaver-fees>');
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
