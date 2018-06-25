(function() {

  'use strict';

  describe('Directive: Slide Show', function() {

    var element;
    var scope;
    var $compile;
    var $window;
    var $interval;
    var $templateRequest;

    var event = {
      currentTarget: {
      },
    };

    var elm = {
      append: function() {
      },
    };

    var promiseSuccess = {
      status: 200,
      data: true,
    };

    var templateDeferred;

    function compileDirective() {
      element = angular.element(
        '<div slideshow slideshow-delay="10000">' +
        '<div slideshow-mask>' +
        '<ul slideshow-items>' +
        '<li slideshow-item></li>' +
        '</ul>' +
        '</div>' +
        '</div>');
      var compiledElement = $compile(element)(scope);
      scope.$digest();
      return compiledElement;
    }

    beforeEach(module('templates'));
    beforeEach(module('sorted'));

    beforeEach(inject(function(_$compile_, $rootScope, _$templateRequest_, $q, _$interval_, _$window_) {
      scope = $rootScope.$new();
      $compile = _$compile_;
      $window = _$window_;
      $interval = _$interval_;
      $templateRequest = _$templateRequest_;
      templateDeferred = $q.defer();
    }));

    describe('Initialization', function() {

      it('should compile without throwing any errors', function() {
        var directive = compileDirective();
        expect(directive).not.toBe(null);
      });

      it('should set animating to false', function() {
        var directive = compileDirective();
        expect(directive.scope().animating).toBe(false);
      });

    });

    describe('Callbacks', function() {

      it('should run the animation when the dots are clicked', function() {
        var directive = compileDirective();
        directive.scope().dotsClick(event);
        expect(directive.scope().animating).toBe(true);
      });

      it('should set the widths when the window resizes', function() {
        var directive = compileDirective();
        spyOn(directive.scope(), 'setWidths');
        directive.scope().windowResize();
        expect(directive.scope().setWidths).toHaveBeenCalled();
      });

      it('should configure the dots classes', function() {
        var directive = compileDirective();
        directive.scope().currentIndex = 0;
        var cssClass = directive.scope().configureDots(0);
        expect(cssClass).toBe('fa-circle font-orange');
        cssClass = directive.scope().configureDots(1);
        expect(cssClass).toBe('fa-circle font-grey-light');
      });

      it('should run the setWidths function', function() {
        var directive = compileDirective();
        directive.scope().setWidths();
      });

      it('should not configure the slides if there are no slides', function() {
        var directive = compileDirective();
        var returnValue = directive.scope().setupSlideshow(0);
        expect(returnValue).toBe(false);
      });

      it('should configure the slides once they are attache to the view', function() {
        var directive = compileDirective();

        spyOn(directive.scope(), 'injectDots');
        spyOn(directive.scope(), 'setWidths');

        directive.scope().setupSlideshow(3);

        expect(directive.scope().injectDots).toHaveBeenCalled();
        expect(directive.scope().setWidths).toHaveBeenCalled();

      });

      it('should reset the animating flag to false', function() {
        var directive = compileDirective();
        directive.scope().animating = true;
        directive.scope().unlockAnimation();
        expect(directive.scope().animating).toBe(false);
      });

      it('should animate the slides if its not currently animating', function() {
        var directive = compileDirective();
        directive.scope().currentIndex = 1;
        directive.scope().moveSlide();
        expect(directive.scope().animating).toBe(true);
      });

      it('should reset to the first slide when on the last slide', function() {
        var directive = compileDirective();
        directive.scope().currentIndex = -1;
        directive.scope().moveSlide();
        expect(directive.scope().animating).toBe(true);
      });

      it('should inject the dots to the page from its template', function() {

        var success = jasmine.createSpy('requestSuccess');
        var fail = jasmine.createSpy('requestFail');

        var directive = compileDirective();
        directive.scope().injectDots();
        directive.scope().elm = elm;
        $templateRequest('app/components/slideshow/slideshow-dots.html').then(success, fail);
        templateDeferred.resolve(promiseSuccess);
        directive.scope().$digest();
        expect(success).toHaveBeenCalled();

      });

      it('should reset the current index to zero', function() {
        var directive = compileDirective();
        directive.scope().currentIndex = 0;
        directive.scope().moveSlide();
        expect(directive.scope().currentIndex).toBe(0);
      });

      it('should animate instantly back to the zero position if currentIndex is zero', function() {
        var directive = compileDirective();
        directive.scope().currentIndex = 0;
        directive.scope().animating = false;
        var animateTo = directive.scope().moveSlide();

        expect(animateTo).toBe(0);
      });

      it('should animate to the next slide', function() {
        var directive = compileDirective();
        directive.scope().currentIndex = 5;
        directive.scope().animating = false;
        var animateTo = directive.scope().moveSlide();

        expect(animateTo).toBe(0);
      });

      it('should animate to the next slide', function() {
        var directive = compileDirective();
        directive.scope().animating = true;
        var animateTo = directive.scope().moveSlide();
        expect(animateTo).toBe(0);
      });

    });

  });

})();
