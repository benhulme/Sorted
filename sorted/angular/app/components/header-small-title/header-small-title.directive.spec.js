(function(){

  'use strict';

  describe('Directive: Header Small Title', function(){

    var element;
    var scope;
    var $compile;

    function compileDirective() {
      element = angular.element('<header-small-title data="data"></header-small-title>');
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
        scope.data = {
          Title: 'Sorted',
          MetaDescription: 'Description'
        };
        var directive = compileDirective();
        expect(directive).not.toBe(null);
      });

    });

  });

}());
