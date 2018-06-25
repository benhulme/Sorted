'use strict';

describe('Directive: cmValidation - cmInteger', function() {

  var element;
  var scope;
  var $compile;
  var integerInput;

  function compileDirective(attrs) {
    scope.model = '';
    element = angular.element('<form name="testForm"><input name="integer" type="text" ng-model="model" cm-integer ' +
      attrs + '></input></form>');

    $compile(element)(scope);
    scope.$digest();

    integerInput = scope.testForm.integer;
  }

  beforeEach(module('templates'));
  beforeEach(module('sorted'));

  beforeEach(inject(function(_$compile_, $rootScope) {
    scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  describe('ctrl.$validators.integer', function() {

    it('should consider an empty model to be valid', function() {
      compileDirective();
      expect(integerInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the cmCondition is false', function() {
      compileDirective('cm-condition="false"');

      // Ensure that input would be invalid if cmCondition case was not executed
      scope.model = 'not_integer!';
      scope.$digest();
      expect(integerInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the value contains numbers', function() {
      compileDirective();
      scope.model = '1234';
      scope.$digest();
      expect(integerInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the value contains numbers preceeded by -', function() {
      compileDirective();
      scope.model = '-123';
      scope.$digest();
      expect(integerInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the value contains numbers followed by -', function() {
      compileDirective();
      scope.model = '123-';
      scope.$digest();
      expect(integerInput.$invalid).toBe(true);
    });

    it('should consider the input to be invalid if the value contains non-integer characters', function() {
      compileDirective();
      scope.model = 'ab_cd!';
      scope.$digest();
      expect(integerInput.$invalid).toBe(true);
    });

  });
});
