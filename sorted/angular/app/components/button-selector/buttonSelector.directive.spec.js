(function() {

  'use strict';

  describe('Directive: ButtonSelector', function(){

    var element;
    var $scope;
    var scope;
    var $compile;

    function compileDirective() {
      element = angular.element(
        '<div buttonSelector ng-model="buttonModel">' +
          '<button value="1"></button>' +
          '<button value="2"></button>' +
          '<button value="3"></button>' +
        '</div>'
      );
      var compiledElement = $compile(element)($scope);
      $scope.$digest();
      scope = element.isolateScope();
      return compiledElement;
    }

    beforeEach(module('templates'));
    beforeEach(module('sorted'));

    beforeEach(inject(function(_$compile_, $rootScope) {
      $scope = $rootScope.$new();
      $compile = _$compile_;
    }));

    describe('Initialization', function(){

      it('should compile without throwing any errors', function() {
        var directive = compileDirective();
        expect(directive).not.toBe(null);
      });

    });

  });

}());
