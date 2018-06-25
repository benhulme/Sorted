(function(){
  'use strict';

  describe('Directive: Budget Amount Form', function(){

    var directive;
    var element;
    var scope;
    var $compile;

    function compileDirective() {
      element = angular.element('<budget-amount-form data="data"></budget-amount-form>');
      var compiledElement = $compile(element)(scope);
      scope.$digest();
      return compiledElement;
    }

    beforeEach(module('templates'));
    beforeEach(module('sorted'));

    beforeEach(inject(function(_$compile_, $rootScope) {
      scope = $rootScope.$new();
      $compile = _$compile_;
      scope.data = {
        BudgetPeriods: [
          { Shortname: 'weekly', Title: 'Weekly', PerYear: 52 },
          { Shortname: 'fortnightly', Title: 'Fortnightly', PerYear: 26 },
          { Shortname: 'fourweekly', Title: '4 Weekly', PerYear: 13 },
          { Shortname: 'monthly', Title: 'Monthly', PerYear: 12 },
          { Shortname: 'yearly', Title: 'Yearly', PerYear: 1 }
        ]
      };
      scope.budgetPeriod = {
        Shortname: 'monthly',
        Title: 'per month'
      };

      directive = compileDirective();
    }));

    describe('Initialization', function () {

      it('should compile without throwing any errors', function () {
        expect(directive).not.toBe(null);
      });

    });

    describe('Select budget period', function () {

      it('should display all available options', function () {
        expect(element.find('li').length).toEqual(scope.data.BudgetPeriods.length);
      });

    });

  });

}());
