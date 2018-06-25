'use strict';

describe('Directive: cmValidation - cmString', function() {

  var element;
  var scope;
  var $compile;
  var stringInput;

  function compileDirective(attrs) {
    scope.model = '';
    element = angular.element('<form name="testForm"><input name="string" type="text" ng-model="model" cm-string ' +
      attrs + '></input></form>');

    $compile(element)(scope);
    scope.$digest();

    stringInput = scope.testForm.string;
  }

  beforeEach(module('templates'));
  beforeEach(module('sorted'));

  beforeEach(inject(function(_$compile_, $rootScope) {
    scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  describe('ctrl.$validators.string', function() {

    it('should consider an empty model to be valid', function() {
      compileDirective();
      expect(stringInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the cmCondition is false', function() {
      compileDirective('cm-condition="false"');

      // Ensure that input would be invalid if cmCondition case was not executed
      scope.model = '(&)';
      scope.$digest();
      expect(stringInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the value contains lower case letters', function() {
      compileDirective();
      scope.model = 'abc';
      scope.$digest();
      expect(stringInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the value contains upper case letters', function() {
      compileDirective();
      scope.model = 'ABC';
      scope.$digest();
      expect(stringInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the value contains numbers', function() {
      compileDirective();
      scope.model = '123';
      scope.$digest();
      expect(stringInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the value contains a space', function() {
      compileDirective();
      scope.model = 'ab 12';
      scope.$digest();
      expect(stringInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the value contains -', function() {
      compileDirective();
      scope.model = 'ab-12';
      scope.$digest();
      expect(stringInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the value contains ', function() {
      compileDirective();
      scope.model = 'ab\'12';
      scope.$digest();
      expect(stringInput.$valid).toBe(true);
    });

    it('should consider the input to be invalid if the value contains characters other than alphanumeric or the ' +
      'following characters: - \'', function() {
      compileDirective();
      scope.model = '#()^';
      scope.$digest();
      expect(stringInput.$invalid).toBe(true);
    });

  });
});
