(function(){

  'use strict';

  describe('Directive: Parallax', function(){

    var element;
    var scope;
    var $scope;
    var $compile;

    function compileDirective() {
      element = angular.element(
        '<div parallax>' +
          '<div parallax-layer="1">' +
          '</div>' +
          '<div parallax-layer="2">' +
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

      it('should compile without throwing any errors', function(){
        var directive = compileDirective();
        expect(directive).not.toBe(null);
      });

    });

    describe('Callbacks', function() {

      it('should run the moveElements function', function() {

        compileDirective();
        scope.maxItems = 5;
        scope.moveElements();

      });

      it('should run the moveElements function and hit the else', function() {

        compileDirective();
        scope.maxItems = -1;
        var numItemsMoved = scope.moveElements();

        expect(numItemsMoved).toBe(2);

      });

    });

  });

}());
