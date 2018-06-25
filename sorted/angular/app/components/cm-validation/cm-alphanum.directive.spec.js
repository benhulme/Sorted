'use strict';

describe('Directive: cmValidation - cmAlphanum', function() {

  var element;
  var scope;
  var $compile;
  var alphanumInput;

  function compileDirective(attrs) {
    scope.model = '';
    element = angular.element('<form name="testForm"><input name="alphanum" type="text" ng-model="model" cm-alphanum ' +
      attrs + '></input></form>');

    $compile(element)(scope);
    scope.$digest();

    alphanumInput = scope.testForm.alphanum;
  }

  beforeEach(module('templates'));
  beforeEach(module('sorted'));

  beforeEach(inject(function(_$compile_, $rootScope) {
    scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  describe('ctrl.$validators.alphanum', function() {

    it('should consider an empty model to be valid', function() {
      compileDirective();
      expect(alphanumInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the cmCondition is false', function() {
      compileDirective('cm-condition="false"');

      // Ensure that input would be invalid if cmCondition case was not executed
      scope.model = 'not_alphanum!';
      scope.$digest();
      expect(alphanumInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the value contains lowercase letters', function() {
      compileDirective();
      scope.model = 'abc';
      scope.$digest();
      expect(alphanumInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the value contains uppercase letters', function() {
      compileDirective();
      scope.model = 'ABC';
      scope.$digest();
      expect(alphanumInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the value contains numbers', function() {
      compileDirective();
      scope.model = '1234';
      scope.$digest();
      expect(alphanumInput.$valid).toBe(true);
    });

    it('should consider the input to be valid if the value contains letters and numbers', function() {
      compileDirective();
      scope.model = 'a1B2C3d4';
      scope.$digest();
      expect(alphanumInput.$valid).toBe(true);
    });

    it('should consider the input to be invalid if the value contains non-alphanumeric characters', function() {
      compileDirective();
      scope.model = 'ab_cd!';
      scope.$digest();
      expect(alphanumInput.$invalid).toBe(true);
    });

  });
});
