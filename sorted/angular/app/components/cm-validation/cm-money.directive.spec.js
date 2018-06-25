'use strict';

describe('Directive: cmValidation - cmMoney', function() {

  var element;
  var scope;
  var $compile;
  var moneyInput;

  function compileDirective(attrs) {
    scope.model = '';
    element = angular.element('<form name="testForm"><input name="money" type="text" ng-model="model" cm-money ' +
      attrs + '></input></form>');

    $compile(element)(scope);
    scope.$digest();

    moneyInput = scope.testForm.money;
  }

  beforeEach(module('templates'));
  beforeEach(module('sorted'));

  beforeEach(inject(function(_$compile_, $rootScope) {
    scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  describe('ctrl.$validators.money', function() {

    it('should consider an empty model to be valid', function() {
      compileDirective();
      expect(moneyInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the cmCondition is false', function() {
      compileDirective('cm-condition="false"');

      // Ensure that input would be invalid if cmCondition case was not executed
      scope.model = 'not_money!';
      scope.$digest();
      expect(moneyInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the value contains numbers', function() {
      compileDirective();
      scope.model = '1234';
      scope.$digest();
      expect(moneyInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the value contains numbers preceeded by -', function() {
      compileDirective();
      scope.model = '-123';
      scope.$digest();
      expect(moneyInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the value contains numbers followed by -', function() {
      compileDirective();
      scope.model = '123-';
      scope.$digest();
      expect(moneyInput.$invalid).toBe(true);
    });

    it('should consider the input to be invalid if the value contains non-money characters', function() {
      compileDirective();
      scope.model = 'ab_cd!';
      scope.$digest();
      expect(moneyInput.$invalid).toBe(true);
    });

  });
});
