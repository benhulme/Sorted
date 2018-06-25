(function(){

  'use strict';

  describe('Directive: Sequence', function(){

    var element;
    var scope;
    var $scope;
    var $compile;
    var $interval;

    function compileDirective(hasCoverImage) {
      if (hasCoverImage) {
        element = angular.element('<div cover-image="test.jpg"></div>');
      } else {
        element = angular.element('<div cover-image></div>');
      }
      var compiledElement = $compile(element)($scope);
      scope = element.isolateScope();
      scope.$digest();
      return compiledElement;
    }

    beforeEach(module('templates'));
    beforeEach(module('sorted'));

    beforeEach(inject(function(_$compile_, $rootScope, _$interval_) {
      $scope = $rootScope.$new();
      $compile = _$compile_;
      $interval = _$interval_;
    }));

    describe('Initialization', function(){

      it('should compile without throwing any errors', function() {
        var directive = compileDirective(true);
        expect(directive).not.toBe(null);
      });

    });

    describe('setCoverImage Function', function() {

      it('should return the cover image attributes value', function() {

        compileDirective(true);
        var coverImage = scope.setCoverImage();
        expect(coverImage).toBe('test.jpg');

      });

      it('should return false if there is no coverImage attribute set', function() {

        compileDirective(false);
        var coverImage = scope.setCoverImage();
        expect(coverImage).toBe(false);

      });

    });

  });

}());
