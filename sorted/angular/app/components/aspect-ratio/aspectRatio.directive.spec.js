(function(){

  'use strict';

  describe('Directive: Aspect Ratio', function() {

    var element;
    var scope;
    var $scope;
    var $compile;

    function compileDirective(aspectRatio) {
      element = angular.element('<div aspect-ratio="' + aspectRatio + '"></div>');
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

    describe('Resize Function', function() {

      it('should return the new size', function() {

        var elm = compileDirective('4:3');
        elm.width(100);
        var newHeight = scope.resize();

        expect(newHeight).toBe(75);

      });

      it('should return false because zero value ratio passed', function() {

        var elm = compileDirective('0:3');
        elm.width(100);
        var newHeight = scope.resize();

        expect(newHeight).toBe(false);

      });

      it('should return false because only one ratio passed', function() {

        var elm = compileDirective('3');
        elm.width(100);
        var newHeight = scope.resize();

        expect(newHeight).toBe(false);

      });

      it('should return false because more than two ratios passed', function() {

        var elm = compileDirective('3:3:3');
        elm.width(100);
        var newHeight = scope.resize();

        expect(newHeight).toBe(false);

      });

      it('should return false because NaN ratio passed', function() {

        var elm = compileDirective('3:TEST');
        elm.width(100);
        var newHeight = scope.resize();

        expect(newHeight).toBe(false);

      });

      it('should return false because negative ratio passed', function() {

        var elm = compileDirective('3:-5');
        elm.width(100);
        var newHeight = scope.resize();

        expect(newHeight).toBe(false);

      });

    });

  });

}());
