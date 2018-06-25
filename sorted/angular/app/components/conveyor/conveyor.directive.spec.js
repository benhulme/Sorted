(function() {

  'use strict';

  describe('Directive: Conveyor', function(){

    var element;
    var $scope;
    var scope;
    var $compile;

    var event = {
      originalEvent: {
        touches: [
          {
            clientX: 100,
          },
        ],
      },
    };

    function compileDirective() {
      element = angular.element(
        '<div conveyor>' +
          '<div conveyor-mask>' +
            '<div conveyor-belt>' +
              '<div conveyor-items>' +
              '</div>' +
              '<div conveyor-items>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
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

    describe('Initialization', function(){

      it('should compile without throwing any errors', function() {
        var directive = compileDirective();
        expect(directive).not.toBe(null);
      });

      it('should set animating to false', function() {
        compileDirective();
        expect(scope.animating).toBe(false);
      });

    });

    describe('Left Click', function() {

      it('should set the animating flag when the left control is clicked', function() {

        var directive = compileDirective();
        directive.find('.conveyor-left').click();
        expect(scope.animating).toBe(true);

      });

      it('should return the itemWidth because its animating one item width', function() {

        var elm = compileDirective();
        elm.find('[conveyor-items]').width(100);

        scope.conveyorBelt = {
          prop: function() {
            return -200;
          },
        };

        var itemWidth = scope.leftClick();

        expect(itemWidth).toBe(100);

      });

      it('should return zero because its animating to the start position', function() {

        var elm = compileDirective();
        elm.find('[conveyor-items]').width(100);

        scope.conveyorBelt = {
          prop: function() {
            return 0;
          },
        };

        var animatePosition = scope.leftClick();

        expect(animatePosition).toBe(0);

      });

    });

    describe('Right Click', function() {

      it('should set the animating flag when the right control is clicked', function() {

        var directive = compileDirective();
        directive.find('.conveyor-right').click();
        expect(scope.animating).toBe(true);

      });

      it('should return the itemWidth because its animating one item width', function() {

        var elm = compileDirective();
        elm.find('[conveyor-items]').width(100);

        scope.conveyorBelt = {
          prop: function() {
            return 0;
          },
        };

        var itemWidth = scope.rightClick();

        expect(itemWidth).toBe(100);

      });

      it('should return 200 because its animating to the end position', function() {

        var elm = compileDirective();
        elm.find('[conveyor-items]').width(100);

        scope.conveyorBelt = {
          prop: function() {
            return -150;
          },
        };

        var animatePosition = scope.rightClick();

        expect(animatePosition).toBe(200);

      });

    });

    describe('unlockAnimation function', function() {

      it('should reset the animating flag to false', function () {
        compileDirective();
        scope.animating = true;
        scope.unlockAnimation();
        expect(scope.animating).toBe(false);
      });

    });

    describe('windowResize function', function() {

      it('should set the maxScroll to be the correct width', function () {
        var elm = compileDirective();
        elm.find('[conveyor-items]').width(100);
        var maxScroll = scope.windowResize();
        expect(maxScroll).toBe(200);
      });

      it('should set the position to the new maxScroll', function () {
        var elm = compileDirective();
        elm.find('[conveyor-items]').width(100);
        scope.conveyorBelt.prop = function() {
          return -300;
        };
        var maxScroll = scope.windowResize();

        expect(scope.conveyorBelt.css('left')).toBe('-' + maxScroll + 'px');
      });

    });

    describe('touch functions', function() {

      it('should set the start position to the position of the starting touch', function() {
        compileDirective();
        var startX = scope.touchStart(event);
        expect(startX).toBe(100);
      });

      it('should move the conveyor to a new position using the touchMove function', function() {
        compileDirective();

        scope.startLeft = -100;
        var firstLeft = scope.touchMove(event);
        scope.startLeft = -200;
        var newLeft = scope.touchMove(event);

        expect(firstLeft).not.toBe(newLeft);

      });

      it('should enable the left control', function() {
        var elm = compileDirective();
        scope.startLeft = -300;
        scope.startX = 0;
        scope.touchMove(event);

        expect(elm.find('.conveyor-left').hasClass('disabled')).toBe(false);

      });

      it('should disable the left control', function() {
        var elm = compileDirective();
        scope.startLeft = -100;
        scope.startX = 0;
        scope.touchMove(event);

        expect(elm.find('.conveyor-left').hasClass('disabled')).toBe(true);

      });

      it('should enable the right control', function() {
        var elm = compileDirective();
        scope.startLeft = 0;
        scope.startX = 0;
        scope.touchMove(event);

        expect(elm.find('.conveyor-right').hasClass('disabled')).toBe(false);

      });

      it('should disable the right control', function() {
        var elm = compileDirective();
        scope.startLeft = -100;
        scope.startX = 0;
        scope.touchMove(event);

        expect(elm.find('.conveyor-right').hasClass('disabled')).toBe(true);

      });

    });

  });

}());
