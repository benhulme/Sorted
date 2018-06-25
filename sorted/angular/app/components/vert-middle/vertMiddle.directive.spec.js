(function(){

  'use strict';

  describe('Directive: Vert Middle', function() {

    var element;
    var scope;
    var $scope;
    var $compile;

    function compileDirective() {
      element = angular.element(
        '<div vert-middle="vert-content" vert-middle-relative="vert-relative">' +
        '<div class="vert-content">' +
        '</div>' +
        '</div>');
      var compiledElement = $compile(element)($scope);
      scope = element.isolateScope();
      scope.$digest();
      return compiledElement;
    }

    beforeEach(module('templates'));
    beforeEach(module('sorted'));

    beforeEach(inject(function(_$compile_, $rootScope) {
      $scope = $rootScope.$new();
      $compile = _$compile_;
    }));

    describe('Initialization', function() {

      it('should compile without throwing any errors', function() {
        var directive = compileDirective();
        expect(directive).not.toBe(null);
      });

    });

    describe('Callbacks', function() {

      it('should calculate the new margin', function() {

        compileDirective();
        var margin = scope.align();

        expect(margin).not.toBe(null);

      });

      it('should check the contents height', function() {

        compileDirective();
        var height = scope.checkContentHeight();

        expect(height).not.toBe(null);

      });

    });

  });

}());
