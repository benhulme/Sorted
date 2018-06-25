(function(){

  'use strict';

  describe('Directive: Category Filter', function(){

    var directive;
    var element;
    var scope;
    var $compile;

    function compileDirective() {
      element = angular.element('<category-filter type="type" data="data" prefix="prefix" search="search"></category-filter>');
      var compiledElement = $compile(element)(scope);
      scope.$digest();
      return compiledElement;
    }

    beforeEach(module('templates'));
    beforeEach(module('sorted'));

    beforeEach(inject(function(_$compile_, $rootScope) {
      scope = $rootScope.$new();
      $compile = _$compile_;
      scope.search = '';
      scope.data = [{
        Slug: 'wombat',
        Title: 'Wombat'
      },{
        Slug: 'aardvark',
        Title: 'Aardvark'
      }];
      directive = compileDirective();
    }));

    describe('Initialization', function(){

      it('should compile without throwing any errors', function () {
        expect(directive).not.toBe(null);
      });

    });

    describe('Scope', function(){

      it('should inherit scope correctly', function(){
        scope.search = 'SEARCH';
        scope.$digest();
        expect(directive.isolateScope().search).toBe('SEARCH');
      });

    });

    describe('DOM manipulation', function () {

      it('should set the first filter link to selected', function () {
        var link = angular.element(
          element[0].getElementsByClassName('category-filter-link')[0]
        );
        expect(link.hasClass('selected')).toBe(true);
      });

      it('should change selected element when search changes', function () {
        var link = angular.element(
          element[0].querySelector('[category="wombat"]')
        );
        expect(link.hasClass('selected')).toBe(false);

        scope.search = 'wombat';
        scope.$digest();

        expect(link.hasClass('selected')).toBe(true);
      });

      it('should deselect when search changes', function () {
        var link = angular.element(
          element[0].querySelector('[category="wombat"]')
        );
        scope.search = 'wombat';
        scope.$digest();
        expect(link.hasClass('selected')).toBe(true);

        scope.search = 'aardvark';
        scope.$digest();
        expect(link.hasClass('selected')).toBe(false);
      });

    });

    describe('Categories', function () {

      it('should display a link for each category and one for all categories', function () {
        // Get filters-select because there are six links per page view,
        // only three of which are visible at a time
        var links = element[0]
          .getElementsByClassName('filters-select')[0]
          .getElementsByClassName('category-filter-link');
        expect(links.length).toBe(3);
      });

    });

  });

}());
