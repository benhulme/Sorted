(function(){

  'use strict';

  describe('Directive: Scroll Fade', function(){

    var element;
    var scope;
    var $scope;
    var $compile;
    var $window;

    function compileDirective() {
      element = angular.element(
        '<div scroll-fade>' +
        '<div scroll-fade-item>' +
        '</div>' +
        '</div>');
      var compiledElement = $compile(element)($scope);
      scope = element.isolateScope();
      scope.$digest();
      return compiledElement;
    }

    beforeEach(module('templates'));
    beforeEach(module('sorted'));

    beforeEach(inject(function(_$compile_, $rootScope, _$window_) {
      $scope = $rootScope.$new();
      $compile = _$compile_;
      $window = _$window_;
    }));

    describe('Initialization', function() {

      it('should compile without throwing any errors', function() {
        var directive = compileDirective();
        expect(directive).not.toBe(null);
      });

      it('should fade out selected items if on desktop', function() {
        $window.innerWidth = 1500;
        var directive = compileDirective();
        expect(directive).not.toBe(null);
      });

      it('should fade out selected items if on desktop', function() {
        $window.innerWidth = 1500;
        var directive = compileDirective();
        expect(directive).not.toBe(null);
      });

    });

    describe('fadeIn function', function() {

      it('should add the fade classes to the elements if on desktop and out of view', function() {

        var elm = compileDirective();
        scope.watchDestroy = function() {};

        $window.innerHeight = 400;
        $window.innerWidth = 1500;
        elm.height(1000);

        var classesAdded = scope.setupFades();

        expect(classesAdded).toBe(true);

      });

      it('should not add the fade classes to the elements if on tablet or mobile', function() {

        var elm = compileDirective();
        scope.watchDestroy = function() {};

        $window.innerHeight = 400;
        $window.innerWidth = 768;
        elm.height(1000);

        var classesAdded = scope.setupFades();

        expect(classesAdded).toBe(false);

      });

    });

    describe('fadeIn function', function() {

      it('should fade in the first element', function() {
        var elm = compileDirective();
        $window.innerHeight = 600;
        elm.height(300);
        var fadeIn = scope.fadeElements();

        expect(fadeIn).toBe(true);
      });

      it('should NOT fade in the first element', function() {
        var elm = compileDirective();
        $window.innerHeight = 400;
        elm.height(1000);
        var fadeIn = scope.fadeElements();

        expect(fadeIn).toBe(false);
      });

    });

  });

}());
